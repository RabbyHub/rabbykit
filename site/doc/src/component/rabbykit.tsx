"use client";
import { configureChains, createConfig } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { createModal } from "@rabby-wallet/rabbykit";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, ...(process.env.NODE_ENV === "development" ? [goerli] : [])],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export const RabbykitContext = React.createContext<
  ReturnType<typeof createModal>
>({} as any);

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  const [kit, setKit] = React.useState<ReturnType<typeof createModal>>();
  const initRef = React.useRef<Boolean>(false);
  React.useEffect(() => {
    setMounted(true);
    if (!initRef.current) {
      initRef.current = true;
      const rabbyKit = createModal({
        chains,
        wagmi: config,
        projectId: "58a22d2bc1c793fc31c117ad9ceba8d9",
        appName: "RabbyKit",
      });
      setKit(rabbyKit);
    }
  }, []);
  return (
    <WagmiConfig config={config}>
      {mounted && initRef && kit && (
        <RabbykitContext.Provider value={kit}>
          {children}
        </RabbykitContext.Provider>
      )}
    </WagmiConfig>
  );
}
