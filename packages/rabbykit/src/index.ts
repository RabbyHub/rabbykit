"use client";
import {
  watchAccount,
  Config,
  PublicClient,
  WebSocketPublicClient,
} from "@wagmi/core";
import { syncAccount, useRKStore } from "./store";
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
} from "./wallets/connectors";
import { mount } from "./components/demo";
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
  if (useRKStore.getState().wagmi) {
    throw new Error("RabbyKit Modal already initialized");
  }

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
  ]
    .filter((e) => {
      if (e.id === "brave" && !e.installed) {
        return false;
      }
      return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const other = otherInjectedWallet({ chains });
  if (
    other.installed &&
    other.connector.browser?.ready &&
    other.connector.browser?.name &&
    !list.some((e) => other.connector.browser?.name.includes(e.name))
  ) {
    list.unshift(other);
  }

  (window as any).$wagmi = wagmi;

  useRKStore.setState({ wallets: list });

  mount();

  return {
    openModal: () => {
      useRKStore.setState({ open: true });
    },
    closeModal: () => {
      useRKStore.setState({ open: false });
    },
  };
};
