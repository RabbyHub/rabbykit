import {
  getMobileUri,
  getWalletConnectConnector,
  getWalletConnectUri,
} from "../../../helpers/getWalletConnectUri";
import { WalletResult } from "../../type";
import logo from "./logo.svg";
import { injected, type WalletConnectParameters } from "@wagmi/connectors";

declare global {
  interface Window {
    trustwallet: Window["ethereum"];
  }
}

function getTrustWalletInjectedProvider(): Window["ethereum"] {
  const isTrustWallet = (ethereum: NonNullable<Window["ethereum"]>) => {
    // Identify if Trust Wallet injected provider is present.
    const trustWallet = !!ethereum.isTrust;

    return trustWallet;
  };

  const injectedProviderExist =
    typeof window !== "undefined" && typeof window.ethereum !== "undefined";

  // No injected providers exist.
  if (!injectedProviderExist) {
    return;
  }

  // Trust Wallet injected provider is available in the global scope.
  // There are cases that some cases injected providers can replace window.ethereum
  // without updating the ethereum.providers array. To prevent issues where
  // the TW connector does not recognize the provider when TW extension is installed,
  // we begin our checks by relying on TW's global object.
  if (window["trustwallet"]) {
    return window["trustwallet"];
  }

  // Trust Wallet was injected into window.ethereum.
  if (isTrustWallet(window.ethereum!)) {
    return window.ethereum;
  }

  // Trust Wallet provider might be replaced by another
  // injected provider, check the providers array.
  if (window.ethereum?.providers) {
    // ethereum.providers array is a non-standard way to
    // preserve multiple injected providers. Eventually, EIP-5749
    // will become a living standard and we will have to update this.
    return window.ethereum.providers.find(isTrustWallet);
  }
}

export const trustWallet = ({
  projectId,
  ...options
}: WalletConnectParameters): WalletResult => {
  const installed = Boolean(getTrustWalletInjectedProvider());

  const walletConnector = getWalletConnectConnector({
    projectId,
    showQrModal: false,
    ...options,
  });

  return {
    id: "trust",
    name: "Trust Wallet",
    rdns: "com.trustwallet.app",
    logo,
    installed,
    downloadUrls: {
      android:
        "https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp",
      ios: "https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409",
      chrome:
        "https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph",
    },
    connector: {
      browser: installed
        ? () =>
            injected({
              target: () => ({
                id: "trust",
                name: "Trust Wallet",
                provider: getTrustWalletInjectedProvider(),
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
            iosUri: (uri) => `trust://wc?uri=${encodeURIComponent(uri)}`,
            androidUri: (uri) => `trust://wc?uri=${encodeURIComponent(uri)}`,
          }),
        connector: () => walletConnector,
      },
    },
  };
};
