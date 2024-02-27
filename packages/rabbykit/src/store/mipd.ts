import { EIP6963ProviderDetail, createStore as createMipdStore } from "mipd";
import { wrapperEIP6963Wallet } from "../helpers/mipd";
import { WalletResult } from "../wallets/type";
import { useRKStore } from "./context";

export const syncMipd = () => {
  const syncState = (eip6963Wallets: readonly EIP6963ProviderDetail[]) => {
    const duplicates: string[] = [];
    const allEIP6963Wallets = eip6963Wallets.map((p) => {
      let mergeWallet: WalletResult | undefined;
      (useRKStore.getState().wallets || []).some((r) => {
        const isSame =
          r.name === p.info.name ||
          (r.name.startsWith(p.info.name) &&
            p.info.rdns.split(".").slice(-1).includes(r.id));

        if (isSame) {
          mergeWallet = r;
          duplicates.push(r.name);
        }
        return isSame;
      });
      return wrapperEIP6963Wallet(p, useRKStore.getState().chains, mergeWallet);
    });

    useRKStore.setState((s) => ({
      mipd: detectedEIP6963wallets,
      wallets: [
        ...(s.wallets || []).filter((e) => !duplicates.includes(e.name)),
        ...allEIP6963Wallets,
      ].sort((a, b) => a.name.localeCompare(b.name)),
    }));

    const { wagmi, wallets } = useRKStore.getState();
    if (wagmi) {
      wagmi?.setConnectors([
        ...allEIP6963Wallets
          .filter((item) => wallets?.some((e) => e.id === item.id))
          .map((e) => e.connector?.browser!),
        ...(wagmi?.connectors || []),
      ]);
    }
  };

  const mipdStore = createMipdStore();

  const detectedEIP6963wallets = mipdStore.getProviders();

  syncState(detectedEIP6963wallets);

  const unsubscribe = mipdStore.subscribe((arr) => {
    syncState(arr);
  });

  return () => {
    unsubscribe();
    mipdStore.clear();
  };
};
