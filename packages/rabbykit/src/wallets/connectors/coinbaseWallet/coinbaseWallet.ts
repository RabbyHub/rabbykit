import { Chain } from "@wagmi/core";
import { CoinbaseWalletConnector } from "@wagmi/core/connectors/coinbaseWallet";
import logo from "./logo";
import { WalletResult } from "../../type";

export interface CoinbaseWalletOptions {
  appName: string;
  chains: Chain[];
}

export const coinbaseWallet = ({
  appName,
  chains,
  ...options
}: CoinbaseWalletOptions): WalletResult<CoinbaseWalletConnector> => {
  const isCoinbaseWalletInjected =
    typeof window !== "undefined" && window.ethereum?.isCoinbaseWallet === true;

  const connector = new CoinbaseWalletConnector({
    chains,
    options: {
      appName,
      headlessMode: true,
      ...options,
    },
  });

  const getUri = async () => (await connector.getProvider()).qrUrl as string;

  return {
    id: "coinbase",
    name: "Coinbase Wallet",
    logo,
    installed: isCoinbaseWalletInjected || undefined,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=org.toshi",
      ios: "https://apps.apple.com/us/app/coinbase-wallet-store-crypto/id1278383455",
      chrome:
        "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad",
    },
    connector: {
      browser: connector,
      mobile: { getUri },
      qrCode: { getUri },
    },
  };
};
