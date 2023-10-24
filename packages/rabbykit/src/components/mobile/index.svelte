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
  let termsOfServiceUrl = $useStore.disclaimer?.term;
  let privacyPolicyUrl = $useStore.disclaimer?.privacy;
  let showDisclaimer = !!termsOfServiceUrl && !!privacyPolicyUrl;
</script>

<div class="container">
  <div class="title">{title}</div>
  {#if canConnect}
    <button on:click={handleConnect} style="margin-bottom: 16px;"
      >{$t("Connect x", { values: { name } })}</button
    >
    {#if showDisclaimer}
      <div class="desc">
        {@html $t("disclaimer", {
          values: { termsOfServiceUrl, privacyPolicyUrl },
        })}
      </div>
    {/if}
  {:else}
    <div class="desc" style="margin-bottom: 16px;">
      {$t("unsupported mobile env")}
    </div>
    <button on:click={copyDappUrl}>{$t("Copy Dapp URL")}</button>
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
    :global(a) {
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
