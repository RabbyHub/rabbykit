import { Chain } from "@wagmi/core";
import {
  SafeConnector,
  SafeConnectorOptions,
} from "@wagmi/core/connectors/safe";
import { WalletResult } from "../../type";
import logo from "./logo.svg";

export interface SafeWalletOptions {
  chains: Chain[];
}

export const safeWallet = ({
  chains,
  ...options
}: SafeWalletOptions & SafeConnectorOptions): WalletResult => ({
  id: "safe",
  name: "Safe",
  logo,
  installed:
    // Only allowed in iframe context
    // borrowed from wagmi safe connector
    !(typeof window === "undefined") && window?.parent !== window,
  downloadUrls: {},
  connector: {
    browser: new SafeConnector({ chains, options }),
  },
});
