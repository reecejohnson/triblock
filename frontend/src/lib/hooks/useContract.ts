import { useMemo } from "react";
import { Contract } from "@ethersproject/contracts";
import { AddressMap } from "lib/addresses";
import { getContract } from "lib/utils/web3";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

export function useContract<T extends Contract = Contract>(
  addressByNetwork: AddressMap,
  ABI: any
): T | null {
  const { library, account, chainId } = useWeb3React<Web3Provider>();

  return useMemo(() => {
    if (!addressByNetwork || !ABI || !library || !chainId) return null;
    const address = addressByNetwork[chainId];
    if (!address) return null;
    try {
      return getContract(address, ABI, library, account);
    } catch (error) {
      return null;
    }
  }, [addressByNetwork, ABI, library, chainId, account]) as T;
}
