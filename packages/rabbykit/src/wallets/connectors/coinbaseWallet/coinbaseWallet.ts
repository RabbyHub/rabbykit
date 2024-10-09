import logo from "./logo.svg";
import { WalletResult } from "../../type";
import { getWalletProvider } from "../../../helpers/wallet";
import { CoinbaseWalletParameters } from "@wagmi/connectors";

import { coinbaseWallet as coinbaseWalletConnectorFn } from "@wagmi/connectors";

export const coinbaseWallet = (
  params: CoinbaseWalletParameters
): WalletResult => {
  const isCoinbaseWalletInjected = !!getWalletProvider("isCoinbaseWallet");

  const coinbaseConnector = coinbaseWalletConnectorFn({
    ...params,
    headlessMode: true,
  });

  const connector = () => coinbaseConnector;

  // const getUri = async () => (await connector.getProvider()).qrUrl as string;

  return {
    id: "coinbase",
    name: "Coinbase Wallet",
    rdns: "com.coinbase.wallet",
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
      mobile: { connector },
      qrCode: { connector },
    },
  };
};
