import { formatEthAddress } from "eth-address";
import { Image as AccountImage } from "@davatar/react";
import Image from "next/image";
import MintButton from "lib/components/mint-button";
import { theme } from "lib/theme";
import { getNetwork, supportedChainIds } from "lib/network";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useState } from "react";
import SupportedNetworks from "./components/supported-networks";
import EthIcon from "../eth-icon";
import downIcon from "lib/assets/down.svg";
import ErrorIcon from "./components/error-icon";

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

const ConnectedWallet = () => {
  const { account, chainId } = useWeb3React<Web3Provider>();
  const [showSupportedNetworks, setShowSupportedNetworks] = useState<boolean>(false);

  const isSupportedNetwork = supportedChainIds.includes(chainId);

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <Outline>
          <button
            className="flex items-center"
            onClick={() => setShowSupportedNetworks(!showSupportedNetworks)}
          >
            {isSupportedNetwork ? <EthIcon /> : <ErrorIcon />}
            <span className="font-semibold">{getNetwork(chainId)}</span>
            <DownIcon>
              <Image src={downIcon} height={14} width={14} />
            </DownIcon>
          </button>
        </Outline>
        <Outline>
          <span className="font-semibold">{formatEthAddress(account)}</span>
          <Icon>
            <AccountImage size={18} address={account} />
          </Icon>
        </Outline>
        <div className="ml-4">
          <MintButton />
        </div>
      </div>
      {showSupportedNetworks && <SupportedNetworks />}
    </div>
  );
};

export default ConnectedWallet;
