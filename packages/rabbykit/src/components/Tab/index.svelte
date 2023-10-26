<script lang="ts">
  import WalletButton from "../WalletButton/index.svelte";
  import { _ as t } from "svelte-i18n";
  import useStore, { useRKStore } from "../../store/context";
  import { isSupportBrowser } from "../../helpers/wallet";
  import Button from "../WalletButton/button.svelte";
  import scan from "./scan.svg";
  import {
    commonWalletConnect,
    getWalletConnectUri,
  } from "../../helpers/getWalletConnectUri";
  import logo from "./walletConnect.svg";
  import { WalletResult } from "../../wallets/type";
  import { InjectedConnector, WindowProvider, getConfig } from "@wagmi/core";

  const list = $useStore.wallets || [];

  const browserList = list.filter((w) => isSupportBrowser(w));

  const readyBrowserList = browserList.filter(
    (w) => w.installed && !!w.connector.browser?.ready
  );

  const unusedBrowserList = browserList
    .filter((w) => !w.installed || !w.connector.browser?.ready)
    .filter((e) => !$useStore.mipd.some((p) => p.info.name === e.name));

  let otherEip6963Providers: WalletResult[] = $useStore.mipd
    .filter((p) => {
      if (readyBrowserList.some((r) => r.name === p.info.name)) {
        return false;
      }
      return true;
    })
    .map((e) => ({
      id: e.info.rdns,
      name: e.info.name,
      logo: e.info.icon,
      connector: {
        browser: new InjectedConnector({
          chains: getConfig().chains,
          options: { getProvider: () => e.provider as WindowProvider },
        }),
      },
    }));

  const handleScan = () => {
    useRKStore.setState({
      page: "connect",
      currentWallet: {
        id: "walletConnect",
        logo,
        name: "Mobile Wallet",
        connector: {
          qrCode: {
            getUri: () => getWalletConnectUri(commonWalletConnect!),
            connector: commonWalletConnect,
          },
        },
      },
      type: "mobile",
      status: "connecting",
    });
  };

  let box: HTMLDivElement;
  let scrollTop: number;
</script>

<div
  class="scroll"
  bind:this={box}
  on:scroll={() => {
    scrollTop = box.scrollTop;
  }}
>
  <div class="title" class:borderB={scrollTop > 0}>
    Select your wallet to login
  </div>
  <div class="ready-wallet-container">
    {#each readyBrowserList as wallet}
      <WalletButton {wallet} type="browser" />
    {/each}

    {#each otherEip6963Providers as wallet}
      <WalletButton {wallet} type="browser" />
    {/each}

    <Button
      type="browser"
      name={"Scan with Mobile Wallet"}
      logo={scan}
      on:click={handleScan}
    />
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
</div>

<style lang="scss">
  .title {
    background: var(--r-neutral-bg-2);
    position: sticky;
    top: 0;
    left: 0;
    margin: 0 0 0 -20px;
    padding: 0 20px;
    padding-bottom: 16px;
    color: var(--r-neutral-title-1);
    text-align: center;
    font-size: 18px;
    font-weight: 510;
    border-bottom: 0.5px solid transparent;
    &.borderB {
      border-bottom: 0.5px solid var(--r-neutral-line);
    }
  }
  .scroll {
    height: 100%;
    max-height: 100%;
    margin: 0 -20px;
    padding-left: 20px;
    overflow: auto;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
  }

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
