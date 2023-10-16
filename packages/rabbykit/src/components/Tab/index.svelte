<script lang="ts">
  import WalletButton from "../WalletButton/index.svelte";
  import { _ as t } from "svelte-i18n";
  import useStore from "../../store/context";
  import { isSupportBrowser } from "../../helpers/wallet";
  export let active: "browser" | "mobile";
  export let onChange: (tab: "browser" | "mobile") => void;

  let detected = true;

  const list = $useStore.wallets || [];

  const browserList = list.filter((w) => isSupportBrowser(w));
  const mobileList = list.filter((w) => !!w.connector?.qrCode?.getUri);

  const readyBrowserList = browserList.filter(
    (w) => w.installed && !!w.connector.browser?.ready
  );

  const unusedBrowserList = browserList.filter(
    (w) => !w.installed || !w.connector.browser?.ready
  );

  if (!readyBrowserList.length) {
    detected = false;
  }
</script>

<div class="scroll">
  <div class="container">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="item"
      class:active={active === "browser"}
      on:click={() => {
        onChange("browser");
      }}
    >
      {$t("Browser Wallet")}
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="item"
      class:active={active === "mobile"}
      on:click={() => {
        onChange("mobile");
      }}
    >
      {$t("Mobile Wallet")}
    </div>
  </div>

  {#if active === "browser"}
    {#if detected}
      <div class="wallet-container" style="margin-bottom:32px">
        {#each readyBrowserList as wallet}
          <WalletButton className="wallet" {wallet} type="browser" />
        {/each}
      </div>
      <div class="sub-title">
        {$t(
          "The following wallets are not installed or in conflict with others"
        )}
      </div>
      <div class="wallet-container">
        {#each unusedBrowserList as wallet}
          <WalletButton className="wallet" {wallet} type="unused" />
        {/each}
      </div>
    {:else}
      <div class="sub-title">
        {$t(
          "No wallet found. The following wallets are not installed or in conflict with others"
        )}
      </div>
      <div class="wallet-container">
        {#each browserList as wallet}
          <WalletButton className="wallet" {wallet} type="unused" />
        {/each}
      </div>
    {/if}
  {:else}
    <div class="sub-title">{$t("Scan with mobile wallets to connect")}</div>
    <div class="wallet-container">
      {#each mobileList as wallet}
        <WalletButton className="wallet" {wallet} type="mobile" />
      {/each}
    </div>
  {/if}

  <div class="rk-tip">{$t("Powered by RabbyKit")}</div>
</div>

<style lang="scss">
  .scroll {
    height: 100%;
    max-height: 100%;
    margin: 0 -20px;
    padding-left: 20px;
    overflow: auto;
  }
  .container {
    background: var(--r-neutral-bg-2);
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    margin: 0 0 0 -20px;
    padding-left: 20px;
    gap: 20px;
    margin-bottom: 20px;
  }
  .item {
    color: var(--r-neutral-body);
    font-family: SF Pro;
    font-size: 15px;
    font-style: normal;
    font-weight: 510;
    line-height: normal;
    padding-bottom: 4px;
    cursor: pointer;
    &:not(.active):hover {
      color: var(--r-neutral-title-1);
    }

    &.active {
      color: var(--r-blue-default);
      position: relative;
      &::after {
        position: absolute;
        content: "";
        width: 100%;
        height: 2px;
        background: var(--r-blue-default);
        left: 0;
        bottom: 0;
      }
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
    color: var(--r-neutral-foot, #6a7587);
    font-family: SF Pro;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 12px;
  }
  .rk-tip {
    margin-top: 26px;
    margin-bottom: 20px;
    color: var(--r-neutral-foot, #6a7587);
    text-align: center;
    font-size: 12px;
  }
</style>
