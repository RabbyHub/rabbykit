<script lang="ts">
  import { _ as t } from "svelte-i18n";
  import useStore from "../../store/context";
  import { connect } from "@wagmi/core";
  import Item from "./item.svelte";
  import Button from "../WalletButton/index.svelte";
  import Provider from "../Provider.svelte";
  import Modal from "../Modal/index.svelte";
  import Tab from "../Tab/index.svelte";
  import Icon from "../Icon/Icon.svelte";
  import Connecting from "../Connect/connect.svelte";
  import Scan from "../Scan/index.svelte";
  import Install from "../Install/index.svelte";

  let active: "browser" | "mobile" = "browser";
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
      <!-- <Tab bind:active /> -->
      <!-- <Connecting name="Rabby Wallet" logo={"https://placehold.co/80x80/png"} /> -->
      <!-- <Scan
        logo={"https://placehold.co/80x80/png"}
        name="Rabby Wallet"
        uri="wc:ea969fd076856c90f6f2049d779c62bd6a6dbdbbcfeb4eefbcfad89573e3f75d@2?relay-protocol=irn&symKey=ed66b427f2ab2a28317ddca455bcab894b76c267bc3a628f6bd609defa782987"
      /> -->

      <Install name="MetaMask" uri="MetaMask" />
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
