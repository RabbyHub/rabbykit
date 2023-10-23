<script lang="ts">
  import { isSupportBrowser } from "../../helpers/wallet";
  import { _ as t } from "svelte-i18n";

  import useStore from "../../store/context";
  import { connect } from "@wagmi/core";

  const list = $useStore.wallets || [];
  const browserList = list.filter((w) => isSupportBrowser(w));

  const readyBrowserList = browserList.filter(
    (w) => w.installed && !!w.connector.browser?.ready
  );

  let isConnecting = false;

  function copyDappUrl() {
    window.navigator.clipboard.writeText(window.location.href);
  }

  function handleConnect() {
    if (isConnecting) return;
    isConnecting = true;
    if (readyBrowserList[0].connector.browser) {
      connect({ connector: readyBrowserList[0].connector.browser! })
        .then((e) => {
          $useStore.closeModal();
        })
        .finally(() => {
          isConnecting = false;
        });
    }
  }

  let canConnect = readyBrowserList.length > 0;

  let title = canConnect
    ? $t("Connect Wallet")
    : $t("Unable to Connect Wallet");
  let name =
    readyBrowserList?.[0]?.mobileName || readyBrowserList?.[0]?.name || "";
  let url1 = "";
  let url2 = "";
</script>

<div class="container">
  <div class="title">{title}</div>
  {#if canConnect}
    <button on:click={handleConnect} style="margin-bottom: 16px;"
      >connect {name}</button
    >
    <div class="desc">
      By connecting your wallet you agree to the <a href={url1} target="_blank"
        >Terms of Service</a
      >
      and <a href={url2}>Privacy Policy</a>
    </div>
  {:else}
    <div class="desc" style="margin-bottom: 16px;">
      当前网页环境Dapp无法连接钱包，你可以在电脑或手机钱包中打开并体验完整功能
    </div>
    <button on:click={copyDappUrl}>Copy Dapp URL</button>
  {/if}
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 148px;
  }
  .title {
    color: var(--r-neutral-title-1);
    text-align: center;
    font-size: 18px;
    font-weight: 510;
    margin-bottom: 16px;
  }

  .desc {
    color: var(--r-neutral-foot);
    text-align: center;
    font-size: 13px;
    font-weight: 400;
    a {
      color: var(--r-neutral-body);
    }
  }

  button {
    border-radius: 6px;
    background: var(--r-blue-default);
    color: var(--r-neutral-title-2);
    box-shadow: 0px 2px 8px 0px rgba(112, 132, 255, 0.19);
    display: inline-flex;
    width: 302px;
    height: 48px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
</style>
