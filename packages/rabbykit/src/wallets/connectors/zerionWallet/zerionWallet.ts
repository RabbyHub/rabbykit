import {
  getMobileUri,
  getWalletConnectConnector,
  getWalletConnectUri,
} from "../../../helpers/getWalletConnectUri";
import { getWalletProvider } from "../../../helpers/wallet";

import { WalletResult } from "../../type";
import logo from "./logo.svg";
import { injected, type WalletConnectParameters } from "@wagmi/connectors";

export const zerionWallet = ({
  projectId,
  ...options
}: WalletConnectParameters): WalletResult => {
  const isZerionInjected =
    (typeof window !== "undefined" &&
      ((typeof window.ethereum !== "undefined" && window.ethereum.isZerion) ||
        // @ts-expect-error
        typeof window.zerionWallet !== "undefined")) ||
    getWalletProvider("isZerion");

  const walletConnector = getWalletConnectConnector({
    projectId,
    showQrModal: false,
    ...options,
  });

  return {
    id: "zerion",
    name: "Zerion",
    rdns: "io.zerion.wallet",
    logo,
    installed: !!isZerionInjected,
    downloadUrls: {
      android:
        "https://play.google.com/store/apps/details?id=io.zerion.android",
      ios: "https://apps.apple.com/app/apple-store/id1456732565",
      chrome:
        "https://chrome.google.com/webstore/detail/klghhnkeealcohjjanjjdaeeggmfmlpl",
    },
    connector: {
      browser: !!isZerionInjected
        ? () =>
            injected({
              target: () => ({
                id: "zerion",
                name: "Zerion",
                provider: () =>
                  typeof window !== "undefined"
                    ? // @ts-expect-error
                      window.zerionWallet ||
                      getWalletProvider("isZerion") ||
                      window.ethereum
                    : undefined,
              }),
            })
        : undefined,
      qrCode: {
        connector: () => walletConnector,
      },
      mobile: {
        getUri: (connector) =>
          getMobileUri({
            connector,
            iosUri: (uri) => `zerion://wc?uri=${encodeURIComponent(uri)}`,
          }),
        connector: () => walletConnector,
      },
    },
  };
};
