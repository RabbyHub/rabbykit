import {
  Chain,
  InjectedConnector,
  InjectedConnectorOptions,
} from "@wagmi/core";

export class MIPDConnector extends InjectedConnector {
  readonly id: string;
  readonly rdns: string;

  protected shimDisconnectKey: string;

  constructor({
    chains,
    options,
    rdns,
  }: {
    chains?: Chain[];
    options: InjectedConnectorOptions;
    rdns: string;
  }) {
    super({ options, chains });

    this.id = rdns;
    this.rdns = rdns;
    this.shimDisconnectKey = `${rdns}.eip6963.shimDisconnect`;
  }
}
