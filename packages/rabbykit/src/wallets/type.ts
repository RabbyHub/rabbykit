import {
  Config,
  Connector,
  PublicClient,
  WebSocketPublicClient,
} from "@wagmi/core";

export interface ConfigOptions<
  TPublicClient extends PublicClient = PublicClient,
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient
> {
  config: Config<TPublicClient, TWebSocketPublicClient>;
}

interface RabbyKitConnector<C extends Connector = Connector> {
  browser?: C; // inject, metamask, coninbase
  mobile?: {
    getUri?: () => Promise<string>;
  };
  qrCode?: {
    getUri?: () => Promise<string>;
  };
}

export type WalletResult<C extends Connector = Connector> = {
  id: string;
  name: string;
  mobileName?: string;
  logo: string;
  installed?: boolean;
  downloadUrls?: {
    chrome?: string;
    firefox?: string;
    edge?: string;
    android?: string;
    ios?: string;
  };
  createConnector: () => RabbyKitConnector<C>;
  mobileUA?: (ua: string) => boolean;
};
