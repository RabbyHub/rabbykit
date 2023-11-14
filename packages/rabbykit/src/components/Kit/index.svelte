<script lang="ts">
  import svelteStore, { useRKStore } from "../../store/context";
  import Provider from "../Provider.svelte";
  import Modal from "../Modal/index.svelte";
  import Tab from "../Tab/index.svelte";
  import Mobile from "../mobile/index.svelte";
  import InMobileApp from "../mobile/InMobileApp.svelte";

  import Card from "../Modal/Card.svelte";

  import Connecting from "../Connect/connect.svelte";
  import Scan from "../Scan/index.svelte";
  import Install from "../Install/index.svelte";
  import WalletConnectList from "../WalletConnectList/index.svelte";
  import { isMobile } from "../../helpers/browser";

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
  let isMobileEnv = isMobile();
  let detectWindowEthereum = !!window?.ethereum;

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
        <Tab />

        <Card show={isQrCodePage} {back}>
          <WalletConnectList />
        </Card>

        <Card
          show={$svelteStore.page === "connect" &&
            !!currentWallet &&
            $svelteStore.type === "qrCode"}
          back={backWcList}
        >
          {#if !!currentWallet}
            <Scan wallet={currentWallet} />
          {/if}
        </Card>

        <Card show={showOtherSubPage && !isQrCodePage} {back}>
          {#if $svelteStore.page === "connect" && !!currentWallet}
            {#if $svelteStore.type === "browser"}
              <Connecting wallet={currentWallet} />
            {/if}
          {:else if $svelteStore.page === "download" && !!currentWallet}
            <Install wallet={currentWallet} />
          {/if}
        </Card>
      {/if}
    </Modal>
  {/if}
</Provider>
