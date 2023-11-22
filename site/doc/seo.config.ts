import type { Metadata } from "next";

const defineMetadata = <T extends Metadata>(metadata: T) => metadata;

const seoConfig = defineMetadata({
  metadataBase: new URL("https://rabbykit.rabby.io"),
  title: {
    template: "%s - RabbyKit",
    default:
      "RabbyKit - A Real Web3 Way to connect all wallets for all Dapp developers",
  },
  description:
    "RabbyKit - A Real Web3 Way to connect all wallets for all Dapp developers",
  openGraph: {
    images: "/og-image.png",
    url: "https://rabbykit.rabby.io",
  },
  manifest: "/site.webmanifest",
  icons: [
    { rel: "icon", url: "/favicon.png" },
    { rel: "apple-touch-icon", url: "/favicon.png" },
    { rel: "mask-icon", url: "/favicon.png" },
    { rel: "image/x-icon", url: "/favicon.png" },
  ],
  twitter: {
    site: "@Rabby_io",
    creator: "@Rabby_io",
  },
});

export default seoConfig;
