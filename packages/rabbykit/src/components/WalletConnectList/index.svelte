<script lang="ts">
  import { _ as t } from "svelte-i18n";
  import WalletButton from "../WalletButton/index.svelte";
  import Scroll from "../Common/Scroll.svelte";

  import svelteStore from "../../store/context";
  const walletConnectList =
    $svelteStore.wallets?.filter((e) => !!e.connector.qrCode?.connector) || [];
</script>

<Scroll title={$t("Select your Mobile Wallet")}>
  <div class="wallet-container">
    {#each walletConnectList as wallet}
      <WalletButton {wallet} type="mobile" />
    {/each}
    {#each walletConnectList as wallet}
      <WalletButton {wallet} type="mobile" />
    {/each}
  </div>
</Scroll>

<style lang="scss">
  .wallet-container {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;

    & > :global(button:nth-of-type(2n)) {
      margin-left: 8px;
    }
    & > :global(button:nth-of-type(n + 3)) {
      margin-top: 8px;
    }
  }
</style>
