<script lang="ts">
  import QRCodeUtil from "qrcode";
  import Image from "../Image/index.svelte";

  export let loading: boolean;
  export let logo: string;
  export let uri: string;
  export let size: number = 280;
  export let ecl: QRCodeUtil.QRCodeErrorCorrectionLevel = "M";
  export let success: boolean = false;
  export let failed: boolean = false;

  const generateMatrix = (
    value: string,
    errorCorrectionLevel: QRCodeUtil.QRCodeErrorCorrectionLevel
  ) => {
    const arr = Array.prototype.slice.call(
      QRCodeUtil.create(value, { errorCorrectionLevel }).modules.data,
      0
    );
    const sqrt = Math.sqrt(arr.length);
    return arr.reduce(
      (rows, key, index) =>
        (index % sqrt === 0
          ? rows.push([key])
          : rows[rows.length - 1].push(key)) && rows,
      []
    );
  };

  let logoSize = 50;
  const padding = "20";
  const svgSize = size - parseInt(padding, 10) * 2;

  let dots: string[] = [];

  const qrList = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
  ];

  $: {
    dots = [];
    const matrix = generateMatrix(uri, ecl);
    const cellSize = svgSize / matrix.length;
    qrList.forEach(({ x, y }) => {
      const x1 = (matrix.length - 7) * cellSize * x;
      const y1 = (matrix.length - 7) * cellSize * y;
      for (let i = 0; i < 3; i++) {
        const key = `${i}-${x}-${y}`;
        dots.push(`
            <rect
            fill=${i % 2 !== 0 ? "white" : "black"}
            height=${cellSize * (7 - i * 2)}
            key=${key}
            rx=${(i - 2) * -5 + (i === 0 ? 2 : 0)}
            ry=${(i - 2) * -5 + (i === 0 ? 2 : 0)}
            width=${cellSize * (7 - i * 2)}
            x=${x1 + cellSize * i}
            y=${y1 + cellSize * i}
          />`);

        dots = dots;
      }
    });

    const clearArenaSize = Math.floor((logoSize + 25) / cellSize);
    const matrixMiddleStart = matrix.length / 2 - clearArenaSize / 2;
    const matrixMiddleEnd = matrix.length / 2 + clearArenaSize / 2 - 1;

    matrix.forEach((row: QRCodeUtil.QRCode[], i: number) => {
      row.forEach((_: any, j: number) => {
        if (matrix[i][j]) {
          if (
            !(
              (i < 7 && j < 7) ||
              (i > matrix.length - 8 && j < 7) ||
              (i < 7 && j > matrix.length - 8)
            )
          ) {
            if (
              !(
                i > matrixMiddleStart &&
                i < matrixMiddleEnd &&
                j > matrixMiddleStart &&
                j < matrixMiddleEnd
              )
            ) {
              const key = `circle-${i}-${j}`;
              dots.push(`
                <circle
                  cx=${i * cellSize + cellSize / 2}
                  cy=${j * cellSize + cellSize / 2}
                  fill="black"
                  key=${key}
                  r=${cellSize / 3} // calculate size of single dots
                />`);
              dots = dots;
            }
          }
        }
      });
    });
  }
</script>

<div class="qr-code" class:loading style="--qr-code-size:{size}px">
  <div class="logo">
    {#if success}
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="2" width="76" height="76" rx="38" fill="#2ABB7F" />
        <path
          d="M20 40.9492L34.2857 55.2349"
          stroke="white"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M34.291 55.2394L62.8624 26.668"
          stroke="white"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <rect
          x="2"
          y="2"
          width="76"
          height="76"
          rx="38"
          stroke="white"
          stroke-width="4"
        />
      </svg>
    {:else if failed}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
      >
        <rect x="2" y="2" width="76" height="76" rx="38" fill="#E34935" />
        <path
          d="M26.668 26.6641L53.3346 53.3307"
          stroke="white"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M26.668 53.3307L53.3346 26.6641"
          stroke="white"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <rect
          x="2"
          y="2"
          width="76"
          height="76"
          rx="38"
          stroke="white"
          stroke-width="4"
        />
      </svg>
    {:else}
      <Image src={logo} alt="" />
    {/if}
  </div>

  <div style="opacity: {success || failed ? '0.3' : '1'};">
    <svg height={svgSize} style="all: revert;" width={svgSize}>
      <!-- <defs>
        <clipPath id="clip-wrapper">
          <rect height={logoWrapperSize} width={logoWrapperSize} />
        </clipPath>
        <clipPath id="clip-logo">
          <rect height={logoSize} width={logoSize} />
        </clipPath>
      </defs> -->
      <rect fill="transparent" height={svgSize} width={svgSize} />
      {#each dots as dot}
        {@html dot}
      {/each}
    </svg>
  </div>
  {#if loading}
    <div class:loading />
    <div class="loading-line" />

    <!-- <div
      class:loading
      out:fly={{
        duration: 800,
        y: "100%",
        easing: quadOut,
        opacity: 1,
      }}
    /> -->
  {/if}
</div>

<style lang="scss">
  .qr-code {
    width: var(--qr-code-size);
    height: var(--qr-code-size);
    user-select: none;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 0.583px solid var(--r-neutral-line, #d3d8e0);
    background: #fff;
    overflow: hidden;
    .loading {
      content: "";
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      position: absolute;
      background: rgba($color: #fff, $alpha: 0.5);
      z-index: 4;
      &::after {
        content: "";
        top: -2px;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;
        border-top: 2px solid var(--r-blue-default);
      }
    }
    .loading-line {
      content: "";
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      position: absolute;
      background: transparent;
      z-index: 4;
      border-top: 2px solid var(--r-blue-default);
      animation: slide 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite forwards;
    }
  }

  @keyframes slide {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }

  .logo {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    border-radius: 9999px;
    z-index: 2;
    overflow: hidden;
  }
</style>
