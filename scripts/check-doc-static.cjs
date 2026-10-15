const assert = require('node:assert/strict');
const { readFileSync, readdirSync } = require('node:fs');
const { resolve, join } = require('node:path');
const root = resolve(__dirname, '../site/doc/dist');
const anchors = {
  introduction: ['introduction', 'technical', 'customize', 'multi-injected-provider-support'],
  migrate: ['migrate', '010-breaking-changes', '1-upgrade-rabbykit-wagmicore-and-viem-to-their-latest-versions', '2-upgrade-your-rabbykit-and-wagmi-configurations', '3-wagmi-migrate'],
  install: ['installation', 'api-keys', 'config'],
  actions: ['rabbykit-actions'],
  theming: ['customize', 'thememode', 'font', 'themevariables'],
  'custom-login': ['custom-login-method', 'whether-to-use-walletconnect'],
  localization: ['localization', 'supported-languages'],
};
const pages = Object.keys(anchors);
for (const page of pages) {
  const html = readFileSync(join(root, 'docs', page, 'index.html'), 'utf8');
  assert.match(html, /<main/);
  assert.doesNotMatch(html, /\/_next\//);
  for (const anchor of anchors[page]) assert(html.includes(`id="${anchor}"`), `${page} missing #${anchor}`);
}
const home = readFileSync(join(root, 'index.html'), 'utf8');
assert.match(home, /A .*Real Web3 Way/);
assert.match(home, /Streamlined Design and Easy Configuration/);
assert.match(home, /Tailored for every Dapp scenario/);
assert.match(readFileSync(join(root, 'docs/index.html'), 'utf8'), /docs\/introduction/);
assert(readdirSync(join(root, 'pagefind')).includes('pagefind.js'));
const dependencies = require('../site/doc/package.json').dependencies;
assert(!dependencies.next && !dependencies.nextra && !dependencies['nextra-theme-docs']);
console.log('doc: static HTML, seven docs, redirect and local search PASS');
