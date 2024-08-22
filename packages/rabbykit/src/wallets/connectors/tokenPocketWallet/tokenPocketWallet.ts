import { WalletResult } from "../../type";
import {
  getMobileUri,
  getWalletConnectConnector,
} from "../../../helpers/getWalletConnectUri";
import logo from "./logo.svg";
import { injected, type WalletConnectParameters } from "@wagmi/connectors";
import { getWalletProvider } from "../../../helpers/wallet";

export const tokenPocketWallet = ({
  projectId,
  ...options
}: WalletConnectParameters): WalletResult => {
  const provider = getWalletProvider("isTokenPocket");
  const installed = !!provider;

  const walletConnector = getWalletConnectConnector({
    projectId,
    showQrModal: false,
    ...options,
  });

  return {
    id: "tokenPocket",
    name: "TokenPocket",
    rdns: "pro.tokenpocket",
    logo,
    installed,
    downloadUrls: {
      chrome:
        "https://chrome.google.com/webstore/detail/tokenpocket/mfgccjchihfkkindfppnaooecgfneiii",
      android:
        "https://play.google.com/store/apps/details?id=vip.mytokenpocket",
      ios: "https://apps.apple.com/us/app/tp-global-wallet/id6444625622",
    },
    connector: {
      browser: installed
        ? () =>
            injected({
              // @ts-expect-error
              target: () => ({
                id: "tokenPocket",
                name: "TokenPocket",
                provider,
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
            iosUri: (uri) => `tpoutside://wc?uri=${encodeURIComponent(uri)}`,
            androidUri: (uri) =>
              `tpoutside://wc?uri=${encodeURIComponent(uri)}`,
          }),
        connector: () => walletConnector,
      },
    },
  };
};
