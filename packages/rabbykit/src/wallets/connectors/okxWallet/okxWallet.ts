import { WalletResult } from "../../type";
import {
  getWalletConnectConnector,
  getMobileUri,
} from "../../../helpers/getWalletConnectUri";
import logo from "./logo.svg";
import { injected, type WalletConnectParameters } from "@wagmi/connectors";

export const okxWallet = ({
  projectId,
  ...options
}: WalletConnectParameters): WalletResult => {
  // `isOkxWallet` or `isOKExWallet` needs to be added to the wagmi `Ethereum` object
  const isOKXInjected =
    typeof window !== "undefined" &&
    // @ts-expect-error
    typeof window.okxwallet !== "undefined";

  const walletConnector = getWalletConnectConnector({
    projectId,
    showQrModal: false,
    ...options,
  });

  return {
    id: "okx",
    name: "OKX Wallet",
    rdns: "com.okex.wallet",
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
      browser: isOKXInjected
        ? () =>
            injected({
              target: () => ({
                id: "okx",
                name: "OKX Wallet",
                // @ts-expect-error
                provider: window.okxwallet,
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
            iosUri: (uri) => `okex://main/wc?uri=${encodeURIComponent(uri)}`,
          }),
        connector: () => walletConnector,
      },
    },
  };
};
