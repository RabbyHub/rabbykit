<script lang="ts">
  import Image from "../Image/index.svelte";
  import { _ as t } from "svelte-i18n";
  import { WalletResult } from "../../wallets/type";
  import Icon from "../CommonIcon/Icon.svelte";
  import { BrowserType, getBrowser } from "../../helpers/browser";

  export let wallet: WalletResult;
  let logo: string = wallet.logo;
  let uri: string =
    wallet.downloadUrls?.chrome || wallet.downloadUrls?.edge || "";
  let name: string = wallet.name;
  let browser = getBrowser();

  $: {
    if (browser === BrowserType.Safari && !wallet.downloadUrls?.[browser]) {
      browser = BrowserType.Chrome;
    }
    uri = wallet?.downloadUrls?.[browser] || uri;
  }
</script>

<div class="container">
  <div class="title">
    {$t("How to use", { values: { name } })}
  </div>

  <section>
    <div class="text1">
      {$t(`If you haven't installed`, { values: { name } })}
    </div>
    <div class="text2">
      {$t("downloaded by clicking the button below", { values: { name } })}
    </div>

    <a class="card install" href={uri} target="_blank">
      <div class="card-content" style="margin-left: -6px;">
        <!-- <Icon name={}/> -->
        <Icon name={browser} hover={false} />
        <div class="tip">{$t("Install the Extension")}</div>
      </div>
    </a>
  </section>

  <section>
    <div class="text1">
      {$t("If you already have installed", {
        values: { name },
      })}
    </div>
    <div class="text2">
      {$t("Make sure your wallet is enabled and disable other plugin wallets", {
        values: { name },
      })}
    </div>
    <div class="card2">
      <div class="row1">
        <div style="width:20px;height:20px">
          <Image src={logo} alt={name} />
        </div>
        <div class="tip">{name}</div>
      </div>
      <div class="row2">
        <div class="btn">
          <span> Details </span>
        </div>
        <div class="btn"><span> Remove </span></div>

        <svg
          class="switch"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="13"
          viewBox="0 0 24 13"
          fill="none"
        >
          <rect width="24" height="12" rx="6" fill="#7084FF" />
          <g filter="url(#filter0_d_73616_14562)">
            <circle cx="18" cy="6.00028" r="5.14286" fill="white" />
          </g>
          <defs>
            <filter
              id="filter0_d_73616_14562"
              x="11.1429"
              y="0.857422"
              width="12.0001"
              height="12.0004"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-0.857143" dy="0.857143" />
              <feGaussianBlur stdDeviation="0.428571" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_73616_14562"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_73616_14562"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  </section>
</div>

<style lang="scss">
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      color: var(--r-neutral-title-1);
      text-align: center;
      font-size: 18px;
      font-weight: 510;
      margin-bottom: 16px;
    }

    section {
      width: 100%;
      padding: 32px 40px;
      border-radius: var(--rk-primary-button-border-radius, 8px);
      border: 0.5px solid var(--r-neutral-line);
      background: var(--r-neutral-card-1);
      &:not(:last-child) {
        margin-bottom: 12px;
      }

      .text1 {
        color: var(--r-neutral-title-1);
        font-size: 15px;
        font-weight: 510;
        word-wrap: break-word;
        margin-bottom: 12px;
      }
      .text2 {
        color: var(--r-neutral-body);
        font-size: 13px;
        font-weight: 400;
        word-wrap: break-word;
        margin-bottom: 24px;
      }

      a {
        text-decoration: none;
      }

      .card {
        width: 222px;
        height: 52px;

        background: var(--r-neutral-card-3);
        border-radius: 4px;
        overflow: hidden;
        border: 0.5px solid var(--r-neutral-line);
        justify-content: center;
        align-items: center;
        display: inline-flex;
        &.install:hover {
          border-radius: 4px;
          border: 0.5px solid var(--r-blue-default);
          background: var(--r-blue-light-1);
        }

        .card-content {
          align-self: stretch;
          justify-content: flex-start;
          align-items: center;
          gap: 8px;
          display: inline-flex;

          img {
            width: 20px;
            height: 20px;
          }
          .tip {
            text-align: center;
            color: var(--r-neutral-title-1);
            font-size: 15px;
            font-weight: 510;
            word-wrap: break-word;
          }
        }
      }

      .card2 {
        user-select: none;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 220px;
        height: 100px;
        padding: 10px;
        border-radius: 4px;
        border: 0.5px solid var(--r-neutral-line);
        background: var(--r-neutral-card-3);

        img {
          width: 20px;
          height: 20px;
        }

        .row1 {
          display: flex;
          align-items: center;
          .tip {
            margin-left: 6px;
            color: var(--r-neutral-title-1);
            font-size: 12px;
            font-style: normal;
            font-weight: 510;
            line-height: normal;
          }
        }

        .row2 {
          display: flex;
          align-items: center;
          .btn {
            margin-right: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px 9px;
            border-radius: 2px;
            border: 0.3px solid var(--r-neutral-line);
            color: var(--r-blue-default);
            text-align: center;
            font-size: 12px;
            font-style: normal;
            font-weight: 510;
            line-height: normal;
          }

          .switch {
            margin-left: auto;
          }
        }
      }
    }
  }
</style>
