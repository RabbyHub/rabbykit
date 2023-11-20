const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

module.exports = withNextra({
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/introduction",
        permanent: true,
      },
    ];
  },
  experimental: {
    esmExternals: "loose",
  },
  // i18n: {
  //   locales: ["en-US", "zh-CN"],
  //   defaultLocale: "zh-CN",
  // },
});

process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error);
});
