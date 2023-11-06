import {
  InjectedConnector,
  type Chain,
  type InjectedConnectorOptions,
} from "@wagmi/core";
import { WalletResult } from "../../type";
import logo from "./logo.svg";

declare global {
  interface Window {
    enkrypt: {
      providers: {
        ethereum: any;
      };
    };
  }
}

export interface EnkryptWalletOptions {
  chains: Chain[];
}

export const enkryptWallet = ({
  chains,
  ...options
}: EnkryptWalletOptions & InjectedConnectorOptions): WalletResult => {
  const isEnkryptInjected =
    typeof window !== "undefined" &&
    typeof window.enkrypt !== "undefined" &&
    window?.enkrypt?.providers?.ethereum;
  return {
    id: "enkrypt",
    name: "Enkrypt Wallet",
    logo,
    installed: isEnkryptInjected ? true : undefined,
    downloadUrls: {
      chrome:
        "https://chrome.google.com/webstore/detail/enkrypt-ethereum-polkadot/kkpllkodjeloidieedojogacfhpaihoh",
      edge: "https://microsoftedge.microsoft.com/addons/detail/enkrypt-ethereum-polkad/gfenajajnjjmmdojhdjmnngomkhlnfjl",
      firefox: "https://addons.mozilla.org/en-US/firefox/addon/enkrypt/",
      safari: "https://apps.apple.com/app/enkrypt-web3-wallet/id1640164309",
    },
    connector: {
      browser: new InjectedConnector({
        chains,
        options: {
          getProvider: () =>
            isEnkryptInjected
              ? window?.enkrypt?.providers?.ethereum
              : undefined,
          ...options,
        },
      }),
    },
  };
};
