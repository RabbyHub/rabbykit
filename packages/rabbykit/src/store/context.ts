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
import {
  CustomButton,
  Disclaimer,
  Hook,
  RabbyKitModal,
  Theme,
  Type,
  ThemeVariables,
} from "../type";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { EIP6963ProviderDetail, createStore as createMipdStore } from "mipd";
import { goerli } from "viem/chains";
import { wrapperEIP6963Wallet } from "../helpers/mipd";
import { locale } from "svelte-i18n";

type Tab = Type;
type Page = "wallet" | "connect" | "wc-select" | "download";
interface Store<
  TPublicClient extends PublicClient = PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient
> {
  open: boolean;
  theme: Theme;
  themeVariables?: ThemeVariables;
  language: SUPPORT_LANGUAGES;

  page: Page;
  activeTab: Tab;
  currentWallet?: WalletResult;
  type?: Tab;

  chains: Chain[];
  wagmi?: Config<TPublicClient, TWebSocketPublicClient>;
  status: "connecting" | "reconnecting" | "connected" | "disconnected";
  isConnected?: boolean;
  address?: string;
  chainId?: number;

  wallets?: WalletResult[];
  walletConnectConnector?: WalletConnectConnector;

  mipd: readonly EIP6963ProviderDetail[];

  configHook?: Hook;
  openHooks?: Hook[];

  customButtons?: CustomButton[];
  disclaimer?: Disclaimer;
  showWalletConnect: boolean;

  setTab: (activeTab: Tab) => void;
  openModal: RabbyKitModal["open"];
  closeModal: RabbyKitModal["close"];
  setTheme: RabbyKitModal["setTheme"];

  setDisclaimer: RabbyKitModal["setDisclaimer"];
  setCustomButtons: RabbyKitModal["setCustomButtons"];

  isMobile: boolean;
}

export const useRKStore = createStore<Store<any, any>>()(
  subscribeWithSelector((set, get) => ({
    isMobile: false,
    chains: [mainnet, goerli],
    theme: "light",
    themeVariables: undefined,
    status: "disconnected",
    language: "en",
    page: "wallet",
    activeTab: "browser",
    open: false,
    showWalletConnect: true,
    mipd: [],
    openModal: (params) => {
      const { forceOpen, ...hooks } = params || {};
      if (forceOpen || !getAccount().isConnected) {
        const previousOpenHooks = get().openHooks || [];
        set({ open: true, openHooks: [...previousOpenHooks, hooks] });
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
  const accountInfo = getAccount();
  const { address, isConnected, isDisconnected, status } = accountInfo;
  const { chain } = getNetwork();

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

export const syncMipd = () => {
  const syncState = (eip6963Wallets: readonly EIP6963ProviderDetail[]) => {
    const duplicates: string[] = [];
    const allEIP6963Wallets = eip6963Wallets
      .filter((p) => {
        (useRKStore.getState().wallets || []).some((r) => {
          const isSame =
            r.name === p.info.name ||
            (r.name.startsWith(p.info.name) &&
              p.info.rdns.split(".").slice(-1).includes(r.id));

          if (isSame) {
            duplicates.push(r.name);
          }
          return isSame;
        });
        return true;
      })
      .map((e) => wrapperEIP6963Wallet(e, useRKStore.getState().chains));

    useRKStore.setState((s) => ({
      mipd: detectedEIP6963wallets,
      wallets: [
        ...(s.wallets || []).filter((e) => !duplicates.includes(e.name)),
        ...allEIP6963Wallets,
      ].sort((a, b) => a.name.localeCompare(b.name)),
    }));

    const { wagmi, wallets } = useRKStore.getState();
    if (wagmi) {
      wagmi?.setConnectors([
        ...allEIP6963Wallets
          .filter((item) => wallets?.some((e) => e.id === item.id))
          .map((e) => e.connector?.browser!),
        ...(wagmi?.connectors || []),
      ]);
    }
  };

  const mipdStore = createMipdStore();

  const detectedEIP6963wallets = mipdStore.getProviders();

  syncState(detectedEIP6963wallets);

  const unsubscribe = mipdStore.subscribe((arr) => {
    syncState(arr);
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
