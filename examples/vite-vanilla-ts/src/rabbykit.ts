import { mainnet, arbitrum, bsc, optimism, polygon } from "@wagmi/core/chains";

import { createModal, getDefaultConfig } from "@rabby-wallet/rabbykit";
import { createConfig, http } from "@wagmi/core";
import { createClient } from "viem";

export const config = createConfig(
  // @ts-expect-error
  getDefaultConfig({
    appName: "RabbyKit example",
    projectId: "58a22d2bc1c793fc31c117ad9ceba8d9",
    // @ts-expect-error
    chains: [mainnet, arbitrum, bsc, optimism, polygon],
    // @ts-expect-error
    client({ chain }) {
      // @ts-expect-error
      return createClient({ chain, transport: http() });
    },
  })
);

export const rabbyKit = createModal({
  // @ts-expect-error
  wagmi: config,
});
