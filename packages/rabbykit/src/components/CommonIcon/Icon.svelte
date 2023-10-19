<script lang="ts">
  import chrome from "./chrome.svg";
  import edge from "./edge.svg";
  import safari from "./safari.svg";
  import firefox from "./firefox.svg";
  import close from "./close.svg";
  import back from "./back.svg";
  import copied from "./copied.svg";
  import copy from "./copy.svg";
  import refresh from "./refresh.svg";

  import clsx from "clsx";
  export let name: keyof typeof icons;
  export let width = "20px";
  export let height = "20px";
  export let hover: boolean = true;

  let icons = {
    close,
    back,
    copy,
    copied,
    refresh,
    chrome,
    edge,
    firefox,
    safari,
  } as const;
  let displayIcon = icons[name];
</script>

<button
  style={`--icon-width:${width};--icon-height:${height}`}
  class={clsx("icon", $$props.class)}
  class:hover
  on:click
>
  {@html displayIcon}
</button>

<style lang="scss">
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    cursor: pointer;
    &.hover:hover {
      border-radius: 4px;
      background: var(--r-neutral-card-3, #f7fafc);
    }
    & > :global(svg) {
      width: var(--icon-width);
      height: var(--icon-height);
    }
  }
</style>
