<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { useRKStore } from "../../store";

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
  });
</script>

<div class="modal">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="modal-overlay" on:click={close} />
  <div class="modal-content">
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 16px;
    background: var(--r-neutral-bg-2, #f2f4f7);
    box-shadow: 0px 24px 80px 0px rgba(0, 0, 0, 0.2);
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
