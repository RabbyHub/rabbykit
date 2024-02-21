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
} from "./wallets/connectors";
import { mount } from "./components/Kit";
import "./helpers/i18n";
import {
  CustomButton,
  Disclaimer,
  Hook,
  RabbyKitModal,
  Theme,
  ThemeVariables,
} from "./type";
import {
  getCommonWalletConnect,
  getWalletConnectLegacyConnector,
  sharedWalletConnectConnectors,
} from "./helpers/getWalletConnectUri";
import { SUPPORT_LANGUAGES } from "./helpers/i18n";

export const createModal = <
  TPublicClient extends PublicClient = PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient
>({
  chains,
  appName,
  appLogo,
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
  themeVariables,
  language = "en",
}: {
  appLogo?: string;
  chains: Chain[];
  appName: string;
  projectId: string;
  wagmi: Config<TPublicClient, TWebSocketPublicClient>;
  disclaimer?: Disclaimer;
  customButtons?: CustomButton[];
  showWalletConnect?: boolean;
  theme?: Theme;
  themeVariables?: ThemeVariables;
  language?: SUPPORT_LANGUAGES;
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
    otherInjectedWallet({ chains }),
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

  wagmi.setConnectors([
    ...(wagmi?.connectors || []),
    getCommonWalletConnect({ chains, projectId }),
    getWalletConnectLegacyConnector({ chains, projectId }),
    ...allConnectors,
  ]);

  useRKStore.setState({
    appLogo,
    appName,
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
    theme,
    themeVariables,
    language,
  });

  syncMipd();

  if (wagmi.args.autoConnect) {
    wagmi.autoConnect();
  }

  let init = false;

  return {
    subscribeModalState: modalOpenSubscribe,
    getOpenState: () => useRKStore.getState().open,
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

    getTheme: () => useRKStore.getState().theme,
    setTheme: (theme: Theme) => {
      useRKStore.getState().setTheme(theme);
    },
    setThemeVariables: (themeVariables?: ThemeVariables) =>
      useRKStore.setState({ themeVariables }),

    getCustomButtons: () => useRKStore.getState().customButtons,
    setCustomButtons: useRKStore.getState().setCustomButtons,

    getDisclaimer: () => useRKStore.getState().disclaimer,
    setDisclaimer: useRKStore.getState().setDisclaimer,

    getLanguage: () => useRKStore.getState().language,
    setLanguage: (language: SUPPORT_LANGUAGES) =>
      useRKStore.setState({ language }),
  };
};
