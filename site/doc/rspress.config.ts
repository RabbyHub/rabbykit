import { defineConfig, type UserConfig } from '@rspress/core';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const description = 'RabbyKit - A Real Web3 Way to connect all wallets for all Dapp developers';
const origin = 'https://rabbykit.rabby.io';

const config: UserConfig = {
  root: 'pages',
  outDir: 'dist',
  title: description,
  description,
  siteOrigin: origin,
  lang: 'en',
  icon: pathToFileURL(resolve(__dirname, 'public/favicon.png')).href,
  logoText: 'RabbyKit Doc',
  logoHref: '/',
  globalStyles: resolve(__dirname, 'style/globals.css'),
  route: { cleanUrls: true, cleanUrlsRedirect: false },
  head: [
    ['link', { rel: 'apple-touch-icon', href: '/favicon.png' }],
    ['meta', { property: 'og:title', content: description }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: `${origin}/logo-twitter.png` }],
    route => ['meta', { property: 'og:url', content: `${origin}${route.routePath}` }],
    route => ['link', { rel: 'canonical', href: `${origin}${route.routePath}` }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:image', content: `${origin}/logo-twitter.png` }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:site', content: '@Rabby_io' }],
    ['meta', { name: 'twitter:creator', content: '@Rabby_io' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'RabbyKit' }],
  ],
  themeConfig: {
    nav: [{ text: 'Docs', link: '/docs/introduction/' }],
    socialLinks: [{ icon: 'github', mode: 'link', content: 'https://github.com/RabbyHub/rabbykit' }],
    sidebar: {
      '/docs/': [
        { text: 'Overview', items: [
          { text: 'Introduction', link: '/docs/introduction/' },
          { text: 'Migrate', link: '/docs/migrate/' },
        ] },
        { text: 'Getting Started', items: [
          { text: 'Installation', link: '/docs/install/' },
          { text: 'Actions', link: '/docs/actions/' },
          { text: 'Customize', link: '/docs/theming/' },
          { text: 'Custom Login Method', link: '/docs/custom-login/' },
          { text: 'Localization', link: '/docs/localization/' },
        ] },
      ],
    },
    editLink: { docRepoBaseUrl: 'https://github.com/RabbyHub/rabbykit/tree/main/site/doc/pages' },
  },
  builderConfig: {
    server: { publicDir: { name: resolve(__dirname, 'public') } },
    output: { sourceMap: false },
    // Preserve shared React context identity when Rspack optimizes exports.
    tools: { rspack: { optimization: { inlineExports: false } } },
  },
};

export default defineConfig(config);
