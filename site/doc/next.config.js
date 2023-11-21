const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

module.exports = withNextra({
  // async redirects() {
  //   return [
  //     {
  //       source: "/docs",
  //       destination: "/docs/introduction",
  //       permanent: true,
  //     },
  //   ];
  // },
  // experimental: {
  //   esmExternals: "loose",
  // },
  images: {
    unoptimized: true,
  },
  swcMinify: true,
  trailingSlash: true,
  output: "export",
});

process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error);
});
