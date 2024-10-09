import { WalletResult } from "../../type";
import {
  getMobileUri,
  getWalletConnectConnector,
} from "../../../helpers/getWalletConnectUri";
import logo from "./logo.svg";
import { injected, type WalletConnectParameters } from "@wagmi/connectors";

import { getWalletProvider } from "../../../helpers/wallet";

export const rainbowWallet = ({
  projectId,
  ...options
}: WalletConnectParameters): WalletResult => {
  const rainbowWalletProvider = getWalletProvider("isRainbow");
  const isRainbowInjected = !!rainbowWalletProvider;

  const walletConnector = getWalletConnectConnector({
    projectId,
    showQrModal: false,
    ...options,
  });

  return {
    id: "rainbow",
    name: "Rainbow",
    rdns: "me.rainbow",
    logo,
    installed: isRainbowInjected,
    downloadUrls: {
      android:
        "https://play.google.com/store/apps/details?id=me.rainbow&referrer=utm_source%3Drainbowkit&utm_source=rainbowkit",
      ios: "https://apps.apple.com/app/apple-store/id1457119021?pt=119997837&ct=rainbowkit&mt=8",

      chrome:
        "https://chromewebstore.google.com/detail/rainbow/opfgelmcmbiajamepnmloijbpoleiama",
      firefox:
        "https://addons.mozilla.org/en-US/firefox/addon/rainbow-extension/",
    },
    connector: {
      browser: isRainbowInjected
        ? injected({
            target: "rainbow",
          })
        : undefined,
      qrCode: {
        connector: () => walletConnector,
      },
      mobile: {
        getUri: (connector) =>
          getMobileUri({
            connector,
            iosUri: (uri) => `rainbow://wc?uri=${encodeURIComponent(uri)}`,
          }),
        connector: () => walletConnector,
      },
    },
  };
};
