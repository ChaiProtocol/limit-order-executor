import { SupportedChainId } from "./config/chains";
import { DEXId } from "./config/dexs";

export type Config = {
  wallets: string[];
  rpc: string;
  multicall: string;
  graphql: string;
  dexId: DEXId;
  chainId: SupportedChainId;
  swapRouter: string;
  executor: string;
  limitOrder: string;
};

// parse config from somewhere, environment or config file...
export const parseConfig = (): Config => {
  return {
    wallets: process.env.WALLETS!.split(","),
    rpc: process.env.RPC_PROVIDER!,
    multicall: process.env.MULTICALL!,
    graphql: "https://graph.chai.xyz/subgraphs/name/chaiprotocol/limitorder",
    dexId: DEXId.Chai,
    chainId: SupportedChainId.AURORA,
    swapRouter: "0xD8175C3603b6eC415Df1539dA66D66d8834a962b",
    executor: "0x86ca972950FD3F1D2A6806D36C0Af65c3fe39367",
    limitOrder: "0xeD197c865D9343223d1758019977BdEA989e095b",
  };
};
