const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});
module.exports = withNextra({
  output: "standalone",

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
