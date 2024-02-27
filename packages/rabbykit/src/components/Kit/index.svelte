<script lang="ts">
  import svelteStore, { useRKStore } from "../../store/context";
  import Provider from "../Provider.svelte";
  import Modal from "../Modal/index.svelte";
  import Tab from "../Tab/index.svelte";
  import Mobile from "../mobile/index.svelte";
  import InMobileApp from "../mobile/InWalletBrowser.svelte";

  import Card from "../Modal/Card.svelte";
  import Home from "../Home/index.svelte";

  import Connecting from "../Connect/connect.svelte";
  import Scan from "../Scan/index.svelte";
  import Install from "../Install/index.svelte";
  import WalletConnectList from "../WalletConnectList/index.svelte";

  function back() {
    useRKStore.setState({
      page: "wallet",
      currentWallet: undefined,
    });
  }
  function backWcList() {
    useRKStore.setState({
      page: "wc-select",
      currentWallet: undefined,
    });
  }

  $: isMobileEnv = $svelteStore.isMobile;
  $: detectWindowEthereum = !!window?.ethereum;
  $: open = $svelteStore.open;
  $: currentWallet = $svelteStore.currentWallet;
  $: isQrCodePage =
    $svelteStore.page === "wc-select" ||
    ($svelteStore.page === "connect" &&
      !!$svelteStore.currentWallet &&
      $svelteStore.type === "qrCode");
  $: showOtherSubPage = ["connect", "download"].includes($svelteStore.page);
</script>

<Provider>
  {#if open}
    <Modal>
      {#if isMobileEnv}
        {#if detectWindowEthereum}
          <InMobileApp />
        {:else}
          <Mobile />
        {/if}
      {:else}
        <div class="body">
          <div class="sidebar">
            <Tab />
          </div>

          <Home />

          <Card show={isQrCodePage} {back} animation={false}>
            <WalletConnectList />
          </Card>

          <Card
            show={$svelteStore.page === "connect" &&
              !!currentWallet &&
              $svelteStore.type === "qrCode"}
            back={backWcList}
            showBack
          >
            {#if !!currentWallet}
              <Scan wallet={currentWallet} />
            {/if}
          </Card>

          <Card show={showOtherSubPage && !isQrCodePage} {back}>
            {#if $svelteStore.page === "connect" && !!currentWallet}
              {#if $svelteStore.type === "browser"}
                {#key currentWallet.id}
                  <Connecting wallet={currentWallet} />
                {/key}
              {/if}
            {:else if $svelteStore.page === "download" && !!currentWallet}
              {#key currentWallet.id}
                <Install wallet={currentWallet} />
              {/key}
            {/if}
          </Card>
        </div>
      {/if}
    </Modal>
  {/if}
</Provider>

<style lang="scss">
  .body {
    display: flex;
    height: 100%;
  }
  .sidebar {
    width: 300px;
    height: 100%;
    position: relative;
    padding: 20px;
    padding-bottom: 0;

    &::after {
      position: absolute;
      content: "";
      height: 100%;
      width: 0;
      border-right: 0.5px solid var(--r-neutral-line, #d3d8e0);
      top: 0;
      right: 0;
      z-index: 10;
    }
  }
</style>
