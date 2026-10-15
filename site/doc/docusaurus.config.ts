import type { Config } from "@docusaurus/types";

const description = "RabbyKit - A Real Web3 Way to connect all wallets for all Dapp developers";

const config: Config = {
  title: "RabbyKit",
  tagline: description,
  url: "https://rabbykit.rabby.io",
  baseUrl: "/",
  trailingSlash: true,
  favicon: "favicon.png",
  organizationName: "RabbyHub",
  projectName: "rabbykit",
  onBrokenLinks: "throw",
  staticDirectories: ["public"],
  i18n: { defaultLocale: "en", locales: ["en"] },
  headTags: [
    { tagName: "meta", attributes: { name: "twitter:site", content: "@Rabby_io" } },
    { tagName: "meta", attributes: { name: "twitter:creator", content: "@Rabby_io" } },
    { tagName: "link", attributes: { rel: "apple-touch-icon", href: "/favicon.png" } },
    { tagName: "link", attributes: { rel: "mask-icon", href: "/favicon.png" } },
  ],
  presets: [["classic", {
    docs: { path: "docs", routeBasePath: "docs", sidebarPath: "./sidebars.ts", breadcrumbs: false, editUrl: "https://github.com/RabbyHub/rabbykit/tree/main/site/doc/" },
    blog: false,
    theme: { customCss: "./style/globals.css" },
  }]],
  themes: [["@easyops-cn/docusaurus-search-local", {
    hashed: "filename", language: "en", docsRouteBasePath: "/docs", indexBlog: false,
    highlightSearchTermsOnTargetPage: true,
  }]],
  plugins: [
    function workspaceSdk() {
      return {
        name: "workspace-sdk",
        configureWebpack(config) {
          const rule = config.module?.rules?.find((rule) => rule && typeof rule === "object" && rule.test instanceof RegExp && rule.test.test("component.tsx"));
          if (!rule || typeof rule !== "object" || typeof rule.exclude !== "function") throw new Error("Docusaurus JS loader rule missing");
          const exclude = rule.exclude;
          // Treat the prebuilt workspace SDK like an installed library; loose Babel breaks its Map/class semantics.
          rule.exclude = (filename) => /[\/]packages[\/]rabbykit[\/]dist[\/]/.test(filename) || exclude(filename);
        },
      };
    },
    ["@docusaurus/plugin-client-redirects", { redirects: [{ from: "/docs", to: "/docs/introduction/" }] }],
    function tailwind() {
      return { name: "tailwind", configurePostCss(options) { options.plugins.push(require("tailwindcss"), require("autoprefixer")); return options; } };
    },
  ],
  themeConfig: {
    image: "logo-twitter.png",
    colorMode: { defaultMode: "light", respectPrefersColorScheme: false },
    navbar: { title: "RabbyKit Doc", logo: { alt: "RabbyKit", src: "logo-blue.svg", href: "/" }, items: [{ type: "docSidebar", sidebarId: "docs", label: "Docs", position: "left" }, { href: "https://github.com/RabbyHub/rabbykit", label: "GitHub", position: "right" }] },
    prism: { additionalLanguages: ["bash"] },
  },
};
export default config;
