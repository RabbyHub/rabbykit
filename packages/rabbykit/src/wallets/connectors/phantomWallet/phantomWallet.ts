import { type WalletResult } from "../../type";
import logo from "./logo.svg";
import { injected } from "@wagmi/connectors";

export const phantomWallet = (): WalletResult => {
  const getProvider = () =>
    typeof window !== "undefined"
      ? ((window as any).phantom as any)?.ethereum
      : undefined;

  const provider = getProvider();
  const installed = !!provider;
  return {
    id: "phantom",
    name: "Phantom",
    rdns: "app.phantom",
    logo,
    installed: !!provider,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=app.phantom",
      ios: "https://apps.apple.com/app/phantom-solana-wallet/1598432977",
      chrome:
        "https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa",
      firefox: "https://addons.mozilla.org/firefox/addon/phantom-app/",
    },
    connector: {
      browser: installed ? () => injected({ target: "phantom" }) : undefined,
    },
  };
};
