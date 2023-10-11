"use client";
import {
  watchAccount,
  getConfig,
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
  ].sort((a, b) => a.name.localeCompare(b.name));

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
