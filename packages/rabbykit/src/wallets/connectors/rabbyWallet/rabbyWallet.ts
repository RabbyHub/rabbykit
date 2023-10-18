import {
  Chain,
  InjectedConnector,
  InjectedConnectorOptions,
} from "@wagmi/core";
import logo from "./logo.svg";
import { WalletResult } from "../../type";
import { isRabby } from "../../../helpers/wallet";

export interface RabbyWalletOptions {
  chains: Chain[];
}
export const rabbyWallet = ({
  chains,
  ...options
}: RabbyWalletOptions & InjectedConnectorOptions): WalletResult => {
  const isInstalled = isRabby();

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
      browser: new InjectedConnector({ chains, options }),
    },
  };
};
