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

type RKConnector<C extends Connector = Connector> = {
  connector: C;
  getUri?: () => Promise<string | null | undefined>;
};

export type WalletResult<C extends Connector = Connector> = {
  id: string;
  name: string;
  shortName?: string;
  logos: {
    default: string;
    transparent?: string;
    connectorButton?: string;
    qrCode?: string;
    appIcon?: string;
    mobile?: string;
  };
  logoBackground?: string;
  scannable?: boolean;
  installed?: boolean;
  downloadUrls?: {
    website?: string;
    android?: string;
    ios?: string;
    mobile?: string;
    qrCode?: string;
    chrome?: string;
    edge?: string;
    firefox?: string;
    opera?: string;
    safari?: string;
    browserExtension?: string;
    brave?: string;
  };
  createConnector: () => RKConnector<C>;
};
