<script lang="ts">
  import { connect } from "@wagmi/core";
  import { WalletResult } from "../../wallets/type";

  export let wallet: WalletResult;

  let { connector } = wallet.createConnector();
  let isReady = connector.ready;

  $: src = wallet.logos.default || "https://placehold.co/28x28/png";
  $: name = wallet.name;
  $: type = isReady ? "primary" : "ghost";
</script>

<button
  class="button"
  class:ghost={type === "ghost"}
  class:border={type === "border"}
  on:click={() => connect({ connector })}
>
  <img {src} alt="wallet logo" loading="lazy" />
  <span>{name}</span>
</button>

<style>
  .button {
    width: 206px;
    height: 56px;
    color: white;

    padding: 10px 20px;
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
  .button img {
    overflow: hidden;
    width: 28px;
    height: 28px;
    border-radius: 100%;
  }
  .button:hover {
    border-radius: 8px;
    border: 0.5px solid var(--r-blue-default);
    background: var(--r-blue-light-1);
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  }

  .button.ghost {
    border-radius: 8px;
    box-shadow: none;
    color: var(--r-neutral-body);
    border: 1px solid var(--r-neutral-line);
  }

  .button.ghost:hover {
    border: 1px solid var(--r-blue-default);
    box-shadow: none;
  }

  .button.border {
    box-shadow: none;
    border-radius: 8px;
    border: 0.5px solid var(--r-neutral-line);
    background: var(--r-neutral-card-1);
  }

  .button.border:hover {
    border-radius: 8px;
    border: 0.5px solid var(--r-blue-default);
    background: var(--r-blue-light-1);
  }
</style>
