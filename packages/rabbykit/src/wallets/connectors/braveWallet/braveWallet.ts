import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletResult } from "../../type";
import { Chain, InjectedConnectorOptions } from "@wagmi/core";
import logo from "./logo";

export interface BraveWalletOptions {
  chains: Chain[];
}

export const braveWallet = ({
  chains,
  ...options
}: BraveWalletOptions & InjectedConnectorOptions): WalletResult => ({
  id: "brave",
  name: "Brave Wallet",
  logo,
  installed:
    typeof window !== "undefined" && window.ethereum?.isBraveWallet === true,
  downloadUrls: {},
  connector: {
    browser: new InjectedConnector({
      chains,
      options,
    }),
  },
});
