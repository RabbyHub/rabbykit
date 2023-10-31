import { createStore } from "zustand/vanilla";
import { subscribeWithSelector } from "zustand/middleware";

import {
  PublicClient,
  WebSocketPublicClient,
  Config,
  getAccount,
  getNetwork,
  Chain,
  mainnet,
  connect,
  ConnectArgs,
} from "@wagmi/core";
import { WalletResult } from "../wallets/type";
import { SUPPORT_LANGUAGES } from "../helpers";
import zustandToSvelte from "../helpers/zustandToSvelte";
import { CustomButton, Disclaimer, Hook, RabbyKitModal, Theme } from "../type";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { EIP6963ProviderDetail, createStore as createMipdStore } from "mipd";
import { goerli } from "viem/chains";

type Tab = "browser" | "mobile";
type Page = "wallet" | "connect" | "download";
interface Store<
  TPublicClient extends PublicClient = PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient
> {
  chains: Chain[];
  theme?: Theme;
  status: "connecting" | "reconnecting" | "connected" | "disconnected";
  open: boolean;

  language: SUPPORT_LANGUAGES;
  page: Page;
  activeTab: Tab;

  currentWallet?: WalletResult;
  type?: Tab;

  wagmi?: Config<TPublicClient, TWebSocketPublicClient>;
  isConnected?: boolean;
  address?: string;
  chainId?: number;
  wallets?: WalletResult[];

  uri?: string;
  walletConnectConnector?: WalletConnectConnector;

  customButtons?: CustomButton[];
  disclaimer?: Disclaimer;

  showWalletConnect: boolean;

  setTab: (activeTab: Tab) => void;
  openModal: RabbyKitModal["open"];
  closeModal: RabbyKitModal["close"];
  setTheme: RabbyKitModal["setTheme"];

  setDisclaimer: RabbyKitModal["setDisclaimer"];
  setCustomButtons: RabbyKitModal["setCustomButtons"];

  mipd: readonly EIP6963ProviderDetail[];

  configHook?: Hook;

  openHooks?: Hook[];
}

export const useRKStore = createStore<Store<any, any>>()(
  subscribeWithSelector((set, get) => ({
    chains: [mainnet, goerli],
    theme: "light",
    status: "disconnected",
    language: "en",
    page: "wallet",
    activeTab: "browser",
    open: false,
    showWalletConnect: true,
    mipd: [],
    openModal: (params) => {
      const { forceOpen, ...hooks } = params || {};
      if (forceOpen || get().status !== "connected") {
        const previousOpenHooks = get().openHooks || [];
        if (hooks) {
          set({ open: true, openHooks: [...previousOpenHooks, hooks] });
        }
      }
    },
    closeModal: () => {
      set({ open: false });
    },
    setTab: (activeTab: Tab) => {
      set({ activeTab });
    },
    setTheme: (theme) => {
      set({ theme });
    },

    setDisclaimer: (disclaimer?: Disclaimer) => {
      set({ disclaimer });
    },

    setCustomButtons: (customButtons?: CustomButton[]) => {
      set({ customButtons });
    },
  }))
);

export const modalOpenSubscribe = (fn: (open: boolean) => void) => {
  const unsubscribe = useRKStore.subscribe((s) => s.open, fn);
  return unsubscribe;
};

export function syncAccount() {
  const accountInfo = getAccount();
  const { address, isConnected, isDisconnected, status } = accountInfo;
  const { chain } = getNetwork();

  if (isConnected && address && chain) {
    useRKStore.setState({ isConnected, address, chainId: chain.id });
  } else if (!isConnected) {
    useRKStore.setState({ isConnected, address: undefined });
  }

  if (isDisconnected) {
    useRKStore.setState({ uri: undefined });
  }
  useRKStore.setState({ status: status });
}

export const syncMipd = () => {
  const mipdStore = createMipdStore();
  useRKStore.setState({ mipd: mipdStore.getProviders() });

  const unsubscribe = mipdStore.subscribe((p) => {
    useRKStore.setState({ mipd: p });
  });
  return () => {
    unsubscribe();
    mipdStore.clear();
  };
};

export const rabbykitConnect = (prams: ConnectArgs) => {
  return connect(prams)
    .then(() => {
      const { configHook, openHooks } = useRKStore.getState();
      openHooks?.forEach((o) => o.onConnect?.());
      configHook?.onConnect?.();
    })
    .catch((error) => {
      const { configHook, openHooks } = useRKStore.getState();
      openHooks?.forEach((o) => o.onConnectError?.(error));
      configHook?.onConnectError?.(error);
      throw error;
    });
};

export default zustandToSvelte(useRKStore);
