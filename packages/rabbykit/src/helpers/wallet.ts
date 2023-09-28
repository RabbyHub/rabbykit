import { InjectedConnector, mainnet } from "@wagmi/core";
import { optimism, polygon } from "@wagmi/core/chains";

export function isMetaMask(ethereum?: (typeof window)["ethereum"]): boolean {
  // https://github.com/wagmi-dev/wagmi/blob/main/packages/connectors/src/metaMask.ts#L44
  const isMetaMask = !!ethereum?.isMetaMask;
  if (!isMetaMask) return false;
  // Brave tries to make itself look like MetaMask
  // Could also try RPC `web3_clientVersion` if following is unreliable
  if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state)
    return false;
  if (ethereum.isApexWallet) return false;
  if (ethereum.isAvalanche) return false;
  if (ethereum.isBitKeep) return false;
  if (ethereum.isBlockWallet) return false;
  if (ethereum.isCoin98) return false;
  if (ethereum.isFordefi) return false;
  if (ethereum.isMathWallet) return false;
  if (ethereum.isOkxWallet || ethereum.isOKExWallet) return false;
  if (ethereum.isOneInchIOSWallet || ethereum.isOneInchAndroidWallet)
    return false;
  if (ethereum.isOpera) return false;
  if (ethereum.isPortal) return false;
  if (ethereum.isRabby) return false;
  if (ethereum.isDefiant) return false;
  if (ethereum.isTokenPocket) return false;
  if (ethereum.isTokenary) return false;
  if (ethereum.isZeal) return false;
  if (ethereum.isZerion) return false;
  return true;
}

export const isRabby = () => {
  if (typeof window === "undefined") return false;
  const { ethereum } = window;
  return !!(
    ethereum?.isRabby ||
    (ethereum?.providers &&
      ethereum?.providers.find((provider: any) => provider.isRabby))
  );
};

export const injected = () =>
  new InjectedConnector({
    chains: [mainnet, polygon, optimism],
    options: {
      shimDisconnect: true,
      name: (detectedName) =>
        `Injected (${
          typeof detectedName === "string"
            ? detectedName
            : detectedName.join(", ")
        })`,
    },
  });

declare global {
  interface Window {
    ethereum?: any;
  }
}
