<script lang="ts">
  import { _ as t } from "svelte-i18n";
  import QrCode from "./QRCode.svelte";
  import { onMount } from "svelte";
  import { useRKStore } from "../../store";
  import Icon from "../Icon/Icon.svelte";

  export let logo: string;
  export let uri: string;
  export let name: string;
  export let size: number = 280;

  let success = false;

  onMount(() => {
    useRKStore.setState({ page: "connect" });
  });

  function copy() {
    navigator.clipboard.writeText(uri);
  }
</script>

<div class="container">
  <div class="title">
    {$t("Connect with", { values: { name } })}
  </div>

  <section>
    <div class="qr-code">
      <QrCode {logo} {uri} {size} {success} />
    </div>

    {#if success}
      <div class="tip success">{$t("Connection Successful")}</div>
    {:else}
      <div class="tip">{$t("Scan with your Mobile wallet")}</div>
      <button class="desc" on:click={copy}>
        <Icon name={"copy"} hover={false} />
        <span>
          {$t("Copy URL")}
        </span>
      </button>
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
      font-family: SF Pro;
      font-size: 20px;
      font-style: normal;
      font-weight: 590;
      line-height: normal;
      margin-bottom: 25px;
      &.success {
        color: var(--r-green-default, #2abb7f);
      }
    }

    .desc {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      color: var(--r-neutral-body, #3e495e);
      text-align: center;
      font-family: SF Pro;
      font-size: 15px;
      font-style: normal;
      font-weight: 510;
      line-height: normal;
    }
  }
</style>
