import { Chain } from "@wagmi/core";
import { WalletResult } from "../../type";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import {
  getMobileUri,
  getWalletConnectConnector,
  //   getWalletConnectConnector,
  getWalletConnectLegacyConnector,
  getWalletConnectUri,
} from "../../../helpers/getWalletConnectUri";
import logo from "./logo.svg";

export interface ImTokenWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectOptions?: Omit<WalletConnectConnector["options"], "projectId">;
}

export const imTokenWallet = ({
  chains,
  projectId,
  ...options
}: ImTokenWalletOptions): WalletResult => {
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
    id: "imToken",
    name: "imToken",
    mobileName: "imToken",
    logo,
    installed: false,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=im.token.app",
      ios: "https://itunes.apple.com/us/app/imtoken2/id1384798940",
    },
    connector: {
      qrCode: {
        getUri: () => getWalletConnectUri(walletConnector),
        connector: walletConnector,
      },
      mobile: {
        getUri: () =>
          getMobileUri({
            connector: walletConnector,
            iosUri: (uri) => `imtokenv2://wc?uri=${encodeURIComponent(uri)}`,
            androidUri: (uri) =>
              `imtokenv2://wc?uri=${encodeURIComponent(uri)}`,
          }),
        connector: walletConnector,
      },
    },
  };
};
