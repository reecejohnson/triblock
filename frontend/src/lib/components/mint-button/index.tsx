import nftContract from "lib/abi/Nft.json";
import { CONTRACT_ADDRESSES } from "lib/addresses";
import { useContract } from "lib/hooks/useContract";
import { Button } from "lib/styles/button";
import { useNftMintedEventListener } from "lib/hooks/useEventListener";

const MintButton = () => {
  const mintingContract = useContract(CONTRACT_ADDRESSES, nftContract.abi);
  useNftMintedEventListener(mintingContract);

  const mintNft = async () => {
    try {
      const nftTxn = await mintingContract.mintNft();
      await nftTxn.wait();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={mintNft}>
        <span>Mint Your TriBolt</span>
      </Button>
    </>
  );
};

export default MintButton;
