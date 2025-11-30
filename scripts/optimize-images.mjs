import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');

const exts = new Set(['.png', '.jpg', '.jpeg', '.svg']);

const plugins = (ext) => {
  if (ext === '.png') {
    return [
      imageminPngquant({ quality: [0.6, 0.8], strip: true }),
    ];
  }
  if (ext === '.jpg' || ext === '.jpeg') {
    return [
      imageminMozjpeg({ quality: 77 }),
    ];
  }
  if (ext === '.svg') {
    return [
      imageminSvgo({ multipass: true }),
    ];
  }
  return [];
};

let optimizedCount = 0;
let totalSaved = 0;

async function optimizeFile(file) {
  const ext = path.extname(file).toLowerCase();
  const list = plugins(ext);
  if (!list.length) return;
  const buf = fs.readFileSync(file);
  const before = buf.length;
  const result = await imagemin.buffer(buf, { plugins: list });
  const after = result.length;
  if (after < before) {
    fs.writeFileSync(file, result);
    optimizedCount++;
    totalSaved += (before - after);
    console.log(`Optimized: ${path.relative(publicDir, file)} (-${((before - after)/1024).toFixed(1)} KB)`);
  }
}

async function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      await walk(full);
    } else {
      const ext = path.extname(e.name).toLowerCase();
      if (exts.has(ext)) {
        await optimizeFile(full);
      }
    }
  }
}

(async () => {
  if (!fs.existsSync(publicDir)) {
    console.error('public directory not found');
    process.exit(1);
  }
  await walk(publicDir);
  console.log(`\nImages optimized: ${optimizedCount}, saved: ${(totalSaved/1024).toFixed(1)} KB`);
})();

