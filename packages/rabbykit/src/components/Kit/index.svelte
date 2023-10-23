<script lang="ts">
  import svelteStore, { useRKStore } from "../../store/context";
  import Provider from "../Provider.svelte";
  import Modal from "../Modal/index.svelte";
  import Tab from "../Tab/index.svelte";
  import Mobile from "../mobile/index.svelte";

  import Connecting from "../Connect/connect.svelte";
  import Scan from "../Scan/index.svelte";
  import Install from "../Install/index.svelte";
  import Icon from "../CommonIcon/Icon.svelte";

  function back() {
    useRKStore.setState({
      page: "wallet",
      currentWallet: undefined,
    });
  }

  $: open = $svelteStore.open;
  $: currentWallet = $svelteStore.currentWallet;
  $: showSubPage =
    ["download", "connect"].includes($svelteStore.page) && !!currentWallet;
</script>

<Provider>
  {#if open}
    <Modal>
      <!-- <Tab /> -->
      <Mobile />
      <div class="sub-page" class:show={showSubPage}>
        <div class="back">
          <Icon name="back" on:click={back} />
        </div>
        {#if $svelteStore.page === "connect" && !!currentWallet}
          {#if $svelteStore.type === "browser"}
            <Connecting wallet={currentWallet} />
          {:else}
            <Scan wallet={currentWallet} />
          {/if}
        {:else if $svelteStore.page === "download" && !!currentWallet}
          <Install wallet={currentWallet} />
        {/if}
      </div>
    </Modal>
  {/if}
</Provider>

<style lang="scss">
  .sub-page {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: #fff;
    transform: translateX(100%);
    transition: transform 0.3s;
    padding: 20px;
    background: var(--r-neutral-bg-2);
    .back {
      position: absolute;
      transform: translateX(100%);
      top: 14px;
      left: 20px;
    }

    &.show {
      transform: translateX(0);
      .back {
        transform: translateX(0);
      }
    }
  }
</style>
