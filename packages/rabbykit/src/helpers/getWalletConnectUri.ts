import type { Connector } from "@wagmi/core/connectors";
import { isAndroid, isMobile } from "./browser";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { dequal } from "dequal";
import { WalletConnectLegacyConnector } from "wagmi/connectors/walletConnectLegacy";

export let commonLegacyWalletConnect: WalletConnectLegacyConnector | undefined;
export const getWalletConnectLegacyConnector = (params: {
  projectId: string;
  chains: WalletConnectConnector["chains"];
  options?: Omit<WalletConnectConnector["options"], "projectId">;
}) => {
  if (!commonLegacyWalletConnect) {
    return new WalletConnectLegacyConnector({
      chains: params.chains,
      options: {
        //@ts-ignore
        projectId: params.projectId,
        bridge: "https://derelay.rabby.io",
        qrcode: false,
        clientMeta: {
          description: "rabby",
          url: "https://rabby.io",
          icons: [
            "https://static-assets.rabby.io/files/122da969-da58-42e9-ab39-0a8dd38d94b8.png",
          ],
          name: "Rabby",
        },
        ...params.options,
      },
    });
  }
  return commonLegacyWalletConnect;
};

export let commonWalletConnect: WalletConnectConnector | undefined;
export const getCommonWalletConnect = (params: {
  projectId: string;
  chains: WalletConnectConnector["chains"];
  options?: Omit<WalletConnectConnector["options"], "projectId">;
}) => {
  if (!commonWalletConnect) {
    commonWalletConnect = new WalletConnectConnector({
      chains: params.chains,
      options: {
        projectId: params.projectId,
        showQrModal: false,
        ...params.options,
      },
    });
  }
  return commonWalletConnect;
};

const allParams: any[] = [];
export const sharedWalletConnectConnectors = new Map<
  Object,
  WalletConnectConnector | WalletConnectLegacyConnector
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
  // if (connector instanceof WalletConnectLegacyConnector) {
  //   console.log("provider", provider, provider.connector.uri);
  //   provider.on("message", (...arg: any) => {
  //     console.log("message", ...arg);
  //   });

  //   provider.on("session_update", (...arg: any) => {
  //     console.log("session_update", ...arg);
  //   });
  //   return new Promise<string>((resolve) => {
  //     setTimeout(() => {
  //       resolve(provider.connector.uri);
  //     }, 500);
  //   });
  // }
  return new Promise<string>((resolve) => {
    if (connector instanceof WalletConnectLegacyConnector) {
      let id: NodeJS.Timer;
      id = setInterval(() => {
        console.log(
          "provider",
          provider,
          provider.connector.handshakeTopic,
          provider.connector.uri
        );

        if (provider.connector.handshakeTopic) {
          clearInterval(id);
          return resolve(provider.connector.uri);
        }
      }, 100);
    }
    provider.once("display_uri", resolve);
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
