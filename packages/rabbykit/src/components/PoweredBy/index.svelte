<script lang="ts">
  import { onMount } from "svelte";
  import { _ as t } from "svelte-i18n";
  import useStore from "../../store/context";

  interface Props {
    class?: string;
  }

  let { class: className = "" }: Props = $props();

  let footerClassName = $state("");
  let contentContainer: HTMLElement;

  onMount(() => {
    contentContainer.innerHTML = "";
    footerClassName = "";
    if ($useStore.footerContent) {
      footerClassName = $useStore.footerClassName || "";
      contentContainer.appendChild($useStore.footerContent);
    }
  });
</script>

<div
  class={`outer-slot ${footerClassName || "hidden"}`}
  bind:this={contentContainer}
></div>
<div class={`tip ${className}`}>
  <a
    part="powered-by"
    href="https://rabbykit.rabby.io"
    target="_blank"
    rel="noreferrer">{$t("Powered by RabbyKit")}</a
  >
</div>

<style lang="scss">
  .hidden {
    display: none;
  }
  .tip {
    display: block;

    text-align: center;
    font-size: 12px;
    color: var(--r-neutral-foot);

    & > a {
      color: var(--r-neutral-foot);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
