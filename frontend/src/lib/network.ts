export enum SupportedChainId {
  ROPSTEN = 3,
  RINKEBY = 4,
}

export const supportedChainIds = [SupportedChainId.ROPSTEN, SupportedChainId.RINKEBY];

export const getNetwork = (chainId: number) => {
  switch (chainId) {
    case 1:
      return "Mainnet";
    case 3:
      return "Ropsten";
    case 4:
      return "Rinkeby";
    case 5:
      return "Goerli";
    case 2018:
      return "Dev";
    case 61:
      return "Classic";
    case 63:
      return "Mordor";
    case 6:
      return "Kotti";
    case 212:
      return "Astor";
    case 42:
      return "Kovan";
    default:
      return "Unknown Network";
  }
};
