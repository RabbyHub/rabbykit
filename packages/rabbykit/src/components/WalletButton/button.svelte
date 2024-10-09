<script lang="ts">
  import { Type } from "../../type";
  import Image from "../Image/index.svelte";
  import clsx from "clsx";

  export let type: Type;
  export let size: "lg" | "normal" | "sm" = "lg";
  export let name: string;
  export let logo: string;
  export let showRightArrow: boolean = false;
  export let active = false;
</script>

<button
  on:click
  class={clsx("button", $$props.class)}
  class:sm={size === "sm"}
  class:lg={size === "lg"}
  class:ready={type === "browser"}
  class:qrCode={type === "qrCode"}
  class:mobile={type === "mobile"}
  class:unused={type === "unused"}
  class:active
  {...$$restProps}
>
  <div class="logo">
    <Image src={logo} alt={name} />
  </div>

  <span class="button-label">{name}</span>

  {#if showRightArrow}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      style="margin-left: auto; margin-right:20px"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M9.6001 6L15.6001 12L9.6001 18"
        stroke="var(--r-neutral-foot)"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  {/if}
</button>

<style lang="scss">
  .button {
    --fallback-border: 0.5px solid transparent;
    /* width: 206px; */
    width: 100%;
    height: 56px;
    padding: 10px 20px;
    padding-right: 0;
    display: inline-flex;
    align-items: center;
    gap: 12px;

    cursor: pointer;
    border-radius: var(--rk-primary-button-border-radius, 8px);
    background: var(--rk-primary-button-bg, var(--r-neutral-card-1));
    box-shadow: var(--button-shadow);
    color: var(--rk-primary-button-color, var(--r-neutral-title-1));
    font-weight: var(--rk-primary-button-font-weight, 590);
    border: var(--rk-primary-button-border, var(--fallback-border));
    font-size: var(--rk-primary-button-font-size, 16px);

    &.lg {
      height: 64px;
      border-width: 1px;

      &:hover {
        border-width: 1px;
      }
    }
  }
  .button.ready {
    width: 100%;
  }
  .button:not(.unused) {
    color: var(--rk-primary-button-hover-color, var(--r-neutral-title-1));
  }

  .button:hover {
    --fallback-border: 0.5px solid var(--r-blue-default);
    border: var(--rk-primary-button-hover-border, var(--fallback-border));
    background: var(--rk-primary-button-hover-bg, var(--r-blue-light-1));
  }

  .button.qrCode {
    font-weight: 510;
    box-shadow: none;
    border: 0.5px solid var(--r-neutral-line);
  }

  .button.qrCode:hover {
    border: 0.5px solid var(--r-blue-default);
    box-shadow: none;
  }

  .button.unused {
    font-size: 15px;
    font-weight: 510;
    box-shadow: none;
    color: var(--r-neutral-body);
    border: 1px solid var(--r-neutral-line);
    background: transparent;
  }

  .button.unused:hover {
    border: 1px solid var(--r-blue-default);
    background: transparent;
  }

  .button.mobile {
    padding: 12px 0;
    padding-left: 16px;
    width: 100%;
    height: 48px;
    font-size: 14px;
    font-weight: 510;
    box-shadow: none;
    color: var(--r-neutral-body);
    border: 0.5px solid var(--r-neutral-line);
    background: transparent;

    .logo {
      width: 24px;
      height: 24px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      /* fix ios borderRadius */
      & > :global(svg) {
        min-width: 48px;
        width: 48px;
        height: 48px;
        transform: scale(0.5);
      }
    }
  }

  .button.mobile:hover {
    border: 0.5px solid var(--r-neutral-line);
    background: transparent;
  }

  .button.active,
  .button.active:hover {
    border-color: transparent;
    background-color: var(--r-blue-default);
    color: var(--r-neutral-title2, #fff);
  }

  .logo {
    width: 32px;
    height: 32px;
    object-fit: contain;
    border-radius: 4px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .button-label {
    flex-shrink: 1;
    text-align: left;
  }

  .logo > :global(*) {
    width: 100%;
    height: 100%;
  }
</style>
