import { SupportedChainId } from "./network";

export type AddressMap = { [chainId: number]: string };

export const CONTRACT_ADDRESSES: AddressMap = {
  [SupportedChainId.RINKEBY]: "0x04923C782aC656b5fD0705d218A0ac63856C44c4",
  [SupportedChainId.ROPSTEN]: "0xb527f82c17e70286a32B2b494fF2022fA71Db18A",
};
