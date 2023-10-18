"use client";

import * as React from "react";
import { WagmiConfig } from "wagmi";
// import { createModal } from "@rabby-wallet/rabbykit";

import { config } from "../wagmi";

// export let rabbyKit = () => {
//   let kit: ReturnType<typeof createModal> | undefined;

//   return (p: Parameters<typeof createModal>) => {
//     if (!kit) {
//       kit = createModal(...p);
//     }
//     return kit;
//   };
// };

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
    // createModal({
    //   wagmi: config,
    //   appName: "test",
    //   projectId: "58a22d2bc1c793fc31c117ad9ceba8d9",
    // });
  }, []);
  return <WagmiConfig config={config}>{mounted && children}</WagmiConfig>;
}
