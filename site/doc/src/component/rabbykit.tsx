"use client";
import { createConfig, WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import * as React from "react";
import { createModal, getDefaultConfig } from "@rabby-wallet/rabbykit";
import { createClient, http } from "viem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const config = createConfig(
  getDefaultConfig({
    projectId: "58a22d2bc1c793fc31c117ad9ceba8d9",
    appName: "RabbyKit",
    appLogo: "/logo-blue.svg",
    chains: [mainnet],
    client({ chain }) {
      return createClient({ chain, transport: http() });
    },
  })
);

const queryClient = new QueryClient();

export const RabbykitContext = React.createContext<
  ReturnType<typeof createModal>
>({} as any);

let kit: ReturnType<typeof createModal> | undefined;
function getKit() {
  return (kit ??= createModal({ wagmi: config }));
}

// createModal starts reconnect itself. Wait before consuming the first click.
export async function prepareWallet() {
  const instance = getKit();
  if (config.state.status === "connecting" || config.state.status === "reconnecting") {
    await new Promise<void>((resolve) => {
      const unsubscribe = config.subscribe((state) => state.status, (status) => {
        if (status !== "connecting" && status !== "reconnecting") {
          unsubscribe();
          resolve();
        }
      });
    });
  }
  return instance;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [instance] = React.useState(getKit);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RabbykitContext.Provider value={instance}>
          {children}
        </RabbykitContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
