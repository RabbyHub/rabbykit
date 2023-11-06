import {
  Chain,
  InjectedConnector,
  InjectedConnectorOptions,
} from "@wagmi/core";
import logo from "./logo.svg";
import { WalletResult } from "../../type";
import { getWalletProvider, isRabby } from "../../../helpers/wallet";

export interface RabbyWalletOptions {
  chains: Chain[];
}
export const rabbyWallet = ({
  chains,
  ...options
}: RabbyWalletOptions & InjectedConnectorOptions): WalletResult => {
  const provider = getWalletProvider("isRabby");
  const isInstalled = !!provider;

  return {
    id: "rabby",
    name: "Rabby Wallet",
    logo,
    downloadUrls: {
      chrome:
        "https://chrome.google.com/webstore/detail/rabby-wallet/acmacodkjbdgmoleebolmdjonilkdbch",
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
