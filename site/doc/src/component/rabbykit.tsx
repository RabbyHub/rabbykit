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

let demoKit: ReturnType<typeof createModal> | undefined;

export function Providers({ children, onReady, onError, attempt }: {
  children: React.ReactNode;
  onReady: (kit: ReturnType<typeof createModal>, connected: boolean) => void;
  onError: (error: unknown) => void;
  attempt: number;
}) {
  const [kit, setKit] = React.useState<ReturnType<typeof createModal>>();
  React.useEffect(() => {
    let active = true;
    let notified = false;
    let unsubscribe: (() => void) | undefined;
    try {
      demoKit ??= createModal({ wagmi: config });
      const currentKit = demoKit;
      setKit(currentKit);
      const notifyReady = () => {
        const status = config.state.status;
        if (!active || notified || status === 'connecting' || status === 'reconnecting') return;
        notified = true;
        try {
          onReady(currentKit, status === 'connected');
        } catch (error) {
          onError(error);
        }
      };
      unsubscribe = config.subscribe((state) => state.status, notifyReady);
      notifyReady();
    } catch (error) {
      onError(error);
    }
    return () => {
      active = false;
      unsubscribe?.();
    };
  }, [attempt, onReady, onError]);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {kit && (
          <RabbykitContext.Provider value={kit}>
            {children}
          </RabbykitContext.Provider>
        )}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
