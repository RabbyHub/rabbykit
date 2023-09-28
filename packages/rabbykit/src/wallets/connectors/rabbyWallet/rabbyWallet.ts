import {
  Chain,
  InjectedConnector,
  InjectedConnectorOptions,
} from "@wagmi/core";
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
    logos: {
      default: "",
      //   transparent: <Logos.Rabby />,
      //   appIcon: <Logos.Rabby />,
      //   connectorButton: <Logos.Rabby />,
    },
    logoBackground: "#8697FF",
    scannable: false,
    downloadUrls: {
      website: "https://rabby.io",
      chrome:
        "https://chrome.google.com/webstore/detail/rabby-wallet/acmacodkjbdgmoleebolmdjonilkdbch",
    },
    installed: isInstalled,
    createConnector: () => ({
      connector: new InjectedConnector({ chains, options }),
    }),
  };
};
