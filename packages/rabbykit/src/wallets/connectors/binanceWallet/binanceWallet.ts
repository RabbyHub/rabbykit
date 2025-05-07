import { WalletResult } from "../../type";
import {
  getWalletConnectConnector,
  getMobileUri,
} from "../../../helpers/getWalletConnectUri";
import logo from "./logo.svg";
import { injected, type WalletConnectParameters } from "@wagmi/connectors";
import { getWagmiConnectorV2 } from "@binance/w3w-wagmi-connector-v2";

export const binanceWallet = (): WalletResult => {
  const isBitKeepInjected = true;

  const shouldUseWalletConnect = !isBitKeepInjected;

  // const walletConnector = getWalletConnectConnector({
  //   projectId,
  //   showQrModal: false,
  //   ...options,
  // });
  const connector = getWagmiConnectorV2();

  return {
    id: "binance",
    name: "Binance Wallet",
    rdns: "wallet.binance.com",
    logo,
    installed: !shouldUseWalletConnect ? isBitKeepInjected : undefined,
    downloadUrls: {
      android: "https://web3.bitget.com/en/wallet-download?type=0",
      ios: "https://apps.apple.com/app/bitkeep/id1395301115",
      chrome:
        "https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak",
    },

    connector: {
      browser: () => connector(),

      // qrCode: {
      //   connector: () => walletConnector,
      // },
      // mobile: {
      //   getUri: (connector) =>
      //     getMobileUri({
      //       connector,
      //       iosUri: (uri) => `bitkeep://wc?uri=${encodeURIComponent(uri)}`,
      //     }),
      //   connector: () => walletConnector,
      // },
    },
  };
};
