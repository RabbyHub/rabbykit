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

let modal: ReturnType<typeof createModal> | undefined;

export function Providers({ children, fallback, onError }: { children: React.ReactNode; fallback?: React.ReactNode; onError?: () => void }) {
  const [kit, setKit] = React.useState(modal);
  React.useEffect(() => {
    try {
      modal ??= createModal({ wagmi: config });
      setKit(modal);
    } catch {
      onError?.();
    }
  }, [onError]);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {kit ? (
          <RabbykitContext.Provider value={kit}>
            {children}
          </RabbykitContext.Provider>
        ) : fallback}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
