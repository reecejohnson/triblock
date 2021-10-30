import { useEffect } from "react";
import { Contract } from "@ethersproject/contracts";

export function useEventListener(contract: Contract, eventName: string, callback: any) {
  useEffect(() => {
    if (!contract) return;
    contract.on(eventName, callback);
    return () => {
      contract.off(eventName, callback);
    };
  }, []);
}

export function useNftMintedEventListener(contract: Contract) {
  function handleNewNftMint(from, tokenId) {
    console.log("new nft minted", from, tokenId.toNumber());
  }
  useEventListener(contract, "NewNFTMinted", handleNewNftMint);
}
