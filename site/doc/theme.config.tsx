import React from "react";
import type { DocsThemeConfig } from "nextra-theme-docs";
import { useConfig, useTheme } from "nextra-theme-docs";
import seoConfig from "./seo.config";

const config: DocsThemeConfig = {
  logo: <span>RabbyKit Doc</span>,
  logoLink: false,
  project: {
    link: "https://github.com/RabbyHub/rabbykit",
  },
  docsRepositoryBase: "https://github.com/RabbyHub/rabbykit/site/doc",

  i18n: [
    { locale: "en-US", text: "English" },
    { locale: "zh-CN", text: "中文" },
  ],

  useNextSeoProps: () => ({ titleTemplate: "%s – RabbyKit" }),

  head: () => {
    const { frontMatter: meta } = useConfig();
    const { title } = meta;

    return (
      <>
        {seoConfig.icons.map((icon, index) => (
          <link key={index} rel={icon.rel} href={icon.url} />
        ))}
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content={meta["description"] || seoConfig.description}
        />
        <meta
          name="og:title"
          content={title ? title + " – Rabbykit" : seoConfig.title.default}
        />
        <meta
          name="og:description"
          content={meta["description"] || seoConfig.description}
        />
        <meta name="og:image" content={seoConfig.openGraph.images} />
        <meta name="og:url" content={seoConfig.openGraph.url} />
        <meta
          name="twitter:image"
          content="https://rabby.io/assets/logos/logo_twitter.png"
        />
        <meta
          name="twitter:description"
          content="The game-changing wallet for Ethereum and all EVM chains"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={seoConfig.twitter.site} />
        <meta name="twitter:creator" content={seoConfig.twitter.creator} />
        <meta name="apple-mobile-web-app-title" content="RabbyKit" />
      </>
    );
  },
  footer: {
    text: "RabbyKit",
  },
};

export default config;
