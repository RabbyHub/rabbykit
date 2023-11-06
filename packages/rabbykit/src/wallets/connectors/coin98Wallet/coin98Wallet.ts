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

declare global {
  interface Window {
    coin98Wallet: Window["ethereum"];
  }
}

export interface Coin98WalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectOptions?: Omit<WalletConnectConnector["options"], "projectId">;
}

function getCoin98WalletInjectedProvider(): Window["ethereum"] {
  const isCoin98Wallet = (ethereum: NonNullable<Window["ethereum"]>) => {
    // Identify if Coin98 Wallet injected provider is present.
    const coin98Wallet = !!ethereum.isCoin98;

    return coin98Wallet;
  };

  const injectedProviderExist =
    typeof window !== "undefined" && typeof window.ethereum !== "undefined";

  // No injected providers exist.
  if (!injectedProviderExist) {
    return;
  }

  // Coin98 Wallet injected provider is available in the global scope.
  // There are cases that some cases injected providers can replace window.ethereum
  // without updating the ethereum.providers array. To prevent issues where
  // the C98 connector does not recognize the provider when C98 extension is installed,
  // we begin our checks by relying on C98's global object.
  if (window["coin98Wallet"]) {
    return window["coin98Wallet"];
  }

  // Coin98 Wallet was injected into window.ethereum.
  if (isCoin98Wallet(window.ethereum!)) {
    return window.ethereum;
  }

  // Coin98 Wallet provider might be replaced by another
  // injected provider, check the providers array.
  if (window.ethereum?.providers) {
    // ethereum.providers array is a non-standard way to
    // preserve multiple injected providers. Eventually, EIP-5749
    // will become a living standard and we will have to update this.
    return window.ethereum.providers.find(isCoin98Wallet);
  }
}

export const coin98Wallet = ({
  chains,
  projectId,
  ...options
}: Coin98WalletOptions & InjectedConnectorOptions): WalletResult => {
  const isCoin98WalletInjected = Boolean(getCoin98WalletInjectedProvider());

  const walletConnector = getWalletConnectConnector({
    chains,
    options: {
      projectId,
      showQrModal: false,
      ...options?.walletConnectOptions,
    },
  });
  return {
    id: "coin98",
    name: "Coin98 Wallet",
    logo,
    installed: isCoin98WalletInjected,
    downloadUrls: {
      android:
        "https://play.google.com/store/apps/details?id=coin98.crypto.finance.media",
      ios: "https://apps.apple.com/vn/app/coin98-super-app/id1561969966",
      chrome:
        "https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg",
    },
    connector: {
      browser: isCoin98WalletInjected
        ? new InjectedConnector({
            chains,
            options: {
              name: "Coin98 Wallet",
              getProvider: getCoin98WalletInjectedProvider,
              ...options,
            },
          })
        : undefined,
      qrCode: {
        getUri: () => getWalletConnectUri(walletConnector),
        connector: walletConnector,
      },
      mobile: {
        getUri: () => getMobileUri({ connector: walletConnector }),
        connector: walletConnector,
      },
    },
  };
};
