const fs = require('node:fs');
const path = require('node:path');
const { gzipSync } = require('node:zlib');

function precompress(directory) {
  const result = { files: 0, originalBytes: 0, gzipBytes: 0 };
  function walk(folder) {
    for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
      const file = path.join(folder, entry.name);
      if (entry.isDirectory()) {
        walk(file);
      } else if (entry.isFile() && /\.(?:html|css|js|mjs|json|svg|xml|txt|wasm)$/.test(entry.name)) {
        const stat = fs.statSync(file);
        const body = fs.readFileSync(file);
        const compressed = body.length >= 256 ? gzipSync(body, { level: 9 }) : null;
        if (!compressed || compressed.length >= body.length) {
          fs.rmSync(`${file}.gz`, { force: true });
          continue;
        }
        fs.writeFileSync(`${file}.gz`, compressed);
        fs.utimesSync(`${file}.gz`, stat.atime, stat.mtime);
        result.files++;
        result.originalBytes += body.length;
        result.gzipBytes += compressed.length;
      }
    }
  }
  walk(directory);
  return result;
}

module.exports = precompress;
if (require.main === module) {
  if (!process.argv[2]) throw new Error('Usage: node precompress-static.cjs <output-directory>');
  console.log(JSON.stringify(precompress(path.resolve(process.argv[2]))));
}
