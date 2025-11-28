import type { CreateConfigParameters, CreateConnectorFn } from "@wagmi/core";
import { sharedWalletConnectConnectors } from "../helpers/getWalletConnectUri";
import { useRKStore } from "../store";
import {
  rabbyWallet,
  metaMaskWallet,
  bitgetWallet,
  coreWallet,
  braveWallet,
  enkryptWallet,
  frameWallet,
  okxWallet,
  coin98Wallet,
  oneKeyWallet,
  phantomWallet,
  rainbowWallet,
  tokenPocketWallet,
  trustWallet,
  xdefiWallet,
  zerionWallet,
  tahoWallet,
  imTokenWallet,
  otherInjectedWallet,
  coinbaseWallet,
} from "./connectors";
import type { Chain, Transport } from "viem";

export function getDefaultConfig<
  const chains extends readonly [Chain, ...Chain[]],
  transports extends Record<chains[number]["id"], Transport>
>(
  config: {
    projectId: string;
    appName?: string;
    appUrl?: string;
    appDesc?: string;
    appLogo?: string;
  } & Partial<CreateConfigParameters<chains, transports>>
) {
  const { appName, appUrl, appDesc, appLogo, projectId, ...others } = config;

  const hasAllMetadata = Boolean(appName && appUrl && appDesc && appLogo);

  const metadata = hasAllMetadata
    ? {
        name: appName,
        description: appDesc,
        url: appUrl,
        icons: [appLogo],
      }
    : undefined;

  const wallets = [
    rabbyWallet(),
    metaMaskWallet({ projectId, metadata }),
    coinbaseWallet({ appName, appLogoUrl: appLogo }),
    bitgetWallet({ projectId, metadata }),
    coreWallet({ projectId, metadata }),
    braveWallet(),
    enkryptWallet(),
    frameWallet(),
    okxWallet({ projectId, metadata }),
    coin98Wallet({ projectId, metadata }),
    oneKeyWallet(),
    phantomWallet(),
    rainbowWallet({ projectId, metadata }),
    tokenPocketWallet({ projectId, metadata }),
    trustWallet({ projectId, metadata }),
    xdefiWallet(),
    zerionWallet({ projectId, metadata }),
    tahoWallet(),
    imTokenWallet({ projectId, metadata }),
    otherInjectedWallet(),
  ].filter((e) => {
    if (e.id === "brave" && !e.installed) {
      return false;
    }
    return true;
  });

  useRKStore.setState({ wallets, appName, appLogo });

  const allConnectors: CreateConnectorFn[] = [
    ...sharedWalletConnectConnectors.values(),
  ];

  wallets
    .filter((e) => e.id === "coinbase")
    .forEach((e) => {
      if (e.connector.browser && typeof e.connector.browser === "function") {
        allConnectors.push(e.connector.browser() as CreateConnectorFn);
      }
    });

  return {
    ...others,
    connectors: allConnectors,
  } as CreateConfigParameters<chains, transports>;
}
