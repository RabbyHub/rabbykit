import { WalletResult } from "../../type";
import logo from "./logo.svg";
import { injected } from "@wagmi/connectors";
import { getWalletProvider } from "../../../helpers/wallet";

export const rabbyWallet = (): WalletResult => {
  const provider = getWalletProvider("isRabby");
  const installed = !!provider;

  return {
    id: "rabby",
    name: "Rabby Wallet",
    rdns: "io.rabby",
    logo,
    downloadUrls: {
      chrome:
        "https://chrome.google.com/webstore/detail/rabby-wallet/acmacodkjbdgmoleebolmdjonilkdbch",
    },
    installed,
    connector: {
      browser: installed
        ? () =>
            injected({
              target: () => ({
                id: "rabby",
                name: "Rabby Wallet",
                provider,
              }),
            })
        : undefined,
    },
  };
};
