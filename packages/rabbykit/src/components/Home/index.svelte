<script lang="ts">
  import Image from "../Image/index.svelte";
  import PoweredBy from "../PoweredBy/index.svelte";
  import { _ as t } from "svelte-i18n";

  import svelteStore from "../../store/context";
  import logo from "../../wallets/connectors/rabbyWallet/logo.svg";
</script>

<div class="content">
  <div class="app-logo">
    <Image
      src={$svelteStore.appLogo || logo}
      alt={$svelteStore.appName + " logo"}
    />
  </div>

  <div class="title">
    {$t("Connect your wallet with", {
      values: {
        name: $svelteStore.appName,
      },
    })}
  </div>
  <div class="desc">
    {$t("connect tip")}
  </div>
  <div class="powerBy">
    <PoweredBy />
  </div>
</div>

<style lang="scss">
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    .app-logo {
      width: 84px;
      height: 84px;
      border-radius: 8px;
      overflow: hidden;
    }

    .title {
      color: var(--r-neutral-title-1, #192945);
      text-align: center;
      font-family: "SF Pro";
      font-size: 22px;
      font-style: normal;
      font-weight: 590;
      line-height: normal;
      margin-top: 44px;
      margin-bottom: 15px;
    }

    .desc {
      color: var(--r-neutral-body, #3e495e);
      text-align: center;
      font-family: "SF Pro";
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 146.667% */
      max-width: 400px;
    }

    .powerBy {
      position: absolute;
      left: 0;
      bottom: 24px;
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
</style>
