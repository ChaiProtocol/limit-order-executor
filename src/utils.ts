import {
  BigintIsh,
  Currency,
  CurrencyAmount,
  Percent,
  Token,
  TradeType,
} from "@uniswap/sdk-core";
import { Pair, Trade } from "@uniswap/v2-sdk";
import { BigNumber, providers } from "ethers";
import { Interface } from "ethers/lib/utils";
import { parseConfig } from "./config";
import { FACTORY_ADDRESSES } from "./config/addresses";
import { DEXId } from "./config/dexs";
import {
  ADDITIONAL_BASES,
  BASES_TO_CHECK_TRADES_AGAINST,
  CUSTOM_BASES,
} from "./config/routing";
import { computePairAddress } from "./entities/pair";
import IUniswapV2PairAbi from "./abis/UniswapV2Pair.json";
import { multicall } from "./multicall";
import { PairState } from "./models/pair";
import { BETTER_TRADE_LESS_HOPS_THRESHOLD } from "./constants";

// helper to deal with BigNumber serialization
export const JsonHelper = {
  stringify(obj: any) {
    return JSON.stringify(obj, (_k, v) => {
      if (v instanceof BigNumber) {
        return v.toString() + "n";
      } else {
        return v;
      }
    });
  },

  parse(str: string) {
    return JSON.parse(str, (_, v) => {
      if (typeof v === "string" && /\d+n/.test(v)) {
        return BigNumber.from(v.replace(/n$/, ""));
      } else {
        return v;
      }
    });
  },
};

export const ZERO_PERCENT = new Percent("0");
export const ONE_HUNDRED_PERCENT = new Percent("1");

// returns whether tradeB is better than tradeA by at least a threshold percentage amount
// only used by v2 hooks
export function isTradeBetter(
  tradeA: Trade<Currency, Currency, TradeType> | undefined | null,
  tradeB: Trade<Currency, Currency, TradeType> | undefined | null,
  minimumDelta: Percent = ZERO_PERCENT
): boolean | undefined {
  if (tradeA && !tradeB) return false;
  if (tradeB && !tradeA) return true;
  if (!tradeA || !tradeB) return undefined;

  if (
    tradeA.tradeType !== tradeB.tradeType ||
    !tradeA.inputAmount.currency.equals(tradeB.inputAmount.currency) ||
    !tradeA.outputAmount.currency.equals(tradeB.outputAmount.currency)
  ) {
    throw new Error("Comparing incomparable trades");
  }

  if (minimumDelta.equalTo(ZERO_PERCENT)) {
    return tradeA.executionPrice.lessThan(tradeB.executionPrice);
  } else {
    return tradeA.executionPrice.asFraction
      .multiply(minimumDelta.add(ONE_HUNDRED_PERCENT))
      .lessThan(tradeB.executionPrice);
  }
}

