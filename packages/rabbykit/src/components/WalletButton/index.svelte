<script lang="ts">
  import Image from "../Image/index.svelte";
  import { connect } from "@wagmi/core";
  import { WalletResult } from "../../wallets/type";
  import { useRKStore } from "../../store/context";
  import clsx from "clsx";

  export let wallet: WalletResult;
  export let type: "browser" | "mobile" | "unused";

  let { browser } = wallet.connector;
  let isReady = !!browser?.ready;

  const handleConnect = () => {
    if (browser && isReady && type === "browser") {
      useRKStore.setState({
        page: "connect",
        currentWallet: wallet,
        type,
        status: "connecting",
      });
      connect({ connector: browser });
      return;
    }

    if (type === "mobile") {
      if (wallet.connector?.qrCode?.connector || wallet.connector?.browser) {
        connect({
          connector:
            wallet.connector?.qrCode?.connector! || wallet.connector?.browser!,
        });
      }

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

<button
  class={clsx("button", $$props.class)}
  class:mobile={type === "mobile"}
  class:unused={type === "unused"}
  on:click={handleConnect}
  {...$$restProps}
>
  <div class="logo">
    <Image src={logo} alt={name} />
  </div>

  <span>{name}</span>
</button>

<style>
  .button {
    width: 206px;
    height: 56px;
    padding: 10px 20px;
    padding-right: 0;
    display: inline-flex;
    align-items: center;
    gap: 12px;

    border-radius: 5px;
    cursor: pointer;
    border-radius: 8px;
    background: var(--r-neutral-card-1);
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
    color: var(--r-neutral-title-1);
    font-weight: 590;
    border: 0.5px solid transparent;
  }

  .button:hover {
    border-radius: 8px;
    border: 0.5px solid var(--r-blue-default);
    background: var(--r-blue-light-1);
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  }

  .button.mobile {
    font-weight: 510;
    border-radius: 8px;
    box-shadow: none;
    border: 0.5px solid var(--r-neutral-line);
  }

  .button.mobile:hover {
    border: 0.5px solid var(--r-blue-default);
    box-shadow: none;
  }

  .button.unused {
    font-weight: 510;
    box-shadow: none;
    border-radius: 8px;
    color: var(--r-neutral-body);
    border: 1px solid var(--r-neutral-line, #d3d8e0);
    background: transparent;
  }

  .button.unused:hover {
    border-radius: 8px;
    border: 1px solid var(--r-blue-default, #7084ff);
    background: transparent;
  }

  .logo {
    width: 28px;
    height: 28px;
    object-fit: contain;
    border-radius: 100%;
    overflow: hidden;
  }
</style>
