const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const sharp = createRequire(path.join(__dirname, '../site/doc/package.json'))('sharp');

async function generateFallbacks(directories) {
  let files = 0;
  async function walk(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await walk(file);
      } else if (entry.isFile() && /\.webp$/i.test(entry.name)) {
        const image = sharp(file);
        if ((await image.metadata()).pages > 1) {
          throw new Error(`Animated WebP needs an animated fallback: ${file}`);
        }
        const png = await image.png({ compressionLevel: 9 }).toBuffer();
        fs.writeFileSync(file.replace(/\.webp$/i, '.fallback.png'), png);
        files++;
      }
    }
  }
  for (const directory of directories) await walk(directory);
  return { files };
}

module.exports = generateFallbacks;
if (require.main === module) {
  const directories = process.argv.slice(2);
  generateFallbacks(directories.length ? directories : [
    path.join(__dirname, '../site/doc/public'),
    path.join(__dirname, '../site/doc/src'),
  ]).then((result) => console.log(JSON.stringify(result))).catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
