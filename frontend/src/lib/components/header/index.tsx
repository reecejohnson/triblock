import { useEffect, useState } from "react";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { NoEthereumProviderError } from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers";
import { GradientSpan } from "../../../views/landing/index.styles";
import { ConnectorNames, connectorsByName } from "../../connectors";
import { isDesktop } from "../../screen-sizes";
import Logo from "../logo";
import { Button } from "../../styles/button";
import EthIcon from "../eth-icon";
import ErrorIcon from "../connected-wallet/components/error-icon";
import { getNetwork, supportedChainIds } from "../../chains";
import Image from "next/image";
import downIcon from "../../assets/down.svg";
import { formatEthAddress } from "eth-address";
import { Image as AccountImage } from "@davatar/react";
import MintButton from "../mint-button";
import SelectNetworks from "../connected-wallet/components/select-networks";
import { theme } from "../../theme";
import WalletConnectionError, {
  WalletConnectionErrorType,
} from "./components/wallet-connection-error";
import { useEagerConnect } from "../../hooks/useEagerConnect";
import { useInactiveListener } from "../../hooks/useInactiveLisenter";

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

const DownIcon = styled.div`
  width: 14px;
  margin-left: 5px;
`;

const Outline = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(247, 248, 250);
  border-radius: 12px;
  padding: 0 15px;
  height: 45px;
  color: ${theme.colours.grey};
  margin-right: 10px;
`;

const Icon = styled.div`
  margin-left: 5px;
`;

const Header = () => {
  const { activate, account, chainId, connector } = useWeb3React<Web3Provider>();
  const [showSupportedNetworks, setShowSupportedNetworks] = useState<boolean>(false);
  const [walletConnectionError, setWalletConnectionError] =
    useState<WalletConnectionErrorType>(undefined);

  const [activatingConnector, setActivatingConnector] = useState<any>();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  console.log("connector", activatingConnector);
  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);
  const isSupportedNetwork = supportedChainIds.includes(chainId);

  console.log(walletConnectionError);

  async function connectWallet(connectorName: ConnectorNames) {
    try {
      await activate(connectorsByName[connectorName], undefined, true);
    } catch (e) {
      console.log(e);
      if (e instanceof NoEthereumProviderError) {
        setWalletConnectionError(WalletConnectionErrorType.NO_METAMASK);
        return;
      }
      if (e.name === "UnsupportedChainIdError") {
        setWalletConnectionError(WalletConnectionErrorType.UNSUPPORTED_CHAIN_ID);
        return;
      }
      setWalletConnectionError(WalletConnectionErrorType.GENERIC);
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

        <div className="flex items-center">
          <div className="flex flex-col">
            <div className="flex items-center">
              <Outline>
                <button
                  className="flex items-center"
                  onClick={() => setShowSupportedNetworks(!showSupportedNetworks)}
                >
                  {isSupportedNetwork ? <EthIcon /> : <ErrorIcon />}
                  <span className="font-semibold">
                    {chainId ? getNetwork(chainId) : "No network connected"}
                  </span>
                  <DownIcon>
                    <Image src={downIcon} height={14} width={14} />
                  </DownIcon>
                </button>
              </Outline>
            </div>
            {showSupportedNetworks && (
              <SelectNetworks hideSelectNetwork={() => setShowSupportedNetworks(false)} />
            )}
          </div>

          {!account ? (
            <div className="flex items-center">
              <Button
                onClick={() => {
                  setActivatingConnector(connectorsByName[ConnectorNames.Injected]);
                  return connectWallet(ConnectorNames.Injected);
                }}
              >
                <span>Connect with Metamask</span>
              </Button>
            </div>
          ) : (
            <>
              <Outline>
                <span className="font-semibold">{formatEthAddress(account)}</span>
                <Icon>
                  <AccountImage size={18} address={account} />
                </Icon>
              </Outline>
              <div className="ml-4">
                <MintButton />
              </div>
            </>
          )}
        </div>
      </Root>
      {walletConnectionError && (
        <WalletConnectionError
          walletConnectionError={walletConnectionError}
          closeModal={() => setWalletConnectionError(undefined)}
        />
      )}
    </div>
  );
};

export default Header;
