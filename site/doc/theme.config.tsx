import React from "react";
import type { DocsThemeConfig } from "nextra-theme-docs";
import { Navbar, useConfig } from "nextra-theme-docs";
import { useFSRoute } from "nextra/hooks";
// import { useMenu } from "nextra/context";

const config: DocsThemeConfig = {
  logo: <span>RabbyKit Doc</span>,
  project: {
    link: "https://github.com/RabbyHub/rabbykit",
  },
  i18n: [
    { locale: "en-US", text: "English" },
    { locale: "zh-CN", text: "中文" },
  ],

  footer: {
    text: "RabbyKit",
  },
  // navbar: {
  //   component: (props) => {
  //     const config = useConfig();
  //     const activeRoute = useFSRoute();
  //     console.log("config", { config, activeRoute });
  //     if (activeRoute === "/") {
  //       return null;
  //     }
  //     return <Navbar {...props} />;
  //   },
  // },
};

export default config;
