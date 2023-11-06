import React from "react";
import type { DocsThemeConfig } from "nextra-theme-docs";

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
};

export default config;
