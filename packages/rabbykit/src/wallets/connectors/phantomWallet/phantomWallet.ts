import type { InjectedConnectorOptions } from "@wagmi/core/connectors/injected";
import { WalletResult } from "../../type";
import { Chain, InjectedConnector } from "@wagmi/core";
import logo from "./logo.svg";

export interface PhantomWalletOptions {
  chains: Chain[];
}

export const phantomWallet = ({
  chains,
  ...options
}: PhantomWalletOptions & InjectedConnectorOptions): WalletResult => {
  const getProvider = () =>
    typeof window !== "undefined"
      ? ((window as any).phantom as any)?.ethereum
      : undefined;
  return {
    id: "phantom",
    name: "Phantom",
    logo,
    installed: !!getProvider(),
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=app.phantom",
      ios: "https://apps.apple.com/app/phantom-solana-wallet/1598432977",
      chrome:
        "https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa",
      firefox: "https://addons.mozilla.org/firefox/addon/phantom-app/",
    },
    connector: {
      browser: new InjectedConnector({
        chains,
        options: { getProvider, ...options },
      }),
    },
  };
};
