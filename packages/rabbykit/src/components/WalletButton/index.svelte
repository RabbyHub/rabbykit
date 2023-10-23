<script lang="ts">
  import { WalletResult } from "../../wallets/type";
  import { useRKStore } from "../../store/context";
  import Button from "./button.svelte";

  export let wallet: WalletResult;
  export let type: "browser" | "mobile" | "unused";

  let { browser } = wallet.connector;
  let isReady = !!browser?.ready;

  const handleConnect = async () => {
    if (browser && isReady && type === "browser") {
      useRKStore.setState({
        page: "connect",
        currentWallet: wallet,
        type,
        status: "connecting",
      });
      return;
    }

    if (type === "mobile") {
      useRKStore.setState({
        page: "connect",
        currentWallet: wallet,
        type,
        status: "connecting",
      });
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

<Button {type} {name} {logo} on:click={handleConnect} />
