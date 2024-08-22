import {
  type CreateConnectorFn,
  type Config,
  type Connector,
} from "@wagmi/core";

// TODO: complete type
export interface ConfigOptions<> {
  config: Config;
}

interface RabbyKitConnector {
  browser?: () =>
    | CreateConnectorFn<
        unknown,
        Record<string, unknown>,
        Record<string, unknown>
      >
    | Connector;

  mobile?: {
    getUri?: (connector: Connector) => Promise<string>;
    connector?: () => CreateConnectorFn | Connector;
  };
  qrCode?: {
    getUri?: (connector: Connector) => Promise<string>;
    connector?: () => CreateConnectorFn | Connector;
  };
}

export type WalletResult = {
  id: string;
  name: string;
  rdns?: string;
  mobileName?: string;
  logo: string;
  installed?: boolean;
  downloadUrls?: {
    chrome?: string;
    firefox?: string;
    edge?: string;
    android?: string;
    ios?: string;
    safari?: string;
  };
  connector: RabbyKitConnector;
  mobileUA?: (ua: string) => boolean;
};
