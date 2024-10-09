import { WalletResult } from "../../type";
import logo from "./logo.svg";
import { injected } from "@wagmi/connectors";

declare global {
  interface Window {
    xfi: any;
  }
}

export const xdefiWallet = (): WalletResult => {
  const installed =
    typeof window !== "undefined" && typeof window?.xfi !== "undefined";
  return {
    id: "xdefi",
    name: "XDEFI Wallet",
    rdns: "io.xdefi",
    logo,
    installed,
    downloadUrls: {
      chrome:
        "https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf",
    },
    connector: {
      browser: installed
        ? () =>
            injected({
              target: () => ({
                id: "xdefi",
                name: "XDEFI Wallet",
                provider: window.xfi?.ethereum as any,
              }),
            })
        : undefined,
    },
  };
};
