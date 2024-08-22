<script lang="ts">
  import WalletButton from "../WalletButton/index.svelte";
  import Scroll from "../Common/Scroll.svelte";
  import { _ as t } from "svelte-i18n";
  import useStore, { useRKStore } from "../../store/context";
  import { isSupportBrowser } from "../../helpers/wallet";
  import Button from "../WalletButton/button.svelte";
  import scan from "./scan.svg";
  import { otherInjectedWalletId } from "../../wallets/connectors/injectedWallet/injectedWallet";
  import { Connector } from "wagmi";
  import { WalletResult } from "../../wallets/type";

  let activeId = "";

  const browserList = $useStore.wallets || [];

  let readyBrowserList = browserList.filter(
    (w) => w.installed && w.id !== otherInjectedWalletId
  );

  const isEIP6963Connector = (c: Connector) => {
    return (
      c.icon?.replace(/\n/g, "").startsWith("data:image") && c.name && c.uid
    );
  };

  const eip6963Connectors = (useRKStore.getState().wagmi?.connectors || [])
    .filter((c) => isEIP6963Connector(c))
    .map((e) => {
      const builtInWalletInfo = readyBrowserList.find(
        (item) => item.rdns === e.id
      );

      return {
        id: e.uid,
        name: e.name,
        ...(builtInWalletInfo || {}),
        logo: e.icon,
        rdns: e.id,
        installed: true,
        connector: {
          browser: () => e,
        },
      } as WalletResult;
    });

  readyBrowserList = readyBrowserList.filter(
    (e) => !eip6963Connectors.some((c) => c.rdns === e.rdns)
  );

  readyBrowserList = [...readyBrowserList, ...eip6963Connectors].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const unusedBrowserList = browserList
    .filter((w) => !w.installed)
    .filter((w) => isSupportBrowser(w))
    .filter(
      (e) =>
        !readyBrowserList.some((p) => p.name === e.name || p.rdns === e.rdns)
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const other = browserList.find((e) => e.id === otherInjectedWalletId);
  const showOtherWallet = !!(
    other &&
    other.installed &&
    readyBrowserList.length < 1
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
