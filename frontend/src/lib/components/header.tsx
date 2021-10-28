import { useEffect, useState } from "react";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { NoEthereumProviderError } from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers";
import { GradientSpan } from "../../views/landing/index.styles";
import { injected } from "../connectors";
import { isDesktop } from "../screen-sizes";
import Logo from "./logo";
import { Button } from "../styles/button";
import ConnectedWallet from "./connected-wallet";

const Root = styled.div`
  position: fixed;
  max-width: 1650px;
  width: 100%;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  padding: 20px 0;
  z-index: 100;
`;

const LogoContainer = styled.div`
  position: relative;
  height: 50px;
  width: 50px;
`;

const Title = styled.div`
  color: #4b5563;
  margin-left: 10px;

  ${isDesktop} {
    margin-left: 25px;
  }
`;

const Header = () => {
  const { activate, account } = useWeb3React<Web3Provider>();

  useEffect(() => {
    connectWallet();
  }, []);

  async function connectWallet() {
    try {
      await activate(injected);
    } catch (e) {
      if (e instanceof NoEthereumProviderError)
        return (window.location.href = "https://metamask.io/");
    }
  }
  return (
    <div className="flex justify-center">
      <Root>
        <div className="flex items-center">
          <Title className="text-2xl md:text-3xl font-bold tracking-tight gradient-text  mx-auto">
            Tri<GradientSpan>Bolt</GradientSpan>
          </Title>
          <LogoContainer>
            <Logo />
          </LogoContainer>
        </div>

        {!account ? (
          <div className="flex items-center">
            <Button onClick={connectWallet}>
              <span>Connect Wallet</span>
            </Button>
          </div>
        ) : (
          <ConnectedWallet />
        )}
      </Root>
    </div>
  );
};

export default Header;
