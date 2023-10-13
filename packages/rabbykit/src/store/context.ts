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

type Tab = "browser" | "mobile";
type Page = "wallet" | "connect" | "download";
interface Store<
  TPublicClient extends PublicClient = PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient
> {
  status: "connecting" | "reconnecting" | "connected" | "disconnected";
  open: boolean;
  openModal: () => void;
  closeModal: () => void;

  language: SUPPORT_LANGUAGES;
  page: Page;
  activeTab: Tab;
  setTab: (activeTab: Tab) => void;

  currentWallet?: WalletResult;
  type?: Tab;

  wagmi?: Config<TPublicClient, TWebSocketPublicClient>;
  isConnected?: boolean;
  address?: string;
  chainId?: number;
  wallets?: WalletResult[];
}

export const useRKStore = createStore<Store<any, any>>()(
  subscribeWithSelector((set, get) => ({
    status: "disconnected",
    language: "en",
    page: "wallet",
    activeTab: "browser",
    open: false,
    openModal: () => {
      set({ open: true });
    },
    closeModal: () => {
      set({ open: false });
    },
    setTab: (activeTab: Tab) => {
      set({ activeTab });
    },
  }))
);

export function syncAccount() {
  const accountInfo = getAccount();
  const { address, isConnected, status } = accountInfo;
  const { chain } = getNetwork();

  console.log("status", status, accountInfo);
  if (isConnected && address && chain) {
    useRKStore.setState({ isConnected, address, chainId: chain.id });
  } else if (!isConnected) {
    useRKStore.setState({ isConnected, address: undefined });
  }

  useRKStore.setState({ status: status });
}

export default zustandToSvelte(useRKStore);
