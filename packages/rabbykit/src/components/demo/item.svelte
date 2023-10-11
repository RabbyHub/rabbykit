<script lang="ts">
  import { connect } from "@wagmi/core";
  import { WalletResult } from "../../wallets/type";
  export let wallet: WalletResult;

  let connectorInfo = wallet.connector;
  let isReady = connectorInfo.browser && !!connectorInfo?.browser?.ready;
  let { name, installed } = wallet;
  console.log("isReady", isReady);
</script>

<div>
  <div>name: {name}</div>
  <div>installed: {!!installed}</div>

  {#if isReady}
    <button
      on:click={async () => {
        if (connectorInfo.browser) {
          connect({ connector: connectorInfo.browser });
        }
      }}>connect</button
    >
  {:else}
    <div>ready: {!!isReady + ""}</div>
  {/if}
</div>
