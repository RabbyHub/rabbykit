<script lang="ts">
  import { _ as t } from "svelte-i18n";
  import QrCode from "./QRCode.svelte";
  import { onMount } from "svelte";
  import Icon from "../CommonIcon/Icon.svelte";
  import Copy from "../Copy/index.svelte";
  import { WalletResult } from "../../wallets/type";
  import svelteStore, { rabbykitConnect } from "../../store/context";
  import { disconnect, getAccount } from "@wagmi/core";

  export let wallet: WalletResult;
  export let size: number = 280;

  let uri = "loading";
  let loading = true;
  let shouldWaitDisconnect = false;

  async function handleConnect() {
    if (getAccount()?.isConnected) {
      shouldWaitDisconnect = true;
      await disconnect();
      shouldWaitDisconnect = false;
    }
    const connector =
      wallet.connector?.qrCode?.connector || wallet.connector?.browser;

    if (connector) {
      rabbykitConnect({
        connector: connector,
      });

      await getUri();
    }
  }

  async function getUri() {
    try {
      loading = true;
      const code = await wallet.connector.qrCode?.getUri?.();
      if (code) {
        uri = code;
        loading = false;
        refreshLoading = false;
        success = false;
        failed = false;
      }
    } catch (error) {
      console.error("getUri() error:", error);
      success = false;
      failed = true;
      loading = false;
    }
  }

  const logo = wallet.logo;
  const name: string = wallet.name;

  let refreshLoading = false;
  let success = false;
  let failed = false;

  onMount(() => {
    handleConnect();
  });

  async function refresh() {
    const connector =
      wallet.connector?.qrCode?.connector || wallet.connector?.browser;
    if (connector) {
      refreshLoading = true;
      rabbykitConnect({ connector });
      await getUri();
    }
  }

  $: {
    if (!shouldWaitDisconnect) {
      if (["connecting", "reconnecting"].includes($svelteStore.status)) {
        success = false;
        failed = false;
      }
      if ($svelteStore.status === "connected") {
        success = true;
        failed = false;
      }

      if ($svelteStore.status === "disconnected") {
        failed = true;
        success = false;
      }

      if (success) {
        setTimeout(() => {
          $svelteStore.closeModal();
        }, 500);
      }
    }
  }
</script>

<div class="container">
  <div class="title">
    {$t("Connect with", { values: { name } })}
  </div>

  <section>
    <div class="qr-code">
      <QrCode {logo} uri={uri || ""} {size} {success} {failed} {loading} />
    </div>
    {#if failed}
      <div class="tip failed">{$t("Request canceled")}</div>
      <button class="desc" on:click={() => refresh()}>
        <div class:loading={refreshLoading}>
          <Icon name={"refresh"} hover={false} />
        </div>
        <span>
          {$t("Refresh QRCode")}
        </span>
      </button>
    {:else if success}
      <div class="tip success">{$t("Connection Successful")}</div>
    {:else}
      <div class="tip">{$t("Scan with your Mobile wallet")}</div>
      <Copy copyText={uri} disable={failed || loading} />
    {/if}
  </section>
</div>

<style lang="scss">
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      color: var(--r-neutral-title-1, #192945);
      text-align: center;
      font-size: 18px;
      font-weight: 510;
    }

    section {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .qr-code {
      margin-top: 60px;
      margin-bottom: 24px;
    }

    .tip {
      color: var(--r-neutral-title-1, #192945);
      text-align: center;
      font-size: 20px;
      font-style: normal;
      font-weight: 590;
      line-height: normal;
      margin-bottom: 25px;
      &.success {
        color: var(--r-green-default, #2abb7f);
      }
      &.failed {
        color: var(--r-red-default, #e34935);
      }
    }

    .desc {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      color: var(--r-neutral-body, #3e495e);
      text-align: center;
      font-size: 15px;
      font-style: normal;
      font-weight: 510;
      line-height: normal;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .loading {
      animation: spin 1s linear infinite;
    }
  }
</style>
