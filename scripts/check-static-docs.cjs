const assert = require("node:assert/strict");
const { readFileSync, readdirSync } = require("node:fs");
const { resolve, join } = require("node:path");

const root = resolve(__dirname, "../site/doc/dist");
const anchors = {
  introduction: ["introduction", "technical", "customize", "multi-injected-provider-support"],
  migrate: ["migrate", "010-breaking-changes", "1-upgrade-rabbykit-wagmicore-and-viem-to-their-latest-versions", "2-upgrade-your-rabbykit-and-wagmi-configurations", "3-wagmi-migrate"],
  install: ["installation", "api-keys", "config"],
  actions: ["rabbykit-actions"],
  theming: ["customize", "thememode", "font", "themevariables"],
  "custom-login": ["custom-login-method", "whether-to-use-walletconnect"],
  localization: ["localization", "supported-languages"],
};
for (const [slug, ids] of Object.entries(anchors)) {
  const html = readFileSync(join(root, "docs", slug, "index.html"), "utf8");
  for (const id of ids) assert.ok(html.includes(`id="${id}"`), `${slug}: missing existing anchor #${id}`);
  assert.ok(html.includes("<title>"), `${slug}: missing static metadata`);
  assert.ok(!html.includes("__NEXT_DATA__"), `${slug}: unexpected Next runtime`);
}
const home = readFileSync(join(root, "index.html"), "utf8");
for (const text of ["Real Web3 Way", "Supported Extension Wallets", "Streamlined Design and Easy Configuration", "Tailored for every Dapp scenario"]) {
  assert.ok(home.includes(text), `Homepage content must be available without JavaScript: ${text}`);
}
const files = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else files.push(path);
  }
}
walk(root);
assert.ok(files.some(file => /search_index\.en\..*\.json$/.test(file)), "Missing local search index");
assert.ok(!files.some(file => file.endsWith(".map")), "Source maps must not be published");
assert.deepEqual(JSON.parse(readFileSync(join(root, "api/ping.json"), "utf8")), { message: "pong" }, "Static health check must preserve the existing response");
console.log("Static docs: seven routes, existing anchors, prerendered homepage, local search, health check, no source maps — PASS");
