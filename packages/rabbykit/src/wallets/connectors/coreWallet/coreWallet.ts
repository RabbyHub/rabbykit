import { Chain, InjectedConnector, WindowProvider } from "@wagmi/core";
import type { InjectedConnectorOptions } from "@wagmi/core/connectors/injected";
import { WalletResult } from "../../type";
import {
  getMobileUri,
  getWalletConnectConnector,
  getWalletConnectUri,
} from "../../../helpers/getWalletConnectUri";
import logo from "./logo.svg";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";

declare global {
  interface Window {
    evmproviders?: Record<string, WindowProvider>;
    avalanche?: WindowProvider;
  }
}

export interface CoreWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectOptions?: Omit<WalletConnectConnector["options"], "projectId">;
}

function getCoreWalletInjectedProvider(): WindowProvider | undefined {
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
  chains,
  projectId,
  ...options
}: CoreWalletOptions & InjectedConnectorOptions): WalletResult => {
  const isCoreInjected = Boolean(getCoreWalletInjectedProvider());

  const walletConnector = getWalletConnectConnector({
    chains,
    options: {
      projectId,
      showQrModal: false,
      ...options?.walletConnectOptions,
    },
  });

  return {
    id: "core",
    name: "Core",
    installed: isCoreInjected,
    logo,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=com.avaxwallet",
      ios: "https://apps.apple.com/us/app/core-wallet/id6443685999",
      chrome:
        "https://chrome.google.com/webstore/detail/core-crypto-wallet-nft-ex/agoakfejjabomempkjlepdflaleeobhb",
    },
    connector: {
      browser: new InjectedConnector({
        chains,
        options: {
          getProvider: getCoreWalletInjectedProvider,
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
          }),
        connector: walletConnector,
      },
    },
  };
};
