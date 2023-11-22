import {
  Chain,
  InjectedConnector,
  InjectedConnectorOptions,
} from "@wagmi/core";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { WalletResult } from "../../type";
import { getWalletProvider } from "../../../helpers/wallet";
import {
  getMobileUri,
  // getWalletConnectConnector,
  getWalletConnectLegacyConnector,
  getWalletConnectUri,
} from "../../../helpers/getWalletConnectUri";
import logo from "./logo.svg";

export interface RainbowWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectOptions?: Omit<WalletConnectConnector["options"], "projectId">;
}

export const rainbowWallet = ({
  chains,
  projectId,
  ...options
}: RainbowWalletOptions & InjectedConnectorOptions): WalletResult => {
  const rainbowWalletProvider = getWalletProvider("isRainbow");
  const isRainbowInjected = !!rainbowWalletProvider;

  // const walletConnector = getWalletConnectConnector({
  //   chains,
  //   options: {
  //     projectId,
  //     showQrModal: false,
  //     ...options?.walletConnectOptions,
  //   },
  // });

  const walletConnector = getWalletConnectLegacyConnector({
    chains,
    projectId,
  });

  return {
    id: "rainbow",
    name: "Rainbow",
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
        ? new InjectedConnector({
            chains,
            options: {
              getProvider: () => rainbowWalletProvider,
              ...options,
            },
          })
        : undefined,
      qrCode: {
        getUri: () => getWalletConnectUri(walletConnector),
        connector: walletConnector,
      },
      mobile: {
        getUri: () =>
          getMobileUri({
            connector: walletConnector,
            iosUri: (uri) => `rainbow://wc?uri=${encodeURIComponent(uri)}`,
          }),
        connector: walletConnector,
      },
    },
  };
};
