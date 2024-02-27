<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { useRKStore } from "../../store";
  import useStore from "../../store/context";
  import Icon from "../CommonIcon/Icon.svelte";
  import { fade } from "svelte/transition";
  import { isMobile } from "../../helpers/browser";
  import { lockScroll } from "../../helpers";

  let isManualOperation = false;

  function close() {
    useRKStore.getState().closeModal();
    isManualOperation = true;
  }

  let { lock, unlock } = lockScroll();

  function resize() {
    useRKStore.setState({ isMobile: isMobile() });
  }

  onMount(() => {
    resize();
    window.addEventListener("resize", resize);
    lock();
  });

  onDestroy(() => {
    window.removeEventListener("resize", resize);
    unlock();

    useRKStore.setState({
      page: "wallet",
      currentWallet: undefined,
    });
  });

  function outroend() {
    if (isManualOperation) {
      useRKStore
        .getState()
        .openHooks?.forEach((e) => e?.onModalClosedByManualOperation?.());
      useRKStore.getState().configHook?.onModalClosedByManualOperation?.();
      isManualOperation = false;
    }

    $useStore.openHooks?.forEach((e) => e?.onModalClosed?.());
    $useStore.configHook?.onModalClosed?.();
    useRKStore.setState({
      openHooks: [],
    });
  }

  $: isMobileEnv = !!$useStore.isMobile;
</script>

<div class="modal" transition:fade={{ duration: 100 }} on:outroend={outroend}>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="modal-overlay" class:mobile={isMobileEnv} on:click={close} />
  <div class="modal-content" class:mobile={isMobileEnv}>
    <div class="icon" class:close>
      <Icon name="close" on:click={close} />
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
    --fallback-modal-border-radius: 16px;
    --fallback-modal-box-shadow: 0px 24px 80px 0px rgba(0, 0, 0, 0.2);

    width: 780px;
    height: 540px;
    /* padding: 20px; */
    padding-bottom: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: var(--rk-border-radius, var(--fallback-modal-border-radius));
    background: var(--rk-modal-bg, var(--r-neutral-bg-2));
    box-shadow: var(--rk-modal-box-shadow, var(--fallback-modal-box-shadow));
    overflow: hidden;

    &.mobile {
      --fallback-modal-box-shadow: 0px -8px 8px 0px rgba(0, 0, 0, 0.08);

      padding: 0;
      width: 100vw;
      max-width: 100vw;
      height: auto;
      top: initial;
      left: 0;
      bottom: 0;
      transform: translateZ(0);
      background: var(--rk-modal-bg, var(--r-neutral-bg-1));
      box-shadow: var(--rk-modal-box-shadow, var(--fallback-modal-box-shadow));
      border-radius: var(
          --rk-border-radius,
          var(--fallback-modal-border-radius)
        )
        var(--rk-border-radius, var(--fallback-modal-border-radius)) 0px 0px;

      .close {
        top: 13px;
        right: 6px;
      }
    }
  }

  .icon {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 20;
  }
  .close {
    top: 16px;
  }

  .modal-overlay {
    --fallback-overlay-bg: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--rk-overlay-bg, var(--fallback-overlay-bg));
    &.mobile {
      --fallback-overlay-bg: rgba(0, 0, 0, 0.4);
      background: var(--rk-overlay-bg, var(--fallback-overlay-bg));
    }
  }
</style>
