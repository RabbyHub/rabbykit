<script lang="ts">
  import Icon from "../CommonIcon/Icon.svelte";

  export let show: boolean;
  export let back: () => void;
  export let showBack = false;
  export let animation = true;
</script>

<div class="sub-page" class:show class:animation>
  {#if showBack}
    <div class="back">
      <Icon name="back" on:click={back} />
    </div>
  {/if}
  {#if show}
    <slot />
  {/if}
</div>

<style lang="scss">
  .sub-page {
    position: absolute;
    width: 480px;
    height: 100%;
    right: 0;
    top: 0;
    background-color: #fff;
    transform: translateX(100%);
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
  .animation {
    transition: transform 0.3s;
  }
</style>
