import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

const description = 'RabbyKit - A Real Web3 Way to connect all wallets for all Dapp developers';
export default defineConfig({
  site: 'https://rabbykit.rabby.io',
  output: 'static',
  trailingSlash: 'always',
  redirects: { '/docs': '/docs/introduction/' },
  integrations: [
    react(),
    starlight({
      title: 'RabbyKit',
      description,
      favicon: '/favicon.png',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/RabbyHub/rabbykit' }],
      editLink: { baseUrl: 'https://github.com/RabbyHub/rabbykit/edit/main/site/doc/' },
      sidebar: [
        { label: 'Overview', items: ['docs/introduction', 'docs/migrate'] },
        { label: 'Getting Started', items: [
          { slug: 'docs/install', label: 'Installation' },
          'docs/actions',
          { slug: 'docs/theming', label: 'Customize' },
          'docs/custom-login',
          'docs/localization',
        ] },
      ],
      head: [
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/favicon.png' } },
        { tag: 'link', attrs: { rel: 'mask-icon', href: '/favicon.png' } },
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://rabbykit.rabby.io/logo-twitter.png' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://rabbykit.rabby.io/logo-twitter.png' } },
        { tag: 'meta', attrs: { name: 'twitter:site', content: '@Rabby_io' } },
        { tag: 'meta', attrs: { name: 'twitter:creator', content: '@Rabby_io' } },
        { tag: 'meta', attrs: { name: 'apple-mobile-web-app-title', content: 'RabbyKit' } },
      ],
      credits: false,
    }),
  ],
  vite: {
    // Astro 7 uses a separate prerender environment for static generation.
    environments: {
      ssr: { resolve: { noExternal: ['react-color', 'react-use'] } },
      prerender: { resolve: { noExternal: ['react-color', 'react-use'] } },
    },
    build: { sourcemap: false },
  },
});
