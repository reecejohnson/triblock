// @ts-ignore
import { ethers } from "hardhat";

const main = async () => {
  const nftContractFactory = await ethers.getContractFactory("Nft");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  let transaction = await nftContract.mintNft();
  await transaction.wait();
  console.log("Minted NFT #1");

  transaction = await nftContract.mintNft();
  await transaction.wait();
  console.log("Minted NFT #2");

  transaction = await nftContract.mintNft();
  await transaction.wait();
  console.log("Minted NFT #3");

  transaction = await nftContract.mintNft();
  await transaction.wait();
  console.log("Minted NFT #4");

  transaction = await nftContract.mintNft();
  await transaction.wait();
  console.log("Minted NFT #5");

  transaction = await nftContract.mintNft();
  await transaction.wait();
  console.log("Minted NFT #6");

  transaction = await nftContract.mintNft();
  await transaction.wait();
  console.log("Minted NFT #7");

  transaction = await nftContract.mintNft();
  await transaction.wait();
  console.log("Minted NFT #8");

  transaction = await nftContract.mintNft();
  await transaction.wait();
  console.log("Minted NFT #9");

  transaction = await nftContract.mintNft();
  await transaction.wait();
  console.log("Minted NFT #10");
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
