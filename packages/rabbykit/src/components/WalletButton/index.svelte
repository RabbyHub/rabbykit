<script lang="ts">
  import svelteStore from "../../store/context";
  import { WalletResult } from "../../wallets/type";
  import { rabbykitConnect, useRKStore } from "../../store/context";
  import Button from "./button.svelte";
  import { Type } from "../../type";
  import { getMobileUri } from "../../helpers/getWalletConnectUri";

  export let wallet: WalletResult;
  export let type: Type;
  export let size: "lg" | "normal" | "sm" = "lg";
  export let active = false;

  let { browser } = wallet.connector;
  let isReady = true;

  const handleConnect = async () => {
    $$props.click?.();
    if (browser && isReady && type === "browser") {
      useRKStore.setState({
        page: "connect",
        currentWallet: wallet,
        type,
        status: "connecting",
      });
      return;
    }

    if (type === "qrCode") {
      useRKStore.setState({
        page: "connect",
        currentWallet: wallet,
        type,
        status: "connecting",
      });
      return;
    }

    if (type === "mobile") {
      if (wallet.connector?.mobile?.connector) {
        try {
          rabbykitConnect({
            connector: wallet.connector?.mobile.connector(),
          }).then(() => {
            $svelteStore.closeModal();
          });

          const connectors = $svelteStore.wagmi?.connectors || [];
          const walletConnect = connectors.find((w) =>
            wallet.id === "coinbase"
              ? w.type === "coinbaseWallet"
              : w.type === "walletConnect"
          );

          let mobileUri;
          if (walletConnect) {
            mobileUri = wallet.connector.mobile?.getUri
              ? await wallet.connector.mobile.getUri(walletConnect)
              : await getMobileUri({ connector: walletConnect });
          } else {
            throw new Error("walletConnect not found");
          }

          if (mobileUri) {
            if (mobileUri.startsWith("http")) {
              // Workaround for https://github.com/rainbow-me/rainbowkit/issues/524.
              // Using 'window.open' causes issues on iOS in non-Safari browsers and
              // WebViews where a blank tab is left behind after connecting.
              // This is especially bad in some WebView scenarios (e.g. following a
              // link from Twitter) where the user doesn't have any mechanism for
              // closing the blank tab.
              // For whatever reason, links with a target of "_blank" don't suffer
              // from this problem, and programmatically clicking a detached link
              // element with the same attributes also avoids the issue.
              const link = document.createElement("a");
              link.href = mobileUri;
              link.target = "_blank";
              link.rel = "noreferrer noopener";
              link.click();
            } else {
              window.location.href = mobileUri;
            }
          }
        } catch (error) {
          alert(String(error));
        }
      }
      return;
    }

    if (type === "unused") {
      useRKStore.setState({
        page: "download",
        currentWallet: wallet,
      });
    }
  };

  let logo = wallet.logo;
  let name =
    type === "mobile" ? wallet.mobileName || wallet.name : wallet.name || "";
</script>

<Button {type} {name} {logo} {size} {active} on:click={handleConnect} />
