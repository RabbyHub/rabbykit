<script lang="ts">
  import { _ as t } from "svelte-i18n";

  import svelteStore from "../../store/context";
  import Scroll from "../Common/Scroll.svelte";
  import WalletButton from "../WalletButton/index.svelte";

  const walletConnectList =
    $svelteStore.wallets?.filter((e) => !!e.connector.qrCode?.connector) || [];
</script>

<Scroll className={"mobile-container"} title={$t("Connect with Mobile Wallet")}>
  <div class="wallet-container">
    {#each walletConnectList as wallet}
      <WalletButton {wallet} type="mobile" size="sm" />
    {/each}
  </div>
</Scroll>

<style lang="scss">
  :global(.mobile-container.scroll) {
    --mobile-h: 335px;
    height: var(--mobile-h) !important;

    height: 335px !important;
    height: calc(var(--mobile-h) + env(safe-area-inset-bottom)) !important;
  }

  .wallet-container {
    display: flex;
    flex-wrap: wrap;
    padding: 18px 12px;
    & > :global(button) {
      width: calc((100vw - 36px) / 2) !important;
    }
    & > :global(button:nth-of-type(2n)) {
      margin-left: 12px;
    }
    & > :global(button:nth-of-type(n + 3)) {
      margin-top: 12px;
    }
  }
</style>
