import { WalletResult } from "../../type";
import logo from "./logo.svg";
import { injected } from "@wagmi/connectors";

export const frameWallet = (): WalletResult => {
  const installed =
    typeof window !== "undefined" &&
    typeof window.ethereum !== "undefined" &&
    ((window.ethereum as any).isFrame === true ||
      !!window.ethereum.providers?.find((p: any) => p.isFrame === true));
  return {
    id: "frame",
    name: "Frame",
    rdns: "sh.frame",
    logo,
    installed,
    downloadUrls: {
      chrome: "https://frame.sh/",
    },
    connector: {
      browser: installed
        ? () =>
            injected({
              target: "frame",
            })
        : undefined,
    },
  };
};
