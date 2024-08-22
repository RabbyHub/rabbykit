import { WalletResult } from "../../type";
import {
  getMobileUri,
  getWalletConnectConnector,
} from "../../../helpers/getWalletConnectUri";
import logo from "./logo.svg";
import { type WalletConnectParameters } from "@wagmi/connectors";

export const imTokenWallet = ({
  projectId,
  ...options
}: WalletConnectParameters): WalletResult => {
  const walletConnector = getWalletConnectConnector({
    projectId,
    showQrModal: false,
    ...options,
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
        connector: () => walletConnector,
      },
      mobile: {
        getUri: async (connector) =>
          getMobileUri({
            connector,
            iosUri: (uri) => `imtokenv2://wc?uri=${encodeURIComponent(uri)}`,
            androidUri: (uri) =>
              `imtokenv2://wc?uri=${encodeURIComponent(uri)}`,
          }),
        connector: () => walletConnector,
      },
    },
  };
};
