import { Chain, InjectedConnector } from "@wagmi/core";
import type { InjectedConnectorOptions } from "@wagmi/core/connectors/injected";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { WalletResult } from "../../type";
import {
  getMobileUri,
  getWalletConnectConnector,
  getWalletConnectUri,
} from "../../../helpers/getWalletConnectUri";
import logo from "./logo.svg";
import { getWalletProvider } from "../../../helpers/wallet";

export interface TokenPocketWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectOptions?: Omit<WalletConnectConnector["options"], "projectId">;
}

export const tokenPocketWallet = ({
  chains,
  projectId,
  ...options
}: TokenPocketWalletOptions & InjectedConnectorOptions): WalletResult => {
  const provider = getWalletProvider("isTokenPocket");
  const isTokenPocketInjected = !!provider;

  const walletConnector = getWalletConnectConnector({
    chains,
    options: {
      projectId,
      showQrModal: false,
      ...options.walletConnectOptions,
    },
  });

  return {
    id: "tokenPocket",
    name: "TokenPocket",
    logo,
    installed: isTokenPocketInjected,
    downloadUrls: {
      chrome:
        "https://chrome.google.com/webstore/detail/tokenpocket/mfgccjchihfkkindfppnaooecgfneiii",
      android:
        "https://play.google.com/store/apps/details?id=vip.mytokenpocket",
      ios: "https://apps.apple.com/us/app/tp-global-wallet/id6444625622",
    },
    connector: {
      browser: new InjectedConnector({
        chains,
        options: {
          getProvider: () => provider,
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
            iosUri: (uri) => `tpoutside://wc?uri=${encodeURIComponent(uri)}`,
            androidUri: (uri) =>
              `tpoutside://wc?uri=${encodeURIComponent(uri)}`,
          }),
        connector: walletConnector,
      },
    },
  };
};
