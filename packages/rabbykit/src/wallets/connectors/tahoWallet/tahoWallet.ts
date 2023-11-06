import {
  Chain,
  InjectedConnector,
  InjectedConnectorOptions,
} from "@wagmi/core";
import { WalletResult } from "../../type";
import logo from "./logo.svg";

export interface TahoWalletOptions {
  chains: Chain[];
}

declare global {
  interface Window {
    tally: any;
  }
}

export const tahoWallet = ({
  chains,
  ...options
}: TahoWalletOptions & InjectedConnectorOptions): WalletResult => ({
  id: "taho",
  name: "Taho",
  logo,
  downloadUrls: {
    chrome:
      "https://chrome.google.com/webstore/detail/taho/eajafomhmkipbjmfmhebemolkcicgfmd",
  },
  installed:
    typeof window !== "undefined" &&
    typeof window.tally !== "undefined" &&
    window["tally"]
      ? true
      : undefined,
  connector: {
    browser: new InjectedConnector({
      chains,
      options: {
        getProvider: () => {
          const getTaho = (tally?: any) => (tally?.isTally ? tally : undefined);
          if (typeof window === "undefined") return;
          return getTaho(window.tally);
        },
        ...options,
      },
    }),
  },
});
