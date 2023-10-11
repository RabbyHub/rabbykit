<script lang="ts">
  import { _ as t } from "svelte-i18n";
  import useStore from "../../store/context";
  import { connect } from "@wagmi/core";
  import Provider from "../Provider.svelte";
  import Modal from "../Modal/index.svelte";
  import Tab from "../Tab/index.svelte";
  import Connecting from "../Connect/connect.svelte";
  import Scan from "../Scan/index.svelte";
  import Install from "../Install/index.svelte";

  $: open = $useStore.open;
  $: currentWallet = $useStore.currentWallet;
</script>

<Provider>
  {#if open}
    <Modal>
      {#if $useStore.page === "wallet"}
        <Tab active={$useStore.activeTab} onChange={$useStore.setTab} />
      {:else if $useStore.page === "connect" && !!currentWallet}
        {#if $useStore.type === "browser"}
          <Connecting wallet={currentWallet} />
        {:else}
          <Scan wallet={currentWallet} />
        {/if}
      {:else if $useStore.page === "download" && !!currentWallet}
        <Install wallet={currentWallet} />
      {/if}
    </Modal>
  {/if}
</Provider>
