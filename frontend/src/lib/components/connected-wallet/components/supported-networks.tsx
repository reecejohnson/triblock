import styled from "styled-components";
import { theme } from "lib/theme";
import { getNetwork, supportedChainIds } from "lib/network";
import EthIcon from "lib/components/eth-icon";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import ErrorIcon from "./error-icon";

const Root = styled.div`
  position: fixed;
  top: 80px;
  min-width: 250px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(247, 248, 250);
  border-radius: 12px;
  color: ${theme.colours.grey};
  padding: 20px;
  z-index: 1;
`;

const SupportedNetworks = () => {
  const { chainId } = useWeb3React<Web3Provider>();
  const isUnsupportedNetwork = !supportedChainIds.includes(chainId);
  return (
    <Root>
      <div className="flex flex-col">
        {isUnsupportedNetwork && (
          <div className="flex items-center pl-2 mb-4 justify-between">
            <div className="flex items-center mb-1">
              <ErrorIcon />
              <span className="font-semibold">{getNetwork(chainId)} is not supported</span>
            </div>
          </div>
        )}
        <span>Supported Networks</span>
        {supportedChainIds.map((supportedChainId: number) => {
          return (
            <div className="flex items-center pl-2 mt-3 justify-between">
              <div className="flex items-center mb-1">
                <EthIcon />
                <span className="font-semibold">{getNetwork(supportedChainId)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Root>
  );
};

export default SupportedNetworks;
