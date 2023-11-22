<script lang="ts">
  import Icon from "../CommonIcon/Icon.svelte";

  export let disable = false;
  export let copyTip: string = "Copy Url";
  export let CopiedTip: string = "Copied";
  export let copyText: string;

  let copied = false;
  async function copy() {
    if (disable) return;

    try {
      await navigator.clipboard.writeText(copyText);
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    } catch (error) {
      console.log("error", error);
    }
  }
</script>

<div
  class:copy
  class:copied
  class:disable
  role="button"
  tabindex="0"
  on:click={copy}
  {...$$restProps}
>
  {#if copied}
    <Icon name="copied" hover={false} />
    <span>{CopiedTip}</span>
  {:else}
    <Icon name="copy" hover={false} />
    <span>{copyTip}</span>
  {/if}
</div>

<style>
  .copy {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: var(--r-neutral-body);
    text-align: center;
    font-size: 15px;
    font-style: normal;
    font-weight: 510;
    line-height: normal;
    &.disable {
      cursor: not-allowed;
    }
  }

  .copied {
    cursor: initial;
    color: var(--r-green-default);
  }
</style>
