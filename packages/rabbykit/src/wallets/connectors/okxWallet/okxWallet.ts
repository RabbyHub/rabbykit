import { Chain, InjectedConnector } from "@wagmi/core";
import type { InjectedConnectorOptions } from "@wagmi/core/connectors/injected";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { WalletResult } from "../../type";
import logo from "./logo.svg";
import {
  getMobileUri,
  getWalletConnectConnector,
  getWalletConnectUri,
} from "../../../helpers/getWalletConnectUri";

export interface OKXWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectOptions?: Omit<WalletConnectConnector["options"], "projectId">;
}

export const okxWallet = ({
  chains,
  projectId,
  ...options
}: OKXWalletOptions & InjectedConnectorOptions): WalletResult => {
  // `isOkxWallet` or `isOKExWallet` needs to be added to the wagmi `Ethereum` object
  const isOKXInjected =
    typeof window !== "undefined" &&
    // @ts-expect-error
    typeof window.okxwallet !== "undefined";

  const walletConnector = getWalletConnectConnector({
    chains,
    options: {
      projectId,
      showQrModal: false,
      ...options?.walletConnectOptions,
    },
  });

  return {
    id: "okx",
    name: "OKX Wallet",
    logo,
    installed: isOKXInjected,
    downloadUrls: {
      android:
        "https://play.google.com/store/apps/details?id=com.okinc.okex.gp",
      ios: "https://itunes.apple.com/app/id1327268470?mt=8",
      chrome:
        "https://chrome.google.com/webstore/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge",
      edge: "https://microsoftedge.microsoft.com/addons/detail/okx-wallet/pbpjkcldjiffchgbbndmhojiacbgflha",
      firefox: "https://addons.mozilla.org/firefox/addon/okexwallet/",
    },
    connector: {
      browser: new InjectedConnector({
        chains,
        options: {
          // @ts-expect-error
          getProvider: () => window.okxwallet,
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
            iosUri: (uri) => `okex://main/wc?uri=${encodeURIComponent(uri)}`,
          }),
        connector: walletConnector,
      },
    },
  };
};
