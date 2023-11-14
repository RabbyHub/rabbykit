import {
  watchAccount,
  Config,
  PublicClient,
  WebSocketPublicClient,
  Chain,
} from "@wagmi/core";
import { modalOpenSubscribe, syncAccount, syncMipd, useRKStore } from "./store";
import {
  rabbyWallet,
  metaMaskWallet,
  coinbaseWallet,
  bitgetWallet,
  coreWallet,
  braveWallet,
  otherInjectedWallet,
  enkryptWallet,
  frameWallet,
  okxWallet,
  coin98Wallet,
  oneKeyWallet,
  phantomWallet,
  rainbowWallet,
  tokenPocketWallet,
  trustWallet,
  xdefiWallet,
  zerionWallet,
  tahoWallet,
  imTokenWallet,
  // safeWallet,
} from "./wallets/connectors";
import { mount } from "./components/Kit";
import "./helpers/i18n";
import { CustomButton, Disclaimer, Hook, RabbyKitModal, Theme } from "./type";
import {
  getCommonWalletConnect,
  getWalletConnectLegacyConnector,
  sharedWalletConnectConnectors,
} from "./helpers/getWalletConnectUri";

export const createModal = <
  TPublicClient extends PublicClient = PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient
>({
  chains,
  appName,
  projectId,
  wagmi,
  disclaimer,
  customButtons,
  showWalletConnect = true,
  onConnect,
  onConnectError,
  onModalClosed,
  onModalClosedByManualOperation,
  theme = "light",
}: {
  chains: Chain[];
  appName: string;
  projectId: string;
  wagmi: Config<TPublicClient, TWebSocketPublicClient>;
  disclaimer?: Disclaimer;
  customButtons?: CustomButton[];
  showWalletConnect?: boolean;
  theme?: Theme;
} & Hook): RabbyKitModal => {
  watchAccount(() => syncAccount());

  const wallets = [
    rabbyWallet({ chains }),
    metaMaskWallet({ chains, projectId }),
    coinbaseWallet({ chains, appName }),
    bitgetWallet({ chains, projectId }),
    coreWallet({ chains, projectId }),
    braveWallet({ chains }),
    enkryptWallet({ chains }),
    frameWallet({ chains }),
    okxWallet({ chains, projectId }),
    coin98Wallet({ chains, projectId }),
    oneKeyWallet({ chains }),
    phantomWallet({ chains }),
    rainbowWallet({ chains, projectId }),
    tokenPocketWallet({ chains, projectId }),
    trustWallet({ chains, projectId }),
    xdefiWallet({ chains }),
    zerionWallet({ chains, projectId }),
    tahoWallet({ chains }),
    imTokenWallet({ chains, projectId }),
    // safeWallet({
    //   chains,
    //   allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
    //   debug: false,
    // }),
  ]
    .filter((e) => {
      if (e.id === "brave" && !e.installed) {
        return false;
      }
      return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const allConnectors: any = [...sharedWalletConnectConnectors.values()];
  wallets
    .filter((e) => !!e.connector.browser?.ready && e.installed)
    .forEach((e) => {
      e.connector.browser && allConnectors.push(e.connector.browser);
    });

  const other = otherInjectedWallet({ chains });

  if (
    other.installed &&
    other.connector.browser?.ready &&
    other.connector.browser?.name &&
    !wallets.some((e) => other.connector.browser?.name.includes(e.name))
  ) {
    wallets.unshift(other);
  }

  wagmi.setConnectors([
    ...(wagmi?.connectors || []),
    getCommonWalletConnect({ chains, projectId }),
    getWalletConnectLegacyConnector({ chains, projectId }),
    ...allConnectors,
  ]);

  useRKStore.setState({
    wagmi,
    wallets,
    chains,
    disclaimer,
    customButtons,
    showWalletConnect,
    configHook: {
      onConnect,
      onConnectError,
      onModalClosed,
      onModalClosedByManualOperation,
    },
  });

  syncMipd();

  if (wagmi.args.autoConnect) {
    wagmi.autoConnect();
  }

  let init = false;

  return {
    setDisclaimer: useRKStore.getState().setDisclaimer,
    setCustomButtons: useRKStore.getState().setCustomButtons,
    subscribeModalState: modalOpenSubscribe,
    open: (params) => {
      if (!init) {
        init = true;
        mount();
      }
      useRKStore.getState().openModal(params);
    },
    close: () => {
      useRKStore.setState({ open: false });
    },
    setTheme: (theme: Theme) => {
      useRKStore.getState().setTheme(theme);
    },

    getTheme: () => useRKStore.getState().theme,
    getCustomButtons: () => useRKStore.getState().customButtons,
    getDisclaimer: () => useRKStore.getState().disclaimer,
    getOpenState: () => useRKStore.getState().open,
  };
};
