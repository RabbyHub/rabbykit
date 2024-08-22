import { WalletResult } from "../../type";
import logo from "./logo.svg";
import { injected, type WalletConnectParameters } from "@wagmi/connectors";

export const braveWallet = (): WalletResult => ({
  id: "brave",
  name: "Brave Wallet",
  rdns: "com.brave.wallet",
  logo,
  installed:
    typeof window !== "undefined" && window.ethereum?.isBraveWallet === true,
  downloadUrls: {},
  connector: {
    browser: () =>
      injected({
        target: "braveWallet",
      }),
  },
});
