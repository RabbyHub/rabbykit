import { WalletResult } from "../../type";
import logo from "./logo.svg";
import { injected } from "@wagmi/connectors";

declare global {
  interface Window {
    enkrypt: {
      providers: {
        ethereum: any;
      };
    };
  }
}

export const enkryptWallet = (): WalletResult => {
  const isEnkryptInjected =
    typeof window !== "undefined" &&
    typeof window.enkrypt !== "undefined" &&
    window?.enkrypt?.providers?.ethereum;
  return {
    id: "enkrypt",
    name: "Enkrypt Wallet",
    rdns: "com.enkrypt",
    logo,
    installed: isEnkryptInjected ? true : undefined,
    downloadUrls: {
      chrome:
        "https://chrome.google.com/webstore/detail/enkrypt-ethereum-polkadot/kkpllkodjeloidieedojogacfhpaihoh",
      edge: "https://microsoftedge.microsoft.com/addons/detail/enkrypt-ethereum-polkad/gfenajajnjjmmdojhdjmnngomkhlnfjl",
      firefox: "https://addons.mozilla.org/en-US/firefox/addon/enkrypt/",
      safari: "https://apps.apple.com/app/enkrypt-web3-wallet/id1640164309",
    },
    connector: {
      browser: isEnkryptInjected
        ? () =>
            injected({
              target: "enkrypt",
              // target: () => ({
              //   id: "enkrypt",
              //   name: "Enkrypt Wallet",
              //   provider: window?.enkrypt?.providers?.ethereum,
              // }),
            })
        : undefined,
    },
  };
};
