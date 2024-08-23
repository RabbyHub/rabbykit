import { WalletResult } from "../../type";
import { getWalletConnectConnector } from "../../../helpers/getWalletConnectUri";
import logo from "./logo.svg";
import { injected, type WalletConnectParameters } from "@wagmi/connectors";

declare global {
  interface Window {
    evmproviders?: Record<string, Window["ethereum"]>;
    avalanche?: Window["ethereum"];
  }
}

function getCoreWalletInjectedProvider(): Window["ethereum"] | undefined {
  const injectedProviderExist =
    typeof window !== "undefined" && typeof window.ethereum !== "undefined";

  // No injected providers exist.
  if (!injectedProviderExist) {
    return;
  }

  // Core implements EIP-5749 and creates the window.evmproviders
  if (window["evmproviders"]?.["core"]) {
    return window["evmproviders"]?.["core"];
  }

  // Core was injected into window.avalanche.
  if (window.avalanche) {
    return window.avalanche;
  }

  // Core was injected into window.ethereum.
  if (
    typeof window !== "undefined" &&
    typeof window.ethereum !== "undefined" &&
    window.ethereum.isAvalanche === true
  ) {
    return window.ethereum;
  }
}

export const coreWallet = ({
  projectId,
  ...options
}: WalletConnectParameters): WalletResult => {
  const isCoreInjected = Boolean(getCoreWalletInjectedProvider());

  const walletConnector = getWalletConnectConnector({
    projectId,
    showQrModal: false,
    ...options,
  });

  return {
    id: "core",
    name: "Core",
    rdns: "app.core.extension",
    installed: isCoreInjected,
    logo,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=com.avaxwallet",
      ios: "https://apps.apple.com/us/app/core-wallet/id6443685999",
      chrome:
        "https://chrome.google.com/webstore/detail/core-crypto-wallet-nft-ex/agoakfejjabomempkjlepdflaleeobhb",
    },
    connector: {
      browser: isCoreInjected
        ? () =>
            injected({
              target: () => ({
                id: "core",
                name: "Core",
                provider: getCoreWalletInjectedProvider(),
              }),
            })
        : undefined,
      qrCode: {
        connector: () => walletConnector,
      },
      mobile: {
        connector: () => walletConnector,
      },
    },
  };
};
