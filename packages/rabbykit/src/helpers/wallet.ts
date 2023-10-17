import {
  Chain,
  InjectedConnector,
  InjectedConnectorOptions,
  WindowProvider,
  mainnet,
} from "@wagmi/core";
// import { optimism, polygon } from "@wagmi/core/chains";
import { WalletResult } from "../wallets/type";

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

// export const injected = () =>
//   new InjectedConnector({
//     chains: [mainnet, polygon, optimism],
//     options: {
//       shimDisconnect: true,
//       name: (detectedName) =>
//         `Injected (${
//           typeof detectedName === "string"
//             ? detectedName
//             : detectedName.join(", ")
//         })`,
//     },
//   });
//https://github.com/wagmi-dev/wagmi/blob/38306606d2fd72a4c6918323bf86a1afda348638/packages/connectors/src/types.ts#L11
type InjectedProviderFlags = {
  isApexWallet?: true;
  isAvalanche?: true;
  isBackpack?: true;
  isBifrost?: true;
  isBitKeep?: true;
  isBitski?: true;
  isBlockWallet?: true;
  isBraveWallet?: true;
  isCoin98?: true;
  isCoinbaseWallet?: true;
  isDawn?: true;
  isDefiant?: true;
  isDesig?: true;
  isEnkrypt?: true;
  isExodus?: true;
  isFordefi?: true;
  isFrame?: true;
  isFrontier?: true;
  isGamestop?: true;
  isHaloWallet?: true;
  isHaqqWallet?: true;
  isHyperPay?: true;
  isImToken?: true;
  isKuCoinWallet?: true;
  isMathWallet?: true;
  isMetaMask?: true;
  isNovaWallet?: true;
  isOkxWallet?: true;
  isOKExWallet?: true;
  isOneInchAndroidWallet?: true;
  isOneInchIOSWallet?: true;
  isOpera?: true;
  isPhantom?: true;
  isPortal?: true;
  isRabby?: true;
  isRainbow?: true;
  isStatus?: true;
  isSubWallet?: true;
  isTalisman?: true;
  isTally?: true;
  isTokenPocket?: true;
  isTokenary?: true;
  isTrust?: true;
  isTrustWallet?: true;
  isTTWallet?: true;
  isXDEFI?: true;
  isZeal?: true;
  isZerion?: true;
};

export const getWalletProviderByFlag = (
  flag: "isRainbow"
): WindowProvider | undefined => {
  if (typeof window === "undefined" || typeof window.ethereum === "undefined")
    return;
  const providers = window.ethereum.providers;
  return providers
    ? providers.find(
        (provider: Record<string, WindowProvider>) => provider[flag]
      )
    : window.ethereum[flag]
    ? window.ethereum
    : undefined;
};

// export const getInjectedConnector = ({
//   flag,
//   chains,
//   ...options
// }: {
//   flag: keyof InjectedProviderFlags;
//   chains: Chain[];
// } & InjectedConnectorOptions) => {
//   const provider = getWalletProviderByFlag(flag);
//   if (!!provider) {
//     return new InjectedConnector({
//       chains,
//       options: {
//         getProvider: () => provider,
//         ...options,
//       },
//     });
//   }
//   return;
// };

export const isSupportBrowser = (wallet: WalletResult) => {
  return !!(
    wallet.downloadUrls?.chrome ||
    wallet.downloadUrls?.edge ||
    wallet.downloadUrls?.firefox ||
    wallet.downloadUrls?.safari
  );
};
declare global {
  interface Window {
    ethereum?: any;
  }
}
