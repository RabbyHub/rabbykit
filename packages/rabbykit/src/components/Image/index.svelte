<script lang="ts" module>
  export const loading: "lazy" | "eager" = "lazy";
</script>

<script lang="ts">
  interface Props {
    src: string;
    alt?: string;
  }

  let { src, alt }: Props = $props();
</script>

{#if src?.includes("<svg")}
  {@html src}
{:else}
  <img {src} {alt} loading="lazy" />
{/if}

<style>
  img {
    width: 100%;
    height: 100%;
  }
</style>
