<script lang="ts">
  import { connect } from "@wagmi/core";
  import { WalletResult } from "../../wallets/type";
  export let wallet: WalletResult;

  let connectorInfo = wallet.createConnector();
  let isReady = connectorInfo.connector.ready;
  let { name, installed } = wallet;
  console.log("isReady", isReady);
</script>

<div>
  <div>name: {name}</div>
  <div>installed: {!!installed}</div>

  {#if isReady}
    <button on:click={() => connect({ connector: connectorInfo.connector })}
      >connect</button
    >
  {:else}
    <div>ready: {!!isReady + ""}</div>
  {/if}
</div>
