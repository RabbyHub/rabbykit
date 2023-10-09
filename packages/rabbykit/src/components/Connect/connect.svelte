<script lang="ts">
  import { _ as t } from "svelte-i18n";
  import { onDestroy, onMount } from "svelte";
  import { useRKStore } from "../../store";

  export let name: string;
  export let logo: string;
  export let retry: () => void = () => {};

  let status: "loading" | "success" | "failed" = "loading";

  onMount(() => {
    useRKStore.setState({ page: "connect" });
  });

  let a = setInterval(() => {
    if (status === "loading") {
      status = "success";
    } else if (status === "success") {
      status = "failed";
    } else {
      status = "loading";
    }
  }, 3000);

  onDestroy(() => {
    a && clearInterval(a);
  });
</script>

<div class="container">
  <div class="title">
    {$t("Connect with", {
      values: {
        name,
      },
    })}
  </div>
  <div class="logo-container">
    <div class="loading-status" class:loading={status === "loading"}>
      {#if status === "loading"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
        >
          <path
            d="M48 3C23.1472 3 3.00001 23.1472 3 48C3 72.8528 23.1472 93 48 93"
            stroke="url(#paint0_linear_73607_12661)"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_73607_12661"
              x1="17.3182"
              y1="18.8523"
              x2="40.3296"
              y2="93"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#7084FF" />
              <stop offset="1" stop-color="#7084FF" stop-opacity="0.13" />
            </linearGradient>
          </defs>
        </svg>
      {:else if status === "success"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
        >
          <circle
            cx="48"
            cy="48"
            r="46.75"
            stroke="#2ABB7F"
            stroke-width="2.5"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          class="status-icon"
        >
          <rect x="1" y="1" width="28" height="28" rx="14" fill="#2ABB7F" />
          <path
            d="M8 16L13 21"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13 21L23 11"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <rect
            x="1"
            y="1"
            width="28"
            height="28"
            rx="14"
            stroke="white"
            stroke-width="1.5"
          />
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
        >
          <circle
            cx="48"
            cy="48"
            r="46.75"
            stroke="#E34935"
            stroke-width="2.5"
          />
        </svg>
        <svg
          class="status-icon failed"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
        >
          <rect x="1" y="1" width="28" height="28" rx="14" fill="#E34935" />
          <path
            d="M10 10L20 20"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10 20L20 10"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <rect
            x="1"
            y="1"
            width="28"
            height="28"
            rx="14"
            stroke="white"
            stroke-width="2"
          />
        </svg>
      {/if}
    </div>

    <img class="logo" src={logo} alt="" />
  </div>

  {#if status === "loading"}
    <div class="status">
      {$t("Requesting Connection")}
    </div>
    <div class="desc">
      {$t("connecting description", {
        values: {
          name,
        },
      })}
    </div>
  {:else if status === "success"}
    <div class="result">
      {$t("Connection Successful")}
    </div>
  {:else}
    <div class="result failed">
      {$t("Request Cancelled")}
    </div>
    <div class="desc">
      {$t("You cancelled the request.")}
    </div>
    <div class="retry" on:click={retry}>Retry</div>
  {/if}
</div>

<style lang="scss">
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      color: var(--r-neutral-title-1, #192945);
      text-align: center;
      font-size: 18px;
      font-weight: 510;
    }

    .logo-container {
      margin-top: 120px;
      margin-bottom: 32px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 96px;
      height: 96px;

      .loading-status {
        position: absolute;
        width: 100%;
        height: 100%;
      }

      .status-icon {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 30px;
        height: 30px;
      }

      .loading {
        animation: spin 1s linear infinite;
      }
    }

    .logo {
      width: 80px;
      height: 80px;
      border-radius: 99999999px;
    }

    .result {
      color: var(--r-green-default, #2abb7f);
      text-align: center;
      font-size: 20px;
      font-weight: 590;

      &.failed {
        color: var(--r-red-default, #e34935);
      }
    }

    .status {
      color: var(--r-neutral-title-1, #192945);
      text-align: center;
      font-size: 20px;
      font-weight: 590;
    }

    .desc {
      margin-top: 16px;
      max-width: 340px;
      color: var(--r-neutral-body, #3e495e);
      text-align: center;
      font-family: SF Pro;
      font-size: 15px;
      font-style: normal;
      font-weight: 510;
      line-height: 20px;
    }

    .retry {
      margin-top: 40px;
      cursor: pointer;
      color: var(--r-neutral-body, #3e495e);
      text-align: center;
      font-size: 15px;
      font-style: normal;
      font-weight: 510;
      line-height: normal;
      text-decoration-line: underline;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
</style>
