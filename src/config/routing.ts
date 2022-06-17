// a list of tokens by chain
import { Token } from "@uniswap/sdk-core";

import { SupportedChainId } from "./chains";
import {
  AMPL,
  ATLUNA_AURORA,
  AURORA,
  DAI,
  DAI_ARBITRUM_ONE,
  DAI_AURORA,
  DAI_OPTIMISM,
  DAI_POLYGON,
  ETH2X_FLI,
  FEI,
  FRAX,
  FXS,
  PLY_AURORA,
  renBTC,
  rETH2,
  sETH2,
  STNEAR_AURORA,
  SWISE,
  TRIBE,
  TRI_AURORA,
  USDC_AURORA,
  USDC_MAINNET,
  USDC_POLYGON,
  USDC_ROPSTEN,
  USDT,
  USDT_ARBITRUM_ONE,
  USDT_AURORA,
  USDT_OPTIMISM,
  USDT_POLYGON,
  USDT_ROPSTEN,
  WBTC,
  WBTC_ARBITRUM_ONE,
  WBTC_OPTIMISM,
  WBTC_ROPSTEN,
  WETH_POLYGON,
  WNEAR_AURORA,
  WRAPPED_NATIVE_CURRENCY,
  XTRI_AURORA,
} from "./tokens";

type ChainTokenList = {
  readonly [chainId: number]: Token[];
};

const WRAPPED_NATIVE_CURRENCIES_ONLY: ChainTokenList = Object.fromEntries(
  Object.entries(WRAPPED_NATIVE_CURRENCY)
    .map(([key, value]) => [key, [value]])
    .filter(Boolean)
);

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WRAPPED_NATIVE_CURRENCIES_ONLY,
  [SupportedChainId.MAINNET]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.MAINNET],
    DAI,
    USDC_MAINNET,
    USDT,
    WBTC,
  ],
  [SupportedChainId.OPTIMISM]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.OPTIMISM],
    DAI_OPTIMISM,
    USDT_OPTIMISM,
    WBTC_OPTIMISM,
  ],
  [SupportedChainId.ARBITRUM_ONE]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.ARBITRUM_ONE],
    DAI_ARBITRUM_ONE,
    USDT_ARBITRUM_ONE,
    WBTC_ARBITRUM_ONE,
  ],
  [SupportedChainId.POLYGON]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.POLYGON],
    DAI_POLYGON,
    USDC_POLYGON,
    USDT_POLYGON,
    WETH_POLYGON,
  ],
  [SupportedChainId.AURORA]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.AURORA],
    DAI_AURORA,
    USDC_AURORA,
    USDT_AURORA,
    WNEAR_AURORA,
    TRI_AURORA,
    AURORA,
    XTRI_AURORA,
    STNEAR_AURORA,
    ATLUNA_AURORA,
    PLY_AURORA,
  ],
  [SupportedChainId.ROPSTEN]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.ROPSTEN],
    USDC_ROPSTEN,
    USDT_ROPSTEN,
    WBTC_ROPSTEN,
  ],
};
export const ADDITIONAL_BASES: {
  [chainId: number]: { [tokenAddress: string]: Token[] };
} = {
  [SupportedChainId.MAINNET]: {
    "0xF16E4d813f4DcfDe4c5b44f305c908742De84eF0": [ETH2X_FLI],
    [rETH2.address]: [sETH2],
    [SWISE.address]: [sETH2],
    [FEI.address]: [TRIBE],
    [TRIBE.address]: [FEI],
    [FRAX.address]: [FXS],
    [FXS.address]: [FRAX],
    [WBTC.address]: [renBTC],
    [renBTC.address]: [WBTC],
  },
};
/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: {
  [chainId: number]: { [tokenAddress: string]: Token[] };
} = {
  [SupportedChainId.MAINNET]: {
    [AMPL.address]: [
      DAI,
      WRAPPED_NATIVE_CURRENCY[SupportedChainId.MAINNET] as Token,
    ],
  },
};
