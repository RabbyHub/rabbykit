const assert = require("node:assert/strict");
const { readFileSync, readdirSync, existsSync, statSync } = require("node:fs");
const { resolve, join } = require("node:path");

const output = resolve(__dirname, "../site/doc/build");
const headings = {
  "introduction": [
    "introduction",
    "technical",
    "customize",
    "multi-injected-provider-support"
  ],
  "migrate": [
    "migrate",
    "010-breaking-changes",
    "1-upgrade-rabbykit-wagmicore-and-viem-to-their-latest-versions",
    "2-upgrade-your-rabbykit-and-wagmi-configurations",
    "3-wagmi-migrate"
  ],
  "install": [
    "installation",
    "api-keys",
    "config"
  ],
  "actions": [
    "rabbykit-actions"
  ],
  "theming": [
    "customize",
    "thememode",
    "font",
    "themevariables"
  ],
  "custom-login": [
    "custom-login-method",
    "whether-to-use-walletconnect"
  ],
  "localization": [
    "localization",
    "supported-languages"
  ]
};
const htmlFiles = ["index.html", ...Object.keys(headings).map((slug) => `docs/${slug}/index.html`)];
for (const relative of htmlFiles) {
  const html = readFileSync(join(output, relative), "utf8");
  assert(!html.includes("/_next/"), `${relative}: Next runtime was retained`);
  assert(html.includes("https://rabbykit.rabby.io"), `${relative}: canonical URL missing`);
  const slug = relative.split("/")[1];
  for (const id of headings[slug] || []) {
    assert(html.includes(`id="${id}"`), `${relative}: existing anchor #${id} missing`);
  }
  for (const [, url] of html.matchAll(/(?:src|href)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
    const path = join(output, decodeURI(url));
    assert(existsSync(path), `${relative}: missing static asset ${url}`);
    if (statSync(path).isDirectory()) {
      assert(existsSync(join(path, "index.html")), `${relative}: missing route ${url}`);
    }
  }
}
const home = readFileSync(join(output, "index.html"), "utf8");
assert(home.includes('property="og:title" content="RabbyKit - A Real Web3 Way'), "homepage OpenGraph title missing");
assert(home.includes('property="og:description"'), "homepage OpenGraph description missing");
const indexFile = readdirSync(output).find((name) => /^search-index-.*\.json$/.test(name));
assert(indexFile, "local search index missing");
const indexes = JSON.parse(readFileSync(join(output, indexFile), "utf8"));
const urls = new Set(indexes.flatMap((index) => index.documents.map((doc) => doc.u.split("#")[0])));
for (const slug of Object.keys(headings)) assert(urls.has(`/docs/${slug}/`), `search omitted ${slug}`);
assert(!existsSync(join(output, "api/ping")), "removed API ping was retained");
console.log("Static docs: homepage, 7 routes, existing anchors, assets, local search, and removed API PASS");
