import { initializeConnector } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect";
import { URLS } from "./chains";

//eslint-disable-next-line
//@ts-ignore
const [walletConnect, hooks] = initializeConnector<WalletConnect>(
  (actions: any) =>
    new WalletConnect(actions, {
      rpc: Object.keys(URLS).reduce<{ [chainId: number]: string }>(
        (accumulator, chainId) => {
          accumulator[Number(chainId)] = URLS[Number(chainId)][0];
          return accumulator;
        },
        {}
      ),
    }),
  Object.keys(URLS).map((chainId) => Number(chainId))
);
export { walletConnect, hooks };
