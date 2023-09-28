<script lang="ts">
  import { _ as t } from "svelte-i18n";
  import useStore from "../../store/context";
  import { connect } from "@wagmi/core";
  import Item from "./item.svelte";
  import Button from "../WalletButton/index.svelte";
  import Provider from "../Provider.svelte";
  import Modal from "../Modal/index.svelte";
</script>

<Provider>
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
            <Button {wallet} />
          {/each}
        {/if}
      </div>
    {/if}
  </div>

  <button on:click={$useStore.openModal}> open modal </button>

  {#if $useStore.open}
    <Modal>
      <span>modal content</span>
    </Modal>
  {/if}
</Provider>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
