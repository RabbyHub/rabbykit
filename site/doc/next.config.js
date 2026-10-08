const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});
module.exports = withNextra({
  output: "standalone",
  // Keep Nextra's Pages Router context in the same server bundle.
  bundlePagesRouterDependencies: true,

  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/introduction",
        permanent: true,
      },
    ];
  },
});

process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error);
});
