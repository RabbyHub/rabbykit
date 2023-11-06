import {
  Chain,
  InjectedConnector,
  InjectedConnectorOptions,
} from "@wagmi/core";
import { WalletResult } from "../../type";
import logo from "./logo.svg";

declare global {
  interface Window {
    xfi: any;
  }
}

export interface XDEFIWalletOptions {
  chains: Chain[];
}

export const xdefiWallet = ({
  chains,
  ...options
}: XDEFIWalletOptions & InjectedConnectorOptions): WalletResult => {
  const isInstalled =
    typeof window !== "undefined" && typeof window?.xfi !== "undefined";
  return {
    id: "xdefi",
    name: "XDEFI Wallet",
    logo,
    installed: isInstalled,
    downloadUrls: {
      chrome:
        "https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf",
    },
    connector: {
      browser: new InjectedConnector({
        chains,
        options: {
          //@ts-ignore
          getProvider: () => {
            return isInstalled ? (window.xfi?.ethereum as any) : undefined;
          },
          ...options,
        },
      }),
    },
  };
};
