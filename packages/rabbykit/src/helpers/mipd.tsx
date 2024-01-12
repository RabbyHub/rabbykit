import { Chain, WindowProvider } from "@wagmi/core";
import { EIP6963ProviderDetail } from "mipd";
import { WalletResult } from "../wallets/type";
import { MIPDConnector } from "../connector/mipd";

export const wrapperEIP6963Wallet = (
  e: EIP6963ProviderDetail,
  chains: Chain[],
  mergeWallet?: WalletResult
) =>
  ({
    ...(mergeWallet || {}),
    id: e.info.rdns,
    name: e.info.name,
    logo: e.info.icon,
    installed: true,
    connector: {
      ...(mergeWallet?.connector || {}),
      browser: new MIPDConnector({
        rdns: e.info.rdns,
        chains,
        options: { getProvider: () => e.provider as WindowProvider },
      }),
    },
  } as WalletResult);
