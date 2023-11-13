<script lang="ts">
  import { Type } from "../../type";
  import Image from "../Image/index.svelte";
  import clsx from "clsx";

  export let type: Type;
  export let size: "lg" | "normal" | "sm" = "lg";
  export let name: string;
  export let logo: string;
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
  {...$$restProps}
>
  <div class="logo">
    <Image src={logo} alt={name} />
  </div>

  <span>{name}</span>

  {#if type === "browser"}
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
    width: 206px;
    height: 56px;
    padding: 10px 20px;
    padding-right: 0;
    display: inline-flex;
    align-items: center;
    gap: 12px;

    border-radius: 5px;
    cursor: pointer;
    border-radius: 8px;
    background: var(--r-neutral-card-1);
    box-shadow: var(--button-shadow);
    color: var(--r-neutral-title-1);
    font-weight: 590;
    border: 0.5px solid transparent;
    font-size: 16px;

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

  .button:hover {
    border-radius: 8px;
    border: 0.5px solid var(--r-blue-default);
    background: var(--r-blue-light-1);
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  }

  .button.qrCode {
    font-weight: 510;
    border-radius: 8px;
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
    border-radius: 8px;
    color: var(--r-neutral-body);
    border: 1px solid var(--r-neutral-line);
    background: transparent;
  }

  .button.unused:hover {
    border-radius: 8px;
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
    border-radius: 8px;
    color: var(--r-neutral-body);
    border: 0.5px solid var(--r-neutral-line);
    background: transparent;

    .logo {
      width: 24px;
      height: 24px;
    }
  }

  .button.mobile:hover {
    border-radius: 8px;
    border: 0.5px solid var(--r-neutral-line);
    background: transparent;
  }

  .logo {
    width: 28px;
    height: 28px;
    object-fit: contain;
    border-radius: 100%;
    overflow: hidden;
  }
  .logo :global(*) {
    width: 100%;
    height: 100%;
  }
</style>
