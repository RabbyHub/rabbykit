<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import Icon from "../CommonIcon/Icon.svelte";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    disable?: boolean;
    copyTip?: string;
    CopiedTip?: string;
    copyText: string;
  }

  let { disable = false, copyTip = "Copy Url", CopiedTip = "Copied", copyText, ...rest }: Props = $props();

  let copied = $state(false);

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
  onclick={copy}
  onkeydown={(e) => e.key === 'Enter' && copy()}
  {...rest}
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
