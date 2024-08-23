import { getDefaultConfig } from "@rabby-wallet/rabbykit";
import { createClient } from "viem";
import { createConfig, http } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";

const walletConnectProjectId = "58a22d2bc1c793fc31c117ad9ceba8d9";

const chains = [
  mainnet,
  ...(process.env.NODE_ENV === "development" ? [goerli] : []),
];
const configParams = getDefaultConfig({
  projectId: walletConnectProjectId,
  appName: "RabbyKit next wagmi",
  // @ts-expect-error
  chains,
  // @ts-expect-error
  client({ chain }) {
    // @ts-expect-error
    return createClient({ chain, transport: http() });
  },
});

export const config = createConfig(configParams);
