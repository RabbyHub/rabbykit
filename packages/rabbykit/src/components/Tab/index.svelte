<script lang="ts">
  import { _ as t } from "svelte-i18n";
  export let active: "browser" | "mobile";

  let detected = true;
</script>

<div>
  <div class="container">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="item"
      class:active={active === "browser"}
      on:click={() => {
        active = "browser";
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
        active = "mobile";
      }}
    >
      {$t("Mobile Wallet")}
    </div>
  </div>

  {#if active === "browser"}
    <div />

    {#if detected}
      <div />
      <div>以下钱包未安装或与其他钱包冲突</div>
    {:else}
      <div>尚未发现任何钱包, 以下钱包未安装或与其他钱包冲突</div>
    {/if}
  {/if}
</div>

<style lang="scss">
  .container {
    display: flex;
    gap: 20px;
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
</style>
