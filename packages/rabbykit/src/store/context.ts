import { createStore } from "zustand/vanilla";
import { subscribeWithSelector } from "zustand/middleware";

import {
  PublicClient,
  WebSocketPublicClient,
  Config,
  getAccount,
  getNetwork,
} from "@wagmi/core";
import { WalletResult } from "../wallets/type";
import { SUPPORT_LANGUAGES } from "../helpers";
import zustandToSvelte from "../helpers/zustandToSvelte";

interface Store<
  TPublicClient extends PublicClient = PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient
> {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;

  language: SUPPORT_LANGUAGES;
  page: "wallet" | "connect" | "download";

  wagmi?: Config<TPublicClient, TWebSocketPublicClient>;
  isConnected?: boolean;
  address?: string;
  chainId?: number;
  wallets?: WalletResult[];
}

export const useRKStore = createStore<Store<any, any>>()(
  subscribeWithSelector((set, get) => ({
    language: "en",
    page: "wallet",
    open: false,
    openModal: () => {
      set({ open: true });
    },
    closeModal: () => {
      set({ open: false });
    },
  }))
);

export function syncAccount() {
  const { address, isConnected } = getAccount();
  const { chain } = getNetwork();
  if (isConnected && address && chain) {
    useRKStore.setState({ isConnected, address, chainId: chain.id });
  } else if (!isConnected) {
    useRKStore.setState({ isConnected, address: undefined });
  }
}

export default zustandToSvelte(useRKStore);
