<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { useRKStore } from "../../store";
  import useStore from "../../store/context";
  import Icon from "../CommonIcon/Icon.svelte";
  import { fade } from "svelte/transition";
  import { isMobile } from "../../helpers/browser";

  function close() {
    useRKStore.getState().closeModal();
  }

  const html = document.documentElement;

  let htmlStyleCache: Record<string, string> = {};
  onMount(() => {
    htmlStyleCache.position = html.style.position;
    htmlStyleCache.overflow = html.style.overflow;

    html.style.position = "sticky";
    html.style.overflow = "hidden";
  });

  onDestroy(() => {
    html.style.position = htmlStyleCache.position;
    if (htmlStyleCache.overflow) {
      html.style.overflow = htmlStyleCache.overflow;
    } else {
      html.style.removeProperty("overflow");
    }
    useRKStore.setState({
      page: "wallet",
      currentWallet: undefined,
    });
  });
  let isMobileEnv = isMobile();
</script>

<div class="modal" transition:fade={{ duration: 100 }}>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="modal-overlay" class:mobile={isMobileEnv} on:click={close} />
  <div class="modal-content" class:mobile={isMobileEnv}>
    <div class="icon" class:close={$useStore.page === "wallet"}>
      {#if $useStore.page === "wallet"}
        <Icon name="close" on:click={close} />
      {:else}
        <!-- <Icon name="back" on:click={back} /> -->
      {/if}
    </div>
    <slot />
  </div>
</div>

<style lang="scss">
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    z-index: var(--rk-modal-index);
  }

  .modal-content {
    width: 460px;
    height: 540px;
    padding: 20px;
    padding-bottom: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 16px;
    background: var(--r-neutral-bg-2);
    box-shadow: 0px 24px 80px 0px rgba(0, 0, 0, 0.2);
    overflow: hidden;

    &.mobile {
      width: 100vw;
      max-width: 100vw;
      height: auto;
      top: initial;
      left: 0;
      bottom: 0;
      transform: translateZ(0);
      background: var(--r-neutral-bg-1);
      box-shadow: 0px -8px 8px 0px rgba(0, 0, 0, 0.08);
      border-radius: 16px 16px 0px 0px;
    }
  }

  .icon {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 2;
  }
  .close {
    top: 16px;
  }

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    &.mobile {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
</style>
