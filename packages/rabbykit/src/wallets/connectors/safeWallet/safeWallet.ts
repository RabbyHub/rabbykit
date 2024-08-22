import { safe, SafeParameters } from "@wagmi/connectors";
import { WalletResult } from "../../type";
import logo from "./logo.svg";

export const safeWallet = (params: SafeParameters): WalletResult => ({
  id: "safe",
  name: "Safe",
  logo,
  installed:
    // Only allowed in iframe context
    // borrowed from wagmi safe connector
    !(typeof window === "undefined") && window?.parent !== window,
  downloadUrls: {},
  connector: {
    browser:
      !(typeof window === "undefined") && window?.parent !== window
        ? () => safe(params)
        : undefined,
  },
});
