const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { gunzipSync } = require('node:zlib');
const test = require('node:test');

test('precompression preserves assets, timestamps and deterministic gzip with safe reruns', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'static-gzip-test-'));
  const script = path.join(__dirname, 'precompress-static.cjs');
  try {
    fs.mkdirSync(path.join(root, 'assets'));
    const bodies = {
      'index.html': Buffer.from('<p>Static documentation</p>'.repeat(300)),
      'assets/site.js': Buffer.from('export const text = "documentation";\n'.repeat(300)),
      'assets/icon.svg': Buffer.from('<svg><path d="M0 0"/></svg>'.repeat(30)),
      'assets/tiny.css': Buffer.from('body { color: black; }'),
      'hero.webp': Buffer.from('already compressed image'.repeat(300)),
    };
    for (const [name, body] of Object.entries(bodies)) fs.writeFileSync(path.join(root, name), body);
    fs.utimesSync(path.join(root, 'index.html'), 1700000000, 1700000000);
    fs.writeFileSync(path.join(root, 'assets/tiny.css.gz'), 'stale gzip');
    const run = () => {
      const result = spawnSync(process.execPath, [script, root], { encoding: 'utf8' });
      assert.equal(result.status, 0, result.stderr);
      assert.equal(JSON.parse(result.stdout).files, 3);
    };
    run();
    const first = fs.readFileSync(path.join(root, 'index.html.gz'));
    run();
    assert.deepEqual(fs.readFileSync(path.join(root, 'index.html.gz')), first);
    for (const [name, body] of Object.entries(bodies)) assert.deepEqual(fs.readFileSync(path.join(root, name)), body);
    for (const name of ['index.html', 'assets/site.js', 'assets/icon.svg']) {
      assert.deepEqual(gunzipSync(fs.readFileSync(path.join(root, `${name}.gz`))), bodies[name]);
      assert.ok(Math.abs(fs.statSync(path.join(root, name)).mtimeMs - fs.statSync(path.join(root, `${name}.gz`)).mtimeMs) < 1);
    }
    assert.equal(fs.existsSync(path.join(root, 'hero.webp.gz')), false);
    assert.equal(fs.existsSync(path.join(root, 'assets/tiny.css.gz')), false);
    assert.notEqual(spawnSync(process.execPath, [script, path.join(root, 'missing')]).status, 0);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
