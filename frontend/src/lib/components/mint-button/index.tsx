import nftContract from "lib/abi/Nft.json";
import { CONTRACT_ADDRESSES } from "lib/addresses";
import { useContract } from "lib/hooks/useContract";
import { Button } from "lib/styles/button";

const MintButton = () => {
  const mintingContract = useContract(CONTRACT_ADDRESSES, nftContract.abi);

  console.log(mintingContract);

  const mintNft = async () => {
    try {
      await setupEventListener();

      const nftTxn = await mintingContract.mintNft();
      await nftTxn.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const setupEventListener = async () => {
    try {
      mintingContract.on("NewNFTMinted", (from, tokenId) => {
        console.log("new nft minted", from, tokenId.toNumber());
      });
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
