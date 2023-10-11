import { Chain } from "@wagmi/core";
import type { InjectedConnectorOptions } from "@wagmi/core/connectors/injected";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletResult } from "../../type";
import { getWalletConnectUri } from "../../../helpers/getWalletConnectUri";
import { isAndroid, isMobile } from "../../../helpers/browser";
import logo from "./logo";
export interface BitKeepWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectOptions?: Omit<WalletConnectConnector["options"], "projectId">;
}

export const bitgetWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  ...options
}: BitKeepWalletOptions & InjectedConnectorOptions): WalletResult => {
  const isBitKeepInjected =
    typeof window !== "undefined" &&
    // @ts-expect-error
    window.bitkeep !== undefined &&
    // @ts-expect-error
    window.bitkeep.ethereum !== undefined &&
    // @ts-expect-error
    window.bitkeep.ethereum.isBitKeep === true;

  const shouldUseWalletConnect = !isBitKeepInjected;

  const walletConnector = new WalletConnectConnector({
    chains,
    options: {
      projectId,
      showQrModal: false,
      ...walletConnectOptions,
    },
  });

  const getUri = async () => {
    const uri = await getWalletConnectUri(walletConnector);

    return isMobile()
      ? isAndroid()
        ? uri
        : `bitkeep://wc?uri=${encodeURIComponent(uri)}`
      : uri;
  };

  return {
    id: "bitget",
    name: "Bitget Wallet",
    logo,
    installed: !shouldUseWalletConnect ? isBitKeepInjected : undefined,
    downloadUrls: {
      android: "https://web3.bitget.com/en/wallet-download?type=0",
      ios: "https://apps.apple.com/app/bitkeep/id1395301115",
      chrome:
        "https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak",
    },

    connector: {
      browser: new InjectedConnector({
        chains,
        options: {
          // @ts-expect-error
          getProvider: () => window?.bitkeep?.ethereum,
          ...options,
        },
      }),

      mobile: {
        getUri,
        connector: walletConnector,
      },
      qrCode: { getUri, connector: walletConnector },
    },
  };
};
