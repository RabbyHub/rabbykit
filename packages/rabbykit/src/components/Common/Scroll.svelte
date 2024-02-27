<script lang="ts">
  import svelteStore from "../../store/context";

  export let title: string;
  export let titleClass = "";
  export let className = "";

  let box: HTMLDivElement;
  let scrollTop: number;
</script>

<div
  class={`scroll ${className}`}
  class:mobile={$svelteStore.isMobile}
  bind:this={box}
  on:scroll={() => {
    scrollTop = box.scrollTop;
  }}
>
  {#if title}
    <div
      class={`title ${titleClass}`}
      class:mobile={$svelteStore.isMobile}
      class:borderB={scrollTop > 0}
    >
      {title}
    </div>
  {/if}
  <slot />
</div>

<style lang="scss">
  .scroll {
    height: 100%;
    max-height: 100%;
    margin: 0 -20px;
    padding-left: 20px;
    overflow: auto;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }

    &.mobile {
      padding-top: 0;
      margin: 0;
      padding: 0;
    }
  }

  .title {
    position: sticky;
    top: 0;
    margin-left: -20px;
    padding: 0 20px;
    padding-bottom: 16px;
    color: var(--r-neutral-title-1);
    text-align: center;
    font-size: 18px;
    font-weight: 510;
    border-bottom: 0.5px solid transparent;
    z-index: var(--z-index-scroll);
    background: var(--rk-modal-bg, var(--r-neutral-bg-2));

    &.borderB {
      border-bottom: 0.5px solid var(--r-neutral-line);
    }
    &.mobile {
      margin: 0;
      padding: 0;
      padding-top: 18px;
      background: var(--rk-modal-bg, var(--r-neutral-bg-1));
    }
  }
</style>
