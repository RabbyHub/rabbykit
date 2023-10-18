import {
  Chain,
  InjectedConnector,
  InjectedConnectorOptions,
} from "@wagmi/core";
import { WalletResult } from "../../type";
import logo from "./logo.svg";

export interface FrameWalletOptions {
  chains: Chain[];
}

export const frameWallet = ({
  chains,
  ...options
}: FrameWalletOptions & InjectedConnectorOptions): WalletResult => ({
  id: "frame",
  logo,
  name: "Frame",
  installed:
    typeof window !== "undefined" &&
    typeof window.ethereum !== "undefined" &&
    ((window.ethereum as any).isFrame === true ||
      !!window.ethereum.providers?.find((p: any) => p.isFrame === true)),
  downloadUrls: {
    chrome: "https://frame.sh/",
  },
  connector: {
    browser: new InjectedConnector({
      chains,
      options,
    }),
  },
});
