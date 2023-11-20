import { Chain } from "@wagmi/core";
import {
  MetaMaskConnector,
  type MetaMaskConnectorOptions,
} from "@wagmi/core/connectors/metaMask";
import { WalletResult } from "../../type";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import {
  getMobileUri,
  getWalletConnectConnector,
  getWalletConnectLegacyConnector,
  getWalletConnectUri,
} from "../../../helpers/getWalletConnectUri";
import { isMetaMask } from "../../../helpers/wallet";
import logo from "./logo.svg";

export interface MetaMaskWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectOptions?: Omit<WalletConnectConnector["options"], "projectId">;
}

export const metaMaskWallet = ({
  chains,
  projectId,
  ...options
}: MetaMaskWalletOptions & MetaMaskConnectorOptions): WalletResult => {
  const isMetaMaskInjected = isMetaMask(window?.ethereum);

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
    id: "metaMask",
    name: "MetaMask",
    mobileName: "MetaMask",
    logo,
    installed: isMetaMaskInjected,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=io.metamask",
      ios: "https://apps.apple.com/us/app/metamask/id1438144202",
      chrome:
        "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
      edge: "https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm",
      firefox: "https://addons.mozilla.org/firefox/addon/ether-metamask",
    },
    connector: {
      browser: new MetaMaskConnector({
        chains,
        options: {
          shimDisconnect: true,
          UNSTABLE_shimOnConnectSelectAccount: true,
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
            iosUri: (uri) => `metamask://wc?uri=${encodeURIComponent(uri)}`,
          }),
        connector: walletConnector,
      },
    },
  };
};
