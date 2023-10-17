import {
  watchAccount,
  Config,
  PublicClient,
  WebSocketPublicClient,
} from "@wagmi/core";
import { Theme, modalOpenSubscribe, syncAccount, useRKStore } from "./store";
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

export const createModal = <
  TPublicClient extends PublicClient = PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient
>({
  appName,
  projectId,
  wagmi,
}: {
  appName: string;
  projectId: string;
  wagmi: Config<TPublicClient, TWebSocketPublicClient>;
}) => {
  useRKStore.setState({ wagmi });

  watchAccount(() => syncAccount());

  const chains = wagmi.chains!;

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
    // safeWallet({ chains }),
  ]
    .filter((e) => {
      if (e.id === "brave" && !e.installed) {
        return false;
      }
      return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const allConnect: any[] = [];

  if (wagmi.args.autoConnect) {
    list.forEach((e) => {
      e.connector.browser && allConnect.push(e.connector.browser);
      e.connector.mobile?.connector &&
        allConnect.push(e.connector.mobile?.connector);
    });
    wagmi.setConnectors(allConnect);
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

  useRKStore.setState({ wallets: list });

  let init = false;

  return {
    modalOpenSubscribe,
    openModal: (force = false) => {
      if (!init) {
        init = true;
        mount();
      }
      useRKStore.getState().openModal(force);
    },
    closeModal: () => {
      useRKStore.setState({ open: false });
    },
    setTheme: (theme: Theme) => {
      useRKStore.getState().setTheme(theme);
    },
  };
};
