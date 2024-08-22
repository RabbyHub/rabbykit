"use client";
import { createConfig, WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import * as React from "react";
import { createModal, getDefaultConfig } from "@rabby-wallet/rabbykit";
import { createClient } from "viem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const config = createConfig(
  // @ts-expect-error
  getDefaultConfig({
    projectId: "58a22d2bc1c793fc31c117ad9ceba8d9",
    appName: "RabbyKit",
    appLogo: "/logo-blue.svg",
    // @ts-expect-error
    chains: [mainnet],
    // @ts-expect-error
    client({ chain }) {
      // @ts-expect-error
      return createClient({ chain, transport: http() });
    },
  })
);

const queryClient = new QueryClient();

export const RabbykitContext = React.createContext<
  ReturnType<typeof createModal>
>({} as any);

export function Providers({ children }: { children: React.ReactNode }) {
  const [kit, setKit] = React.useState<ReturnType<typeof createModal>>();
  const initRef = React.useRef<Boolean>(false);
  React.useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      const rabbyKit = createModal({
        // @ts-expect-error
        wagmi: config,
      });
      setKit(rabbyKit);
    }
  }, []);
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
