import {
  FACTORY_ADDRESS as V2_FACTORY_ADDRESS,
  INIT_CODE_HASH,
} from "@uniswap/v2-sdk";
import { DEXId } from "./dexs";
import { constructSameAddressMap } from "./constructSameAddressMap";

type AddressMap = { [chainId: number]: string };

export const V2_FACTORY_ADDRESSES: AddressMap =
  constructSameAddressMap(V2_FACTORY_ADDRESS);

export const FACTORY_ADDRESSES = {
  [DEXId.Uniswap]: V2_FACTORY_ADDRESS,
  [DEXId.Trisolaris]: "0xc66F594268041dB60507F00703b152492fb176E7",
  [DEXId.Chai]: "0x112C68D1e7DB574b6E48833DfC80C934d1372aEC",
};

export const INIT_CODES_HASH = {
  [DEXId.Uniswap]: INIT_CODE_HASH,
  [DEXId.Trisolaris]: "0x112C68D1e7DB574b6E48833DfC80C934d1372aEC",
  [DEXId.Chai]:
    "0xb4843bf99affd13458c25a9ea6b85dfab3ca09f67a11a5d6545f7e7600c09580",
};
