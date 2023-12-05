import {
  Chain,
  InjectedConnector,
  InjectedConnectorOptions,
} from "@wagmi/core";
import { WalletResult } from "../../type";
import logo from "./logo.svg";
import {
  getMobileUri,
  getWalletConnectConnector,
  getWalletConnectUri,
} from "../../../helpers/getWalletConnectUri";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { getWalletProvider } from "../../../helpers/wallet";

export interface ZerionWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectOptions?: Omit<WalletConnectConnector["options"], "projectId">;
}

export const zerionWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  ...options
}: ZerionWalletOptions & InjectedConnectorOptions): WalletResult => {
  const isZerionInjected =
    (typeof window !== "undefined" &&
      ((typeof window.ethereum !== "undefined" && window.ethereum.isZerion) ||
        // @ts-expect-error
        typeof window.zerionWallet !== "undefined")) ||
    getWalletProvider("isZerion");

  const walletConnector = getWalletConnectConnector({
    chains,
    options: {
      projectId,
      showQrModal: false,
      ...walletConnectOptions,
    },
  });

  return {
    id: "zerion",
    name: "Zerion",
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
      browser: new InjectedConnector({
        chains,
        options: {
          getProvider: () =>
            typeof window !== "undefined"
              ? // @ts-expect-error
                window.zerionWallet ||
                getWalletProvider("isZerion") ||
                window.ethereum
              : undefined,
          ...options,
        },
      }),
      qrCode: {
        getUri: () => getWalletConnectUri(walletConnector),
        connector: walletConnector,
      },
      mobile: {
        getUri: () =>
          getMobileUri({
            connector: walletConnector,
            iosUri: (uri) => `zerion://wc?uri=${encodeURIComponent(uri)}`,
          }),
        connector: walletConnector,
      },
    },
  };
};
