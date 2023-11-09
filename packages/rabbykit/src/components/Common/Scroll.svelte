<script lang="ts">
  export let title: string;
  let box: HTMLDivElement;
  let scrollTop: number;
</script>

<div
  class="scroll"
  bind:this={box}
  on:scroll={() => {
    scrollTop = box.scrollTop;
  }}
>
  {#if title}
    <div class="title" class:borderB={scrollTop > 0}>
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
  }

  .title {
    background: var(--r-neutral-bg-2);
    position: sticky;
    top: 0;
    left: 0;
    margin: 0 0 0 -20px;
    padding: 0 20px;
    padding-bottom: 16px;
    color: var(--r-neutral-title-1);
    text-align: center;
    font-size: 18px;
    font-weight: 510;
    border-bottom: 0.5px solid transparent;
    &.borderB {
      border-bottom: 0.5px solid var(--r-neutral-line);
    }
  }
</style>
