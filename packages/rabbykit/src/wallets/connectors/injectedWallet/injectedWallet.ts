import {
  Chain,
  InjectedConnector,
  InjectedConnectorOptions,
} from "@wagmi/core";

import { WalletResult } from "../../type";
import logo from "./logo.svg";

interface otherInjectedWalletOptions {
  chains?: Chain[];
}
export const otherInjectedWallet = ({
  chains,
  ...options
}: otherInjectedWalletOptions & InjectedConnectorOptions): WalletResult => {
  const isInjected =
    typeof window !== "undefined" && typeof window.ethereum !== "undefined";

  return {
    id: "injected",
    name: "Other Wallet",
    logo,
    installed: isInjected,
    downloadUrls: {},
    connector: {
      browser: new InjectedConnector({
        chains,
        options: {
          shimDisconnect: true,
          name: (detectedName) => {
            return typeof detectedName === "string"
              ? detectedName
              : detectedName.join(",");
          },
        },
      }),
    },
  };
};
