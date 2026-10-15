const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createRequire } = require('node:module');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');
const sharp = createRequire(path.join(__dirname, '../site/doc/package.json'))('sharp');
const generateFallbacks = require('./generate-webp-fallbacks.cjs');

test('PNG fallbacks preserve decoded pixels, alpha, originals and deterministic output', async (t) => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'webp-fallback-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const nested = path.join(directory, 'nested');
  fs.mkdirSync(nested);
  const original = await sharp({ create: { width: 2, height: 3, channels: 4,
    background: { r: 120, g: 80, b: 40, alpha: 0.5 } } }).webp({ lossless: true }).toBuffer();
  const files = [path.join(directory, 'hero.webp'), path.join(nested, 'background.WEBP')];
  for (const file of files) fs.writeFileSync(file, original);
  const existing = path.join(directory, 'original.png');
  fs.writeFileSync(existing, 'untouched');
  fs.symlinkSync(files[0], path.join(directory, 'symlink.webp'));

  assert.deepEqual(await generateFallbacks([directory]), { files: 2 });
  const encoded = [];
  for (const file of files) {
    const fallback = file.replace(/\.webp$/i, '.fallback.png');
    assert.deepEqual(fs.readFileSync(file), original);
    encoded.push(fs.readFileSync(fallback));
    const metadata = await sharp(fallback).metadata();
    assert.equal(metadata.format, 'png');
    assert.equal(metadata.width, 2);
    assert.equal(metadata.height, 3);
    assert.equal(metadata.hasAlpha, true);
    assert.deepEqual(await sharp(fallback).raw().toBuffer(), await sharp(file).raw().toBuffer());
  }
  assert.equal(fs.readFileSync(existing, 'utf8'), 'untouched');
  assert.equal(fs.existsSync(path.join(directory, 'symlink.fallback.png')), false);
  await generateFallbacks([directory]);
  files.forEach((file, index) => assert.deepEqual(fs.readFileSync(file.replace(/\.webp$/i, '.fallback.png')), encoded[index]));
});

test('invalid input fails the CLI without writing a fallback', (t) => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'webp-fallback-invalid-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  fs.writeFileSync(path.join(directory, 'bad.webp'), 'not an image');
  const result = spawnSync(process.execPath, [path.join(__dirname, 'generate-webp-fallbacks.cjs'), directory], { encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /image|format/i);
  assert.equal(fs.existsSync(path.join(directory, 'bad.fallback.png')), false);
});

test('missing input directory fails the CLI', () => {
  const result = spawnSync(process.execPath, [path.join(__dirname, 'generate-webp-fallbacks.cjs'), path.join(os.tmpdir(), 'webp-fallback-does-not-exist')], { encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /ENOENT/);
});

test('animated WebP fails instead of silently dropping frames', async (t) => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'webp-fallback-animated-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const animated = await sharp(Buffer.from([255, 0, 0, 255, 0, 0, 255, 255]), {
    raw: { width: 1, height: 2, channels: 4, pageHeight: 1 },
  }).webp({ lossless: true, delay: [100, 100], loop: 0 }).toBuffer();
  assert.equal((await sharp(animated).metadata()).pages, 2);
  fs.writeFileSync(path.join(directory, 'animated.webp'), animated);
  await assert.rejects(generateFallbacks([directory]), /Animated WebP needs an animated fallback/);
  assert.equal(fs.existsSync(path.join(directory, 'animated.fallback.png')), false);
});
