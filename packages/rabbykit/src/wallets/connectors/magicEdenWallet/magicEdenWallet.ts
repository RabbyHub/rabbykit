import {
  Chain,
  InjectedConnector,
  InjectedConnectorOptions,
} from "@wagmi/core";
import logo from "./logo.svg";
import { WalletResult } from "../../type";
import { getWalletProvider } from "../../../helpers/wallet";

declare global {
  interface Window {
    magicEden?: {
      ethereum?: any
    }
  }
}

export interface MagicEdenWalletOptions {
  chains: Chain[];
}
export const magicEdenWallet = ({
  chains,
  ...options
}: MagicEdenWalletOptions & InjectedConnectorOptions): WalletResult => {
  const provider = getWalletProvider("isMagicEden");
  const isInstalled = !!provider;

  return {
    id: "magicEden",
    name: "Magic Eden",
    logo,
    downloadUrls: {
      chrome:
        "https://chromewebstore.google.com/detail/magic-eden-wallet/mkpegjkblkkefacfnmkajcjmabijhclg",
    },
    installed: isInstalled,
    connector: {
      browser: new InjectedConnector({
        chains,
        options: {
          getProvider: () => provider,
          ...options,
        },
      }),
    },
  };
};
