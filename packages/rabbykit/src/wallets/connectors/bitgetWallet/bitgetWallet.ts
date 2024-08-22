import { WalletResult } from "../../type";
import {
  getWalletConnectConnector,
  getMobileUri,
} from "../../../helpers/getWalletConnectUri";
import logo from "./logo.svg";
import { injected, type WalletConnectParameters } from "@wagmi/connectors";

export const bitgetWallet = ({
  projectId,
  ...options
}: WalletConnectParameters): WalletResult => {
  const isBitKeepInjected =
    typeof window !== "undefined" &&
    // @ts-expect-error
    window.bitkeep !== undefined &&
    // @ts-expect-error
    window.bitkeep.ethereum !== undefined &&
    // @ts-expect-error
    window.bitkeep.ethereum.isBitKeep === true;

  const shouldUseWalletConnect = !isBitKeepInjected;

  const walletConnector = getWalletConnectConnector({
    projectId,
    showQrModal: false,
    ...options,
  });

  return {
    id: "bitget",
    name: "Bitget Wallet",
    rdns: "com.bitget.web3",
    logo,
    installed: !shouldUseWalletConnect ? isBitKeepInjected : undefined,
    downloadUrls: {
      android: "https://web3.bitget.com/en/wallet-download?type=0",
      ios: "https://apps.apple.com/app/bitkeep/id1395301115",
      chrome:
        "https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak",
    },

    connector: {
      browser: () =>
        injected({
          target: () => ({
            id: "bitget",
            name: "Bitget Wallet",
            // @ts-expect-error
            provider: window?.bitkeep?.ethereum,
          }),
        }),

      qrCode: {
        connector: () => walletConnector,
      },
      mobile: {
        getUri: (connector) =>
          getMobileUri({
            connector,
            iosUri: (uri) => `bitkeep://wc?uri=${encodeURIComponent(uri)}`,
          }),
        connector: () => walletConnector,
      },
    },
  };
};
