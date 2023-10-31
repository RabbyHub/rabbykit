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
  // safeWallet,
} from "./wallets/connectors";
import { mount } from "./components/Kit";
import "./helpers/i18n";
import { CustomButton, Disclaimer, Hook, RabbyKitModal, Theme } from "./type";
import {
  getCommonWalletConnect,
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
}: {
  chains: Chain[];
  appName: string;
  projectId: string;
  wagmi: Config<TPublicClient, TWebSocketPublicClient>;
  disclaimer?: Disclaimer;
  customButtons?: CustomButton[];
  showWalletConnect?: boolean;
} & Hook): RabbyKitModal => {
  useRKStore.setState({ wagmi });

  syncMipd();

  watchAccount(() => syncAccount());

  const list = [
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

  if (wagmi.args.autoConnect) {
    const allConnectors: any = [...sharedWalletConnectConnectors.values()];
    list
      .filter((e) => !!e.connector.browser?.ready)
      .forEach((e) => {
        e.connector.browser && allConnectors.push(e.connector.browser);
      });

    wagmi.setConnectors([
      ...(wagmi?.connectors || []),
      getCommonWalletConnect({ chains, projectId }),
      ...allConnectors,
    ]);
    wagmi.autoConnect();
  }

  const other = otherInjectedWallet({ chains });
  if (
    other.installed &&
    other.connector.browser?.ready &&
    other.connector.browser?.name &&
    !list.some((e) => other.connector.browser?.name.includes(e.name))
  ) {
    list.unshift(other);
  }

  useRKStore.setState({
    chains,
    wallets: list,
    disclaimer,
    customButtons,
    showWalletConnect,
    configHook: {
      onConnect,
      onConnectError,
      onModalClosed,
    },
  });

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
  };
};
