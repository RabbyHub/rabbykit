import { getDefaultConfig } from "@rabby-wallet/rabbykit";
import { createClient } from "viem";
import { createConfig, http } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";

const walletConnectProjectId = "58a22d2bc1c793fc31c117ad9ceba8d9";

const configParams = getDefaultConfig({
  projectId: walletConnectProjectId,
  appName: "RabbyKit next wagmi",
  chains: [
    mainnet,
    ...(process.env.NODE_ENV === "development" ? [goerli] : []),
  ],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

export const config = createConfig(configParams);
