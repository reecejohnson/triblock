// @ts-ignore
import { ethers } from "hardhat";

const main = async () => {
  const nftContractFactory = await ethers.getContractFactory("Nft");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  for (let i = 0; i < 62; i++) {
    const transaction = await nftContract.mintNft();
    await transaction.wait();
  }
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
