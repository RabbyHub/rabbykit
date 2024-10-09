import { injected, type WalletConnectParameters } from "@wagmi/connectors";
import { WalletResult } from "../../type";
import {
  getWalletConnectConnector,
  getMobileUri,
} from "../../../helpers/getWalletConnectUri";
import { isMetaMask } from "../../../helpers/wallet";
import logo from "./logo.svg";

export const metaMaskWallet = ({
  projectId,
  ...options
}: WalletConnectParameters): WalletResult => {
  const isMetaMaskInjected =
    typeof window !== "undefined" && isMetaMask(window?.ethereum);

  const walletConnector = getWalletConnectConnector({
    projectId,
    showQrModal: false,
    ...options,
  });

  return {
    id: "metaMask",
    name: "MetaMask",
    mobileName: "MetaMask",
    rdns: "io.metamask",
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
      browser: isMetaMaskInjected
        ? () => injected({ target: "metaMask" })
        : undefined,
      qrCode: {
        connector: () => walletConnector,
      },
      mobile: {
        getUri: (connector) =>
          getMobileUri({
            connector,
            iosUri: (uri) => `metamask://wc?uri=${encodeURIComponent(uri)}`,
          }),
        connector: () => walletConnector,
      },
    },
  };
};
