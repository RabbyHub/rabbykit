<script lang="ts">
  import { _ as t } from "svelte-i18n";
  import { onMount } from "svelte";
  import { useRKStore } from "../../store";
  import Icon from "../Icon/Icon.svelte";

  export let logo: string = "https://via.placeholder.com/20x20";
  export let uri: string;
  export let name: string;
  //   export let size: number = 280;

  onMount(() => {
    useRKStore.setState({ page: "connect" });
  });
</script>

<div class="container">
  <div class="title">
    {$t("How to use", { values: { name } })}
  </div>

  <section>
    <div class="text1">1.如果你还没有安装 Rabby Wallet？</div>
    <div class="text2">可以点击下方按钮下载 Rabby Browser Wallet</div>

    <a class="card" href={uri} target="_blank">
      <div class="card-content">
        <img src="https://via.placeholder.com/20x20" alt="download" />
        <div class="tip">{$t("Install the Extension")}</div>
      </div>
    </a>
  </section>

  <section>
    <div class="text1">请确保你的钱包已启用并禁用其他插件钱包</div>
    <div class="text2">2.如果你已经安装了 Rabby Wallet？</div>
    <div class="card2">
      <div class="row1">
        <img src={logo} alt={name} />
        <div class="tip">{name}</div>
      </div>
      <div class="row2">
        <div class="btn">Details</div>
        <div class="btn">Remove</div>

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
      color: var(--r-neutral-title-1, #192945);
      text-align: center;
      font-size: 18px;
      font-weight: 510;
      margin-bottom: 20px;
    }

    section {
      width: 100%;
      padding: 32px 40px;
      border-radius: 4px;
      border: 0.5px solid var(--r-neutral-line, #d3d8e0);
      background: #fff;
      &:not(:last-child) {
        margin-bottom: 12px;
      }

      .text1 {
        color: #192945;
        font-size: 15px;
        font-family: SF Pro;
        font-weight: 510;
        word-wrap: break-word;
        margin-bottom: 12px;
      }
      .text2 {
        color: #3e495e;
        font-size: 13px;
        font-family: SF Pro;
        font-weight: 400;
        text-transform: capitalize;
        word-wrap: break-word;
        margin-bottom: 12px;
      }

      a {
        text-decoration: none;
      }

      .card {
        width: 222px;
        height: 52px;

        background: #f7fafc;
        border-radius: 4px;
        overflow: hidden;
        border: 0.5px #d3d8e0 solid;
        justify-content: center;
        align-items: center;
        display: inline-flex;

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
            color: #192945;
            font-size: 15px;
            font-family: SF Pro;
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
        border: 0.5px solid var(--r-neutral-line, #d3d8e0);
        background: var(--r-neutral-card-3, #f7fafc);

        img {
          width: 20px;
          height: 20px;
        }

        .row1 {
          display: flex;
          align-items: center;
          .tip {
            margin-left: 6px;
            color: var(--r-neutral-title-1, #192945);
            font-family: SF Pro;
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
            width: 45px;
            height: 18px;
            border-radius: 2px;
            border: 0.3px solid var(--r-neutral-line, #d3d8e0);
            color: var(--r-blue-default, #7084ff);
            text-align: center;
            font-family: SF Pro;
            font-size: 8px;
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
