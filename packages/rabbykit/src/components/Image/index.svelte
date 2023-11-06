<script lang="ts">
  export const loading: "lazy" | "eager" = "lazy";
  export let src: string;
</script>

{#if src?.includes("<svg")}
  {@html src}
{:else}
  <img {src} alt={$$props.alt} loading="lazy" />
{/if}

<style>
  img {
    width: 100%;
    height: 100%;
  }
</style>
