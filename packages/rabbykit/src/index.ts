import { watchAccount, reconnect } from "@wagmi/core";
import type { Config, Transport } from "@wagmi/core";
import { modalOpenSubscribe, syncAccount, useRKStore } from "./store";

import { mount } from "./components/Kit";
import "./helpers/i18n";
import type {
  CustomButton,
  Disclaimer,
  Hook,
  RabbyKitModal,
  Theme,
  ThemeVariables,
} from "./type";
import { SUPPORT_LANGUAGES } from "./helpers/i18n";
import type { Chain } from "@wagmi/core/chains";

export { getDefaultConfig } from "./wallets/getDefaultConfig";

export const createModal = <
  chains extends readonly [Chain, ...Chain[]] = readonly [Chain, ...Chain[]],
  transports extends Record<chains[number]["id"], Transport> = Record<
    chains[number]["id"],
    Transport
  >
>({
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
  wagmi: Config<chains, transports>;
  disclaimer?: Disclaimer;
  customButtons?: CustomButton[];
  showWalletConnect?: boolean;
  theme?: Theme;
  themeVariables?: ThemeVariables;
  language?: SUPPORT_LANGUAGES;
} & Hook): RabbyKitModal => {
  watchAccount(wagmi, {
    onChange(account, prevAccount) {
      syncAccount();
    },
  });

  useRKStore.setState({
    wagmi,
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

  if (true) {
    reconnect(wagmi);
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

    setFooterContent: (params: { node?: HTMLElement; className?: string }) =>
      useRKStore.getState().setFooterContent(params),
  };
};
