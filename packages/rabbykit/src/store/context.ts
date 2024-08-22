import { createStore } from "zustand/vanilla";
import { subscribeWithSelector } from "zustand/middleware";

import {
  Config,
  getAccount,
  connect,
  Connector,
  ConnectParameters,
} from "@wagmi/core";
import { WalletResult } from "../wallets/type";
import { SUPPORT_LANGUAGES } from "../helpers";
import zustandToSvelte from "../helpers/zustandToSvelte";
import {
  CustomButton,
  Disclaimer,
  Hook,
  RabbyKitModal,
  Theme,
  Type,
  ThemeVariables,
} from "../type";
import { locale } from "svelte-i18n";
import { Chain, Transport } from "viem";

type Tab = Type;
type Page = "wallet" | "connect" | "wc-select" | "download";
interface Store<
  chains extends readonly [Chain, ...Chain[]] = readonly [Chain, ...Chain[]],
  transports extends Record<chains[number]["id"], Transport> = Record<
    chains[number]["id"],
    Transport
  >
> {
  // app meta info
  appName: string;
  appLogo?: string;

  open: boolean;

  // theme
  theme: Theme;
  themeVariables?: ThemeVariables;
  language: SUPPORT_LANGUAGES;

  // internal page state
  page: Page;
  activeTab: Tab;
  currentWallet?: WalletResult;
  type?: Tab;
  isMobile: boolean;

  wagmi?: Config<chains, transports>;
  status: "connecting" | "reconnecting" | "connected" | "disconnected";
  isConnected?: boolean;
  address?: string;
  chainId?: number;
  showWalletConnect: boolean;

  wallets?: WalletResult[];
  walletConnectConnector?: Connector;

  configHook?: Hook;
  openHooks?: Hook[];

  customButtons?: CustomButton[];
  disclaimer?: Disclaimer;

  setTab: (activeTab: Tab) => void;
  openModal: RabbyKitModal["open"];
  closeModal: RabbyKitModal["close"];
  setTheme: RabbyKitModal["setTheme"];

  setDisclaimer: RabbyKitModal["setDisclaimer"];
  setCustomButtons: RabbyKitModal["setCustomButtons"];
}

export const useRKStore = createStore<Store<any, any>>()(
  subscribeWithSelector((set, get) => ({
    appName: "RabbyKit",
    isMobile: false,
    theme: "light",
    themeVariables: undefined,
    status: "disconnected",
    language: "en",
    page: "wallet",
    activeTab: "browser",
    open: false,
    showWalletConnect: true,
    openModal: (params) => {
      const { forceOpen, ...hooks } = params || {};
      const wagmiConfig = get().wagmi;
      if (wagmiConfig) {
        if (forceOpen || !getAccount(wagmiConfig).isConnected) {
          const previousOpenHooks = get().openHooks || [];
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

useRKStore.subscribe(
  (s) => s.language,
  (lang) => {
    locale.set(lang);
  }
);

export const modalOpenSubscribe = (fn: (open: boolean) => void) => {
  const unsubscribe = useRKStore.subscribe((s) => s.open, fn);
  return unsubscribe;
};

export function syncAccount() {
  const wagmiConfig = useRKStore.getState().wagmi;
  if (!wagmiConfig) return;
  const accountInfo = getAccount(wagmiConfig);
  const { address, isConnected, isDisconnected, status } = accountInfo;
  const chain = accountInfo.chain;

  if (isConnected && address && chain) {
    useRKStore.setState({ isConnected, address, chainId: chain.id });
  } else if (!isConnected) {
    useRKStore.setState({ isConnected, address: undefined });
  }

  if (isDisconnected) {
    // useRKStore.setState({ uri: undefined });
  }
  useRKStore.setState({ status: status });
}

export const rabbykitConnect = (prams: ConnectParameters) => {
  const wagmiConfig = useRKStore.getState().wagmi;
  return connect(wagmiConfig!, prams)
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
