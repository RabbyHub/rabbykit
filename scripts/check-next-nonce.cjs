const assert = require("node:assert/strict");
const { createRequire } = require("node:module");
const { resolve } = require("node:path");

const apps = ["site/doc", "examples/next-wagmi"];
const invalidNonces = [
  ["double quote", 'probe"data-cve-probe=1'],
  ["single quote", "probe'value"],
  ["angle brackets", "probe<value>"],
  ["ampersand", "probe&value"],
  ["tab", "probe\tvalue"],
  ["newline", "probe\nvalue"],
  ["carriage return", "probe\rvalue"],
  ["null", "probe\0value"],
  ["backtick", "probe`value"],
];

async function checkApp(app) {
  const appRequire = createRequire(resolve(__dirname, "..", app, "package.json"));
  const version = appRequire("next/package.json").version;
  const { getScriptNonceFromHeader } = appRequire(
    "next/dist/server/app-render/get-script-nonce-from-header.js"
  );
  const { createInlinedDataReadableStream } = appRequire(
    "next/dist/server/app-render/use-flight-response.js"
  );
  async function render(nonce) {
    const flight = new ReadableStream({ start(controller) { controller.close(); } });
    return new Response(createInlinedDataReadableStream(flight, nonce, null)).text();
  }

  const failures = [];
  const valid = "dGVzdA==";
  assert.equal(getScriptNonceFromHeader(`script-src 'nonce-${valid}'`), valid);
  assert.match(await render(valid), /<script nonce="dGVzdA==">/);
  for (const [label, value] of invalidNonces) {
    // Repetition also catches stateful global-regexp validation bypasses.
    for (let attempt = 1; attempt <= 3; attempt++) {
      let nonce;
      try {
        nonce = getScriptNonceFromHeader(`script-src 'nonce-${value}'`);
      } catch {
        continue; // Rejecting malformed CSP is an acceptable outcome.
      }
      const html = await render(nonce);
      if (nonce !== undefined || /<script\b[^>]*\bnonce=/.test(html)) {
        failures.push(`${label}, attempt ${attempt}: malformed nonce was accepted`);
      }
    }
  }
  console.log(`${app}: next@${version}, ${failures.length ? "FAIL" : "PASS"}`);
  for (const failure of failures) console.error(`  ${failure}`);
  return failures.length;
}

(async () => {
  let failures = 0;
  for (const app of apps) failures += await checkApp(app);
  if (failures) process.exitCode = 1;
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
