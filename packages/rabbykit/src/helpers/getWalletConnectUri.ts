import type { Connector } from "@wagmi/core/connectors";
import { isAndroid, isMobile } from "./browser";
// import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

// export const getWalletConnect = () => {
//   let wc: WalletConnectConnector;
//   return (params: {
//     chains: WalletConnectConnector["chains"];
//     options: WalletConnectConnector["options"];
//   }) => {
//     if (!wc) {
//       wc = new WalletConnectConnector(params);
//     }
//     return wc;
//   };
// };

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
