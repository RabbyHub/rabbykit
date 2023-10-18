import { Chain, InjectedConnector } from "@wagmi/core";
import { WalletResult } from "../../type";
import logo from "./logo.svg";

export interface OnekeyWalletOptions {
  chains: Chain[];
}

declare global {
  interface Window {
    $onekey: any;
  }
}

export const oneKeyWallet = ({ chains }: OnekeyWalletOptions): WalletResult => {
  const provider = typeof window !== "undefined" && window["$onekey"]?.ethereum;
  const isOnekeyInjected = Boolean(provider);

  return {
    id: "onekey",
    name: "OneKey",
    logo,
    installed: isOnekeyInjected,
    downloadUrls: {
      android:
        "https://play.google.com/store/apps/details?id=so.onekey.app.wallet",
      chrome:
        "https://chrome.google.com/webstore/detail/onekey/jnmbobjmhlngoefaiojfljckilhhlhcj",
      edge: "https://microsoftedge.microsoft.com/addons/detail/onekey/obffkkagpmohennipjokmpllocnlndac",
      ios: "https://apps.apple.com/us/app/onekey-open-source-wallet/id1609559473",
    },
    connector: {
      browser: new InjectedConnector({
        chains,
        options: {
          getProvider: () => provider,
        },
      }),
    },
  };
};
