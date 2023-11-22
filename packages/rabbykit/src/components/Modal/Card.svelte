<script lang="ts">
  import Icon from "../CommonIcon/Icon.svelte";

  export let show: boolean;
  export let back: () => void;
</script>

<div class="sub-page" class:show>
  <div class="back">
    <Icon name="back" on:click={back} />
  </div>
  {#if show}
    <slot />
  {/if}
</div>

<style lang="scss">
  .sub-page {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: #fff;
    transform: translateX(100%);
    transition: transform 0.3s;
    padding: 20px;
    padding-bottom: 0;
    background: var(--r-neutral-bg-2);
    z-index: var(--z-index-page);
    .back {
      position: absolute;
      transform: translateX(100%);
      top: 14px;
      left: 20px;
      z-index: 10;
    }

    &.show {
      transform: translateX(0);
      .back {
        transform: translateX(0);
      }
    }
  }
</style>
