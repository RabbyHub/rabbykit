<script lang="ts">
  import WalletButton from "../WalletButton/index.svelte";
  import Scroll from "../Common/Scroll.svelte";
  import { _ as t } from "svelte-i18n";
  import useStore, { useRKStore } from "../../store/context";
  import { isSupportBrowser } from "../../helpers/wallet";
  import Button from "../WalletButton/button.svelte";
  import scan from "./scan.svg";
  import { otherInjectedWalletId } from "../../wallets/connectors/injectedWallet/injectedWallet";

  let activeId = "";

  const browserList = $useStore.wallets || [];

  const readyBrowserList = browserList.filter(
    (w) =>
      w.installed &&
      !!w.connector.browser?.ready &&
      w.id !== otherInjectedWalletId
  );

  const unusedBrowserList = browserList
    .filter((w) => !w.installed || !w.connector.browser?.ready)
    .filter((w) => isSupportBrowser(w))
    .filter((e) => !$useStore.mipd.some((p) => p.info.name === e.name));

  const other = browserList.find((e) => e.id === otherInjectedWalletId);
  const showOtherWallet = !!(
    other &&
    other.installed &&
    other.connector.browser?.ready &&
    other.connector.browser?.name &&
    !browserList.some((e) => other.connector.browser?.name.includes(e.name))
  );

  const handleScan = () => {
    useRKStore.setState({
      page: "wc-select",
    });
  };
</script>

<div class="container">
  <Scroll title={$t("Select your wallet to login")} titleClass={"scroll-title"}>
    <div class="ready-wallet-container">
      {#each readyBrowserList as wallet}
        <WalletButton
          {wallet}
          type="browser"
          active={activeId === wallet.id}
          click={() => {
            activeId = wallet.id;
          }}
        />
      {/each}

      {#if other && showOtherWallet}
        <WalletButton
          wallet={other}
          type="browser"
          active={activeId === other.id}
          click={() => {
            activeId = other.id;
          }}
        />
      {/if}

      {#if $useStore.showWalletConnect}
        <Button
          type="browser"
          name={$t("Mobile Wallet")}
          logo={scan}
          on:click={() => {
            activeId = $t("Mobile Wallet");
            handleScan();
          }}
          active={activeId === $t("Mobile Wallet")}
        />
      {/if}

      {#if $useStore.customButtons && $useStore.customButtons.length > 0}
        {#each $useStore.customButtons as b}
          <Button
            type="browser"
            name={b.name}
            logo={b.logo}
            active={activeId === b.logo}
            on:click={() => {
              activeId = b.logo;
              b.onClick?.();
            }}
          />
        {/each}
      {/if}
    </div>
    <div class="sub-title">
      {$t("The following wallets are not installed or in conflict with others")}
    </div>
    <div class="wallet-container">
      {#each unusedBrowserList as wallet}
        <WalletButton
          {wallet}
          type="unused"
          size="normal"
          active={activeId === wallet.id}
          click={() => {
            activeId = wallet.id;
          }}
        />
      {/each}
    </div>
  </Scroll>
</div>

<style lang="scss">
  .container {
    height: 100%;
    & :global(.scroll-title) {
      margin-left: -20px;
      padding-left: 20px;
      text-align: left;
    }
  }

  .ready-wallet-container {
    display: flex;
    flex-direction: column;
    padding-right: 20px;
    & > :global(button) {
      margin-bottom: 10px;
    }
    & > :global(button:last-child) {
      margin-bottom: 20px;
    }
  }

  .wallet-container {
    display: flex;
    flex-direction: column;
    padding-right: 20px;
    & > :global(button) {
      margin-bottom: 10px;
    }
    & > :global(button:last-child) {
      margin-bottom: 20px;
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
</style>
