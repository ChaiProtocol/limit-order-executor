import {
  Currency,
  Ether,
  NativeCurrency,
  Token,
  WETH9,
} from "@uniswap/sdk-core";
import invariant from "tiny-invariant";

import { SupportedChainId } from "./chains";

export const USDC_MAINNET = new Token(
  SupportedChainId.MAINNET,
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  6,
  "USDC",
  "USD//C"
);
export const USDC_ROPSTEN = new Token(
  SupportedChainId.ROPSTEN,
  //'0x07865c6e87b9f70255377e024ace6630c1eaa37f',
  "0xD782BbE5B20841dfDe10baF7e86e299A5D973c0c",
  6,
  "USDC",
  "USD//C"
);
export const USDC_RINKEBY = new Token(
  SupportedChainId.RINKEBY,
  "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b",
  6,
  "tUSDC",
  "test USD//C"
);
export const USDC_GOERLI = new Token(
  SupportedChainId.GOERLI,
  "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
  6,
  "USDC",
  "USD//C"
);
export const USDC_KOVAN = new Token(
  SupportedChainId.KOVAN,
  "0x31eeb2d0f9b6fd8642914ab10f4dd473677d80df",
  6,
  "USDC",
  "USD//C"
);
export const USDC_OPTIMISM = new Token(
  SupportedChainId.OPTIMISM,
  "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
  6,
  "USDC",
  "USD//C"
);
export const USDC_OPTIMISTIC_KOVAN = new Token(
  SupportedChainId.OPTIMISTIC_KOVAN,
  "0x3b8e53b3ab8e01fb57d0c9e893bc4d655aa67d84",
  6,
  "USDC",
  "USD//C"
);
export const USDC_ARBITRUM = new Token(
  SupportedChainId.ARBITRUM_ONE,
  "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
  6,
  "USDC",
  "USD//C"
);
export const USDC_ARBITRUM_RINKEBY = new Token(
  SupportedChainId.ARBITRUM_RINKEBY,
  "0x09b98f8b2395d076514037ff7d39a091a536206c",
  6,
  "USDC",
  "USD//C"
);
export const USDC_POLYGON = new Token(
  SupportedChainId.POLYGON,
  "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
  6,
  "USDC",
  "USD//C"
);
export const USDC_POLYGON_MUMBAI = new Token(
  SupportedChainId.POLYGON_MUMBAI,
  "0xe11a86849d99f524cac3e7a0ec1241828e332c62",
  6,
  "USDC",
  "USD//C"
);

export const USDC_AURORA = new Token(
  SupportedChainId.AURORA,
  "0xB12BFcA5A55806AaF64E99521918A4bf0fC40802",
  6,
  "USDC",
  "USD//C"
);

export const AMPL = new Token(
  SupportedChainId.MAINNET,
  "0xD46bA6D942050d489DBd938a2C909A5d5039A161",
  9,
  "AMPL",
  "Ampleforth"
);
export const DAI = new Token(
  SupportedChainId.MAINNET,
  "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  18,
  "DAI",
  "Dai Stablecoin"
);
export const DAI_ARBITRUM_ONE = new Token(
  SupportedChainId.ARBITRUM_ONE,
  "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
  18,
  "DAI",
  "Dai stable coin"
);
export const DAI_OPTIMISM = new Token(
  SupportedChainId.OPTIMISM,
  "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
  18,
  "DAI",
  "Dai stable coin"
);
export const USDC: { [chainId in SupportedChainId]: Token } = {
  [SupportedChainId.MAINNET]: USDC_MAINNET,
  [SupportedChainId.ARBITRUM_ONE]: USDC_ARBITRUM,
  [SupportedChainId.OPTIMISM]: USDC_OPTIMISM,
  [SupportedChainId.ARBITRUM_RINKEBY]: USDC_ARBITRUM_RINKEBY,
  [SupportedChainId.OPTIMISTIC_KOVAN]: USDC_OPTIMISTIC_KOVAN,
  [SupportedChainId.POLYGON]: USDC_POLYGON,
  [SupportedChainId.POLYGON_MUMBAI]: USDC_POLYGON_MUMBAI,
  [SupportedChainId.GOERLI]: USDC_GOERLI,
  [SupportedChainId.RINKEBY]: USDC_RINKEBY,
  [SupportedChainId.KOVAN]: USDC_KOVAN,
  [SupportedChainId.ROPSTEN]: USDC_ROPSTEN,
  [SupportedChainId.AURORA]: USDC_AURORA,
};
export const DAI_POLYGON = new Token(
  SupportedChainId.POLYGON,
  "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
  18,
  "DAI",
  "Dai Stablecoin"
);

