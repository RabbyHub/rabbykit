import { Chain } from "@wagmi/core";
import {
  MetaMaskConnector,
  type MetaMaskConnectorOptions,
} from "@wagmi/core/connectors/metaMask";
import { WalletResult } from "../../type";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { getWalletConnectUri } from "../../../helpers/getWalletConnectUri";
import { isMetaMask } from "../../../helpers/wallet";
import { isAndroid } from "../../../helpers/browser";

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
  const providers = typeof window !== "undefined" && window.ethereum?.providers;

  // Not using the explicit isMetaMask fn to check for MetaMask
  // so that users can continue to use the MetaMask button
  // to interact with wallets compatible with window.ethereum.
  // The connector's getProvider will instead favor the real MetaMask
  // in window.providers scenarios with multiple wallets injected.
  const isMetaMaskInjected =
    typeof window !== "undefined" &&
    typeof window.ethereum !== "undefined" &&
    (window.ethereum.providers?.some(isMetaMask) || window.ethereum.isMetaMask);
  const shouldUseWalletConnect = !isMetaMaskInjected;

  return {
    id: "metaMask",
    name: "MetaMask",
    logo: "",
    installed: !shouldUseWalletConnect ? isMetaMaskInjected : undefined,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=io.metamask",
      ios: "https://apps.apple.com/us/app/metamask/id1438144202",
      // mobile: "https://metamask.io/download",
      // qrCode: "https://metamask.io/download",
      chrome:
        "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
      edge: "https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm",
      firefox: "https://addons.mozilla.org/firefox/addon/ether-metamask",
      // opera: "https://addons.opera.com/extensions/details/metamask-10",
      // browserExtension: "https://metamask.io/download",
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? new WalletConnectConnector({
            chains,
            options: {
              projectId,
              ...options?.walletConnectOptions,
            },
          })
        : new MetaMaskConnector({
            chains,
            options: {
              ...options,
            },
          });

      const getUri = async () => {
        const uri = await getWalletConnectUri(connector);
        return isAndroid()
          ? uri
          : `https://metamask.app.link/wc?uri=${encodeURIComponent(uri)}`;
      };

      return {
        browser: connector,
        qrCode: { getUri },
      };
    },
  };
};
