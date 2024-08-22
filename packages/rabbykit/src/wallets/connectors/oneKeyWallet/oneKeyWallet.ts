import { WalletResult } from "../../type";
import { getWalletConnectConnector } from "../../../helpers/getWalletConnectUri";
import logo from "./logo.svg";
import { injected, type WalletConnectParameters } from "@wagmi/connectors";

declare global {
  interface Window {
    $onekey: any;
  }
}

export const oneKeyWallet = (): WalletResult => {
  const provider = typeof window !== "undefined" && window["$onekey"]?.ethereum;
  const isOnekeyInjected = Boolean(provider);

  return {
    id: "onekey",
    name: "OneKey",
    rdns: "so.onekey.app.wallet",
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
      browser: isOnekeyInjected
        ? () =>
            injected({
              target: () => ({
                id: "onekey",
                name: "OneKey",
                provider,
              }),
            })
        : undefined,
    },
  };
};
