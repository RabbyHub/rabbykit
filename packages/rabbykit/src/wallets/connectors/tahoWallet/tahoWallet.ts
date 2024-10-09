import { WalletResult } from "../../type";
import logo from "./logo.svg";
import { injected } from "@wagmi/connectors";

declare global {
  interface Window {
    tally: any;
  }
}

export const tahoWallet = (): WalletResult => {
  const installed =
    typeof window !== "undefined" &&
    typeof window.tally !== "undefined" &&
    !!window["tally"];
  return {
    id: "taho",
    name: "Taho",
    logo,
    downloadUrls: {
      chrome:
        "https://chrome.google.com/webstore/detail/taho/eajafomhmkipbjmfmhebemolkcicgfmd",
    },
    installed,
    connector: {
      browser: installed
        ? () =>
            injected({
              target: () => ({
                id: "taho",
                name: "Taho",
                provider: window["tally"],
              }),
            })
        : undefined,
    },
  };
};