export const DAI_AURORA = new Token(
  SupportedChainId.AURORA,
  "0xe3520349F477A5F6EB06107066048508498A291b",
  18,
  "DAI",
  "Dai Stablecoin"
);

export const USDT_POLYGON = new Token(
  SupportedChainId.POLYGON,
  "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
  6,
  "USDT",
  "Tether USD"
);

export const WBTC_AURORA = new Token(
  SupportedChainId.AURORA,
  "0xF4eB217Ba2454613b15dBdea6e5f22276410e89e",
  8,
  "WBTC",
  "Wrapped BTC"
);

export const WBTC_POLYGON = new Token(
  SupportedChainId.POLYGON,
  "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
  8,
  "WBTC",
  "Wrapped BTC"
);
export const USDT = new Token(
  SupportedChainId.MAINNET,
  "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  6,
  "USDT",
  "Tether USD"
);
export const USDT_ARBITRUM_ONE = new Token(
  SupportedChainId.ARBITRUM_ONE,
  "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
  6,
  "USDT",
  "Tether USD"
);
export const USDT_OPTIMISM = new Token(
  SupportedChainId.OPTIMISM,
  "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
  6,
  "USDT",
  "Tether USD"
);

export const USDT_AURORA = new Token(
  SupportedChainId.AURORA,
  "0x4988a896b1227218e4A686fdE5EabdcAbd91571f",
  6,
  "USDT",
  "Tether USD"
);

export const USDT_ROPSTEN = new Token(
  SupportedChainId.ROPSTEN,
  "0x853d50861703C4Cce0FE85466D20279FC729cc77",
  6,
  "USDT",
  "Tether USD"
);

export const WBTC = new Token(
  SupportedChainId.MAINNET,
  "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  8,
  "WBTC",
  "Wrapped BTC"
);
export const WBTC_ARBITRUM_ONE = new Token(
  SupportedChainId.ARBITRUM_ONE,
  "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
  8,
  "WBTC",
  "Wrapped BTC"
);
export const WBTC_OPTIMISM = new Token(
  SupportedChainId.OPTIMISM,
  "0x68f180fcCe6836688e9084f035309E29Bf0A2095",
  8,
  "WBTC",
  "Wrapped BTC"
);
export const WBTC_ROPSTEN = new Token(
  SupportedChainId.ROPSTEN,
  "0x51624e2EA8B5c5190392AD7D23B118Ec23a2045C",
  8,
  "WBTC",
  "Wrapped BTC"
);
export const FEI = new Token(
  SupportedChainId.MAINNET,
  "0x956F47F50A910163D8BF957Cf5846D573E7f87CA",
  18,
  "FEI",
  "Fei USD"
);
export const TRIBE = new Token(
  SupportedChainId.MAINNET,
  "0xc7283b66Eb1EB5FB86327f08e1B5816b0720212B",
  18,
  "TRIBE",
  "Tribe"
);
export const FRAX = new Token(
  SupportedChainId.MAINNET,
  "0x853d955aCEf822Db058eb8505911ED77F175b99e",
  18,
  "FRAX",
  "Frax"
);
export const FXS = new Token(
  SupportedChainId.MAINNET,
  "0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0",
  18,
  "FXS",
  "Frax Share"
);
export const renBTC = new Token(
  SupportedChainId.MAINNET,
  "0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D",
  8,
  "renBTC",
  "renBTC"
);
export const ETH2X_FLI = new Token(
  SupportedChainId.MAINNET,
  "0xAa6E8127831c9DE45ae56bB1b0d4D4Da6e5665BD",
  18,
  "ETH2x-FLI",
  "ETH 2x Flexible Leverage Index"
);
export const sETH2 = new Token(
  SupportedChainId.MAINNET,
  "0xFe2e637202056d30016725477c5da089Ab0A043A",
  18,
  "sETH2",
  "StakeWise Staked ETH2"
);
export const rETH2 = new Token(
  SupportedChainId.MAINNET,
  "0x20BC832ca081b91433ff6c17f85701B6e92486c5",
  18,
  "rETH2",
  "StakeWise Reward ETH2"
);
export const SWISE = new Token(
  SupportedChainId.MAINNET,
  "0x48C3399719B582dD63eB5AADf12A40B4C3f52FA2",
  18,
  "SWISE",
  "StakeWise"
);
export const WETH_POLYGON_MUMBAI = new Token(
  SupportedChainId.POLYGON_MUMBAI,
  "0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa",
  18,
  "WETH",
  "Wrapped Ether"
);

export const WETH_POLYGON = new Token(
  SupportedChainId.POLYGON,
  "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
  24,
  "WETH",
  "Wrapped Ether"
);

