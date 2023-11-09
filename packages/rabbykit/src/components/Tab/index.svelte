<script lang="ts">
  import WalletButton from "../WalletButton/index.svelte";
  import Scroll from "../Common/Scroll.svelte";
  import { _ as t } from "svelte-i18n";
  import useStore, { useRKStore } from "../../store/context";
  import { isSupportBrowser } from "../../helpers/wallet";
  import Button from "../WalletButton/button.svelte";
  import scan from "./scan.svg";

  const browserList = $useStore.wallets || [];

  const readyBrowserList = browserList.filter(
    (w) => w.installed && !!w.connector.browser?.ready
  );

  const unusedBrowserList = browserList
    .filter((w) => !w.installed || !w.connector.browser?.ready)
    .filter((w) => isSupportBrowser(w))
    .filter((e) => !$useStore.mipd.some((p) => p.info.name === e.name));

  const handleScan = () => {
    useRKStore.setState({
      page: "wc-select",
    });
  };
</script>

<Scroll title={$t("Select your wallet to login")}>
  <div class="ready-wallet-container">
    {#each readyBrowserList as wallet}
      <WalletButton {wallet} type="browser" />
    {/each}

    {#if $useStore.showWalletConnect}
      <Button
        type="browser"
        name={$t("Connect with mobile  wallet")}
        logo={scan}
        on:click={handleScan}
      />
    {/if}

    {#if $useStore.customButtons && $useStore.customButtons.length > 0}
      {#each $useStore.customButtons as b}
        <Button
          type="browser"
          name={b.name}
          logo={b.logo}
          on:click={b.onClick}
        />
      {/each}
    {/if}
  </div>
  <div class="sub-title">
    {$t("The following wallets are not installed or in conflict with others")}
  </div>
  <div class="wallet-container">
    {#each unusedBrowserList as wallet}
      <WalletButton {wallet} type="unused" size="normal" />
    {/each}
  </div>

  <div class="rk-tip">{$t("Powered by RabbyKit")}</div>
</Scroll>

<style lang="scss">
  .ready-wallet-container {
    display: flex;
    flex-direction: column;
    padding-right: 20px;
    & > :global(button) {
      margin-bottom: 12px;
    }
    & > :global(button:last-child) {
      margin-bottom: 20px;
    }
  }

  .wallet-container {
    display: flex;
    flex-wrap: wrap;

    & > :global(button:nth-of-type(2n)) {
      margin-left: 8px;
    }
    & > :global(button:nth-of-type(n + 3)) {
      margin-top: 8px;
    }
  }

  .sub-title {
    color: var(--r-neutral-foot);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 12px;
  }
  .rk-tip {
    margin-top: 26px;
    margin-bottom: 20px;
    padding-right: 20px;
    color: var(--r-neutral-foot);
    text-align: center;
    font-size: 12px;
  }
</style>
