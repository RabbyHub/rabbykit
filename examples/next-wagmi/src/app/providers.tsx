"use client";

import * as React from "react";
import { WagmiConfig } from "wagmi";
import { createModal } from "rabbykit";

import { config } from "../wagmi";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
    createModal({
      wagmi: config,
      appName: "test",
      projectId: "58a22d2bc1c793fc31c117ad9ceba8d9",
    });
  }, []);
  return <WagmiConfig config={config}>{mounted && children}</WagmiConfig>;
}