export const WNEAR_AURORA = new Token(
  SupportedChainId.AURORA,
  "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d",
  24,
  "wNEAR",
  "Wrapped Near"
);

/// TRI
export const TRI_AURORA = new Token(
  SupportedChainId.AURORA,
  "0xFa94348467f64D5A457F75F8bc40495D33c65aBB",
  18,
  "TRI",
  "Trisolaris Token"
);

export const AURORA = new Token(
  SupportedChainId.AURORA,
  "0x8BEc47865aDe3B172A928df8f990Bc7f2A3b9f79",
  18,
  "AURORA",
  "Aurora"
);

export const XTRI_AURORA = new Token(
  SupportedChainId.AURORA,
  "0x802119e4e253D5C19aA06A5d567C5a41596D6803",
  18,
  "xTRI",
  "xTRI"
);

export const ATLUNA_AURORA = new Token(
  SupportedChainId.AURORA,
  "0xC4bdd27c33ec7daa6fcfd8532ddB524Bf4038096",
  18,
  "atLUNA",
  "Wrapped LUNA"
);

export const STNEAR_AURORA = new Token(
  SupportedChainId.AURORA,
  "0x07F9F7f963C5cD2BBFFd30CcfB964Be114332E30",
  18,
  "stNEAR",
  "Staked NEAR"
);

export const PLY_AURORA = new Token(
  SupportedChainId.AURORA,
  "0x09C9D464b58d96837f8d8b6f4d9fE4aD408d3A4f",
  18,
  "PLY",
  "Aurigami Token"
);

export const WRAPPED_NATIVE_CURRENCY: { [chainId: number]: Token | undefined } =
  {
    ...(WETH9 as Record<SupportedChainId, Token>),
    [SupportedChainId.OPTIMISM]: new Token(
      SupportedChainId.OPTIMISM,
      "0x4200000000000000000000000000000000000006",
      18,
      "WETH",
      "Wrapped Ether"
    ),
    [SupportedChainId.OPTIMISTIC_KOVAN]: new Token(
      SupportedChainId.OPTIMISTIC_KOVAN,
      "0x4200000000000000000000000000000000000006",
      18,
      "WETH",
      "Wrapped Ether"
    ),
    [SupportedChainId.ARBITRUM_ONE]: new Token(
      SupportedChainId.ARBITRUM_ONE,
      "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      18,
      "WETH",
      "Wrapped Ether"
    ),
    [SupportedChainId.ARBITRUM_RINKEBY]: new Token(
      SupportedChainId.ARBITRUM_RINKEBY,
      "0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681",
      18,
      "WETH",
      "Wrapped Ether"
    ),
    [SupportedChainId.POLYGON]: new Token(
      SupportedChainId.POLYGON,
      "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
      18,
      "WMATIC",
      "Wrapped MATIC"
    ),
    [SupportedChainId.POLYGON_MUMBAI]: new Token(
      SupportedChainId.POLYGON_MUMBAI,
      "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
      18,
      "WMATIC",
      "Wrapped MATIC"
    ),
    [SupportedChainId.AURORA]: new Token(
      SupportedChainId.AURORA,
      "0xC9BdeEd33CD01541e1eeD10f90519d2C06Fe3feB",
      18,
      "WETH",
      "Wrapped Ether"
    ),
  };

function isMatic(
  chainId: number
): chainId is SupportedChainId.POLYGON | SupportedChainId.POLYGON_MUMBAI {
  return (
    chainId === SupportedChainId.POLYGON_MUMBAI ||
    chainId === SupportedChainId.POLYGON
  );
}

class MaticNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (!isMatic(this.chainId)) throw new Error("Not matic");
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId];
    invariant(wrapped instanceof Token);
    return wrapped;
  }

  public constructor(chainId: number) {
    if (!isMatic(chainId)) throw new Error("Not matic");
    super(chainId, 18, "MATIC", "Polygon Matic");
  }
}

export class ExtendedEther extends Ether {
  public get wrapped(): Token {
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (wrapped) return wrapped;
    throw new Error("Unsupported chain ID");
  }

  private static _cachedExtendedEther: { [chainId: number]: NativeCurrency } =
    {};

  public static onChain(chainId: number): ExtendedEther {
    return (
      this._cachedExtendedEther[chainId] ??
      (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId))
    );
  }
}

const cachedNativeCurrency: { [chainId: number]: NativeCurrency } = {};
export function nativeOnChain(chainId: number): NativeCurrency {
  return (
    cachedNativeCurrency[chainId] ??
    (cachedNativeCurrency[chainId] = isMatic(chainId)
      ? new MaticNativeCurrency(chainId)
      : ExtendedEther.onChain(chainId))
  );
}
