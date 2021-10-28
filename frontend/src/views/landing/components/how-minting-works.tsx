import { GradientSpan } from "../index.styles";

const HowMintingWorks = () => {
  return (
    <section className="py-16 text-gray-600 md:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-20 xl:gap-x-24">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-gray-600 text-opacity-70">
              <span className="mr-2">&#127912;</span>NFT SPECIFICS{" "}
              <span className="mr-2">&#127912;</span>
            </p>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              How does minting a TriBolt as a{" "}
              <GradientSpan className="font-bold">non-fungible token</GradientSpan> (NFT) on
              Ethereum work?
            </h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed">
              TriBolts are completely on-chain.
              <br />
              <br />
              Colour selection, image generation and storage all happen on the Ethereum blockchain
              in this <a className="text-medium text-blue-500">smart contract</a>.
              <br />
              <br />
              Every TrioBlock is stored as ERC-721 token with it's metadata stored on-chain as a
              base64 encoded string.
              <br />
              <br />
              On mint of a TriBolt, the contract will decide based on a number of factors, which
              colours to randomly assign to you.
              <br />
              <br />
              Which colours will you get?{" "}
              <GradientSpan className="font-semibold">It's the contract's decision.</GradientSpan>
              <br />
              <br />
              You will then be able to view your TriBolt in your wallet on OpenSea and in Rainbow.
              <br />
              <br />
              Only 128 TriBolts will ever exist. Each piece will be a unique 1/1 crafted by code
              and stored immutably on the blockchain for eternity &#9889; &#9889; &#9889;
              <br />
              <br />
              Minting is free. This is not a money grab. There is no roadmap, no promises and no
              airdrop. A project simply exploring the realm of NFTs, on-chain art and Ethereum.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowMintingWorks;
