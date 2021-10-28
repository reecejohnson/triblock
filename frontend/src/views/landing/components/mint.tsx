import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import logoQuestion from "lib/assets/logo-question.svg";
import { GradientSpan } from "../index.styles";
import MintButton from "../../../lib/components/mint-button";

const Root = styled.div``;

const Logo = styled.div`
  position: relative;
`;

const Mint = () => {
  const totalSupply = 128;
  const [amountClaimed, setAmountClaimed] = useState<number>(0);
  const amountLeft = totalSupply - amountClaimed;

  return (
    <Root>
      <div className="max-w-3xl mx-auto text-center text-gray-600 my-20 border-1">
        <p className="text-sm font-semibold tracking-widest text-gray-600 text-opacity-70 uppercase">
          <span className="mr-2">&#9889;</span>CLAIMING<span className="ml-2">&#9889;</span>
        </p>
        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-16">
          Mint your TriBolt
        </h2>
        <Logo>
          <Image src={logoQuestion} height={500} width={500} />
        </Logo>
        <div className="text-lg leading-relaxed">
          <p className="max-w-lg mt-10 mx-auto">
            Each TriBolt is unique and created for it's minter by the algorithm embedded in the
            Ethereum blockchain. There will only ever be{" "}
            <span className="font-bold">{amountLeft}</span> to exist, and{" "}
            <span className="font-bold">{amountClaimed}</span> {amountClaimed == 1 ? "has" : "have"}{" "}
            already been claimed.
          </p>

          <p className="mt-10 font-semibold">
            Minting Cost: <GradientSpan className="font-bold">0 ETH (+ Gas Fee)</GradientSpan>
          </p>
          <div className="flex justify-center mt-12">
            <MintButton />
          </div>
        </div>
      </div>
    </Root>
  );
};
export default Mint;
