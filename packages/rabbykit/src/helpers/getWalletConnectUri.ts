import { isAndroid, isMobile } from "./browser";
import { dequal } from "dequal";
import { walletConnect } from "@wagmi/connectors";
import type { WalletConnectParameters } from "@wagmi/connectors";
import { CreateConnectorFn, type Connector } from "@wagmi/core";

const allParams: any[] = [];

export const sharedWalletConnectConnectors = new Map<
  Object,
  CreateConnectorFn
>();

export const getWalletConnectConnector = (params: WalletConnectParameters) => {
  const key = allParams.find((e) => dequal(params, e));
  if (key) {
    return sharedWalletConnectConnectors.get(key)!;
  }
  allParams.push(params);

  const wcConnector = walletConnect(params) as CreateConnectorFn;

  sharedWalletConnectConnectors.set(params, wcConnector);
  return wcConnector;
};

export async function getWalletConnectUri(
  connector: Connector
): Promise<string> {
  const provider = await connector.getProvider();

  if (connector.type === "coinbaseWallet") {
    // @ts-expect-error
    return provider.qrUrl;
  }

  return new Promise<string>((resolve, reject) => {
    // Wagmi v2 doesn't have a return type for provider yet
    // @ts-expect-error
    provider.once("display_uri", resolve);
    setTimeout(() => {
      return reject();
    }, 3000);
  });
}

export async function getMobileUri({
  connector,
  iosUri,
  androidUri,
}: {
  connector: Connector;
  iosUri?: (uri: string) => string | string;
  androidUri?: (uri: string) => string | string;
}) {
  const uri = await getWalletConnectUri(connector);
  let ios = uri;
  let android = uri;

  if (!iosUri && !androidUri) {
    return uri;
  }

  if (iosUri) {
    ios = typeof iosUri === "function" ? iosUri(uri) : iosUri;
  }
  if (androidUri) {
    android = typeof androidUri === "function" ? androidUri(uri) : androidUri;
  }
  return isMobile() ? (isAndroid() ? android : ios) : uri;
}
