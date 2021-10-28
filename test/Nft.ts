import chai from "chai";
// @ts-ignore
import { ethers } from "hardhat";
import chaiAsPromised from "chai-as-promised";
import { Nft, Nft__factory } from "../frontend/src/hardhat/typechain";
import { solidity } from "ethereum-waffle";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ContractNames } from "../config/contract-names";
import { allColours } from "../config/colours";
import { ContractReceipt } from "ethers";

const { expect } = chai;
chai.use(solidity);
chai.use(chaiAsPromised);

enum EventName {
  ColoursSelected = "ColoursSelected",
  FirstColourSelected = "FirstColourSelected",
  SecondColourSelected = "SecondColourSelected",
  ThirdColourSelected = "ThirdColourSelected",
  MetadataCreated = "MetadataCreated",
}

type MetaData = {
  name: string;
  description: string;
  image: string;
};

describe("Nft", () => {
  let nftContract: Nft;
  let accountOne: SignerWithAddress,
    accountTwo: SignerWithAddress,
    accountThree: SignerWithAddress;

  beforeEach(async () => {
    [accountOne, accountTwo, accountThree] = await ethers.getSigners();

    const nftFactory = (await ethers.getContractFactory(
      ContractNames.Nft,
      accountOne
    )) as unknown as Nft__factory;

    nftContract = await nftFactory.deploy();

    await nftContract.deployed();
  });

  it("should have the correct number of colours", async () => {
    const firstColoursArray = await nftContract.getFirstColours();
    const secondColoursArray = await nftContract.getSecondColours();
    const thirdColoursArray = await nftContract.getThirdColours();

    console.log(allColours.map((c) => c.slice(1, c.length)));

    expect(firstColoursArray).to.have.length(63);
    expect(secondColoursArray).to.have.length(63);
    expect(thirdColoursArray).to.have.length(63);
    expect(allColours).to.have.length(63);
  });

  it("should emit event with all colours selected", async () => {
    await expect(nftContract.mintNft()).to.emit(
      nftContract,
      EventName.ColoursSelected
    );
  });

  it("should use a different colours for each block", async () => {
    let expectedUsedColours = [...allColours];

    for (let i = 0; i < allColours.length; i++) {
      const tx = await nftContract.mintNft();
      const res = await tx.wait();
      const firstColour = getColourForEvent(res, EventName.FirstColourSelected);
      expectedUsedColours = popColour(expectedUsedColours, firstColour);
    }
  });

  it("should have no three blocks the same and under 10 same two blocks", async () => {
    let doubleMatch = 0;
    let tripleMatch = 0;

    for (let i = 0; i < allColours.length; i++) {
      const tx = await nftContract.mintNft();
      const res = await tx.wait();
      const firstColour = getColourForEvent(res, EventName.FirstColourSelected);
      const secondColour = getColourForEvent(
        res,
        EventName.SecondColourSelected
      );
      const thirdColour = getColourForEvent(res, EventName.ThirdColourSelected);
      if (hasAllColoursTheSame(firstColour, secondColour, thirdColour)) {
        tripleMatch++;
      }
      if (hasTwoColoursTheSame(firstColour, secondColour, thirdColour)) {
        doubleMatch++;
      }
    }
    expect(tripleMatch).to.eq(0);
    expect(doubleMatch).to.be.lessThan(10);
  }).timeout(10000);

  it("should use each first colour and emit event", async () => {
    let expectedUsedColours = [...allColours];

    for (let i = 0; i < allColours.length; i++) {
      const tx = await nftContract.mintNft();
      const res = await tx.wait();
      const firstColour = getColourForEvent(res, EventName.FirstColourSelected);
      expectedUsedColours = popColour(expectedUsedColours, firstColour);
    }

    expect(expectedUsedColours).to.have.length(0);
    const firstColourResponse = await nftContract.getSecondColours();
    expect(firstColourResponse).to.have.length(0);
  }).timeout(10000);

  it("should use each second colour and emit event", async () => {
    let expectedUsedColours = [...allColours];

    for (let i = 0; i < allColours.length; i++) {
      const tx = await nftContract.mintNft();
      const res = await tx.wait();
      const secondColour = getColourForEvent(
        res,
        EventName.SecondColourSelected
      );
      expectedUsedColours = popColour(expectedUsedColours, secondColour);
    }

    expect(expectedUsedColours).to.have.length(0);
    const secondColoursResponse = await nftContract.getSecondColours();
    expect(secondColoursResponse).to.have.length(0);
  }).timeout(10000);

  it("should use each third colour and emit event", async () => {
    let expectedUsedColours = [...allColours];

    for (let i = 0; i < allColours.length; i++) {
      const tx = await nftContract.mintNft();
      const res = await tx.wait();
      const thirdColour = getColourForEvent(res, EventName.ThirdColourSelected);
      expectedUsedColours = popColour(expectedUsedColours, thirdColour);
    }

    expect(expectedUsedColours).to.have.length(0);
    const thirdColoursResponse = await nftContract.getThirdColours();
    expect(thirdColoursResponse).to.have.length(0);
  }).timeout(10000);

  it("should have the correct id for the nft title", async () => {
    for (let i = 0; i < allColours.length; i++) {
      const tx = await nftContract.mintNft();
      const res = await tx.wait();

      const json = res.events.find((e) => e.event === EventName.MetadataCreated)
        .args[0];

      const metadata = decode(json);

      expect(metadata.name).to.eq(`Tri Lines #${i}`);
    }
  }).timeout(10000);

  function getColourForEvent(res: ContractReceipt, eventName: EventName) {
    return res.events.find((e) => e.event === eventName).args[0];
  }

  function popColour(colours: Array<string>, colour: string): Array<string> {
    const index = colours.indexOf(`#${colour}`);
    if (index > -1) {
      colours.splice(index, 1);
    }
    return colours;
  }

  function hasAllColoursTheSame(firstColour, secondColour, thirdColour) {
    return (
      firstColour === secondColour &&
      firstColour == thirdColour &&
      secondColour === thirdColour
    );
  }

  function hasTwoColoursTheSame(firstColour, secondColour, thirdColour) {
    const oneAndTwoMatch = firstColour === secondColour;
    const oneAndThreeMatch = firstColour === thirdColour;
    const twoAndThreeMatch = secondColour === thirdColour;
    return oneAndTwoMatch || oneAndThreeMatch || twoAndThreeMatch;
  }

  function decode(str: string): MetaData {
    return JSON.parse(Buffer.from(str, "base64").toString("binary"));
  }
});