export const findRoute = async (
  chainId: number,
  tokenA: Token,
  tokenB: Token,
  inputAmount: BigintIsh
): Promise<Trade<Currency, Currency, TradeType.EXACT_INPUT> | null> => {
  const config = parseConfig();
  const dexId = config.dexId;
  const common = BASES_TO_CHECK_TRADES_AGAINST[chainId] ?? [];
  const additionalA = tokenA
    ? ADDITIONAL_BASES[chainId]?.[tokenA.address] ?? []
    : [];
  const additionalB = tokenB
    ? ADDITIONAL_BASES[chainId]?.[tokenB.address] ?? []
    : [];
  const bases = [...common, ...additionalA, ...additionalB];
  const basePairs = bases
    .flatMap((base): [Token, Token][] =>
      bases.map((otherBase) => [base, otherBase])
    )
    // though redundant with the first filter below, that expression runs more often, so this is probably worthwhile
    .filter(([t0, t1]) => !t0.equals(t1));
  const currencies = [
    // the direct pair
    [tokenA, tokenB],
    // token A against all bases
    ...bases.map((base): [Token, Token] => [tokenA, base]),
    // token B against all bases
    ...bases.map((base): [Token, Token] => [tokenB, base]),
    // each base against all bases
    ...basePairs,
  ]
    .filter((tokens): tokens is [Token, Token] =>
      Boolean(tokens[0] && tokens[1])
    )
    .filter(([t0, t1]) => t0.address !== t1.address)
    .filter(([tokenA, tokenB]) => {
      if (!chainId) return true;
      const customBases = CUSTOM_BASES[chainId];

      const customBasesA: Token[] | undefined = customBases?.[tokenA.address];
      const customBasesB: Token[] | undefined = customBases?.[tokenB.address];

      if (!customBasesA && !customBasesB) return true;

      if (customBasesA && !customBasesA.find((base) => tokenB.equals(base)))
        return false;
      if (customBasesB && !customBasesB.find((base) => tokenA.equals(base)))
        return false;

      return true;
    });

  const tokens = currencies.map(([currencyA, currencyB]) => [
    currencyA?.wrapped,
    currencyB?.wrapped,
  ]);

  const pairAddresses = tokens.map(([tokenA, tokenB]) => {
    return tokenA &&
      tokenB &&
      tokenA.chainId === tokenB.chainId &&
      !tokenA.equals(tokenB) &&
      FACTORY_ADDRESSES[dexId]
      ? computePairAddress({ dexId, tokenA, tokenB })
      : undefined;
  });

  const PAIR_INTERFACE = new Interface(IUniswapV2PairAbi);
  const provider = new providers.JsonRpcProvider(config.rpc);

  return multicall(
    provider,
    config.multicall,
    pairAddresses.map((pair) => {
      return {
        target: pair,
        abi: PAIR_INTERFACE.functions["getReserves()"],
        params: [],
      };
    })
  ).then(async (results) => {
    const allPairs = results.map((result, i) => {
      const { reserve0, reserve1 } = result;
      const tokenA = tokens[i][0];
      const tokenB = tokens[i][1];
      if (!tokenA || !tokenB || tokenA.equals(tokenB))
        return [PairState.INVALID, null];
      if (!reserve0 || !reserve1) return [PairState.INVALID, null];
      const [token0, token1] = tokenA.sortsBefore(tokenB)
        ? [tokenA, tokenB]
        : [tokenB, tokenA];
      return [
        PairState.EXISTS,
        new Pair(
          CurrencyAmount.fromRawAmount(token0, reserve0.toString()),
          CurrencyAmount.fromRawAmount(token1, reserve1.toString())
        ),
      ];
    });

    // console.log(allPairs);
    const allowedPairs = Object.values(
      allPairs
        // filter out invalid pairs
        .filter((result): result is [PairState.EXISTS, Pair] =>
          Boolean(result[0] === PairState.EXISTS && result[1])
        )
        // filter out duplicated pairs
        .reduce<{ [pairAddress: string]: Pair }>((memo, [, curr]) => {
          memo[curr.liquidityToken.address] =
            memo[curr.liquidityToken.address] ?? curr;
          return memo;
        }, {})
    );
    const maxHops = 3;

    let bestTradeSoFar: Trade<
      Currency,
      Currency,
      TradeType.EXACT_INPUT
    > | null = null;
    if (allowedPairs.length) {
      for (let i = 1; i <= maxHops; i++) {
        const currentTrade =
          Trade.bestTradeExactIn(
            allowedPairs,
            CurrencyAmount.fromRawAmount(tokenA, inputAmount),
            tokenB,
            {
              maxHops: i,
              maxNumResults: 1,
            }
          )[0] ?? null;

        if (
          isTradeBetter(
            bestTradeSoFar,
            currentTrade,
            BETTER_TRADE_LESS_HOPS_THRESHOLD
          )
        ) {
          bestTradeSoFar = currentTrade;
        }
      }
    }
    return bestTradeSoFar;
  });
};
