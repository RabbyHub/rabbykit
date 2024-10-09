import { WalletResult } from "../../type";
import { getWalletConnectConnector } from "../../../helpers/getWalletConnectUri";
import logo from "./logo.svg";
import { injected, type WalletConnectParameters } from "@wagmi/connectors";

export const otherInjectedWalletId = "rabbykit_other_injected_wallet";
export const otherInjectedWallet = (): WalletResult => {
  const isInjected =
    typeof window !== "undefined" && typeof window.ethereum !== "undefined";

  return {
    id: otherInjectedWalletId,
    name: "Other Wallet",
    logo,
    installed: isInjected,
    downloadUrls: {},
    connector: {
      browser: () =>
        injected({
          target: () => ({
            id: otherInjectedWalletId,
            name: "Other Wallet",
            provider: window.ethereum,
          }),
        }),
    },
  };
};
