import type { Connector } from "@wagmi/core/connectors";
import { isAndroid, isMobile } from "./browser";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { dequal } from "dequal";

const allParams: any[] = [];
export const sharedWalletConnectConnectors = new Map<
  Object,
  WalletConnectConnector
>();

export const getWalletConnectConnector = (params: {
  chains: WalletConnectConnector["chains"];
  options: WalletConnectConnector["options"];
}) => {
  const key = allParams.find((e) => dequal(params, e));
  if (key) {
    return sharedWalletConnectConnectors.get(key)!;
  }
  allParams.push(params);
  const connector = new WalletConnectConnector(params);

  sharedWalletConnectConnectors.set(params, connector);
  return connector;
};

export async function getWalletConnectUri(
  connector: Connector
): Promise<string> {
  const provider = await connector.getProvider();
  return new Promise<string>((resolve) =>
    provider.once("display_uri", resolve)
  );
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
