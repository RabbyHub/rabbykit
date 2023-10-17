<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { useRKStore } from "../../store";
  import useStore from "../../store/context";
  import Icon from "../CommonIcon/Icon.svelte";

  function close() {
    useRKStore.getState().closeModal();
  }

  // function back() {
  //   useRKStore.setState({
  //     page: "wallet",
  //     currentWallet: undefined,
  //   });
  // }

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
</script>

<div class="modal">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="modal-overlay" on:click={close} />
  <div class="modal-content">
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

<style>
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
  .back {
    right: initial;
    top: 14px;
    left: 14px;
  }

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
