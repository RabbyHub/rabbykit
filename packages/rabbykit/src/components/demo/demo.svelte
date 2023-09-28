<script lang="ts">
  import { _ as t } from "svelte-i18n";
  import useStore from "../../store/context";
  import { connect } from "@wagmi/core";
  import Item from "./item.svelte";
</script>

<h2>{$t("hello")}</h2>

<div>
  {#if $useStore.isConnected}
    <div class="container">
      <div>isConnected: {$useStore.isConnected}</div>
      <div>address: {$useStore.address}</div>
      <div />
    </div>
  {:else}
    <div class="container">
      {#if $useStore.wallets}
        {#each $useStore.wallets as wallet}
          <Item {wallet} />
        {/each}
      {/if}
    </div>
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
