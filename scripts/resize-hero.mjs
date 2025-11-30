import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const src = path.join(root, 'public/images/hero/laptop-slider.png');
const out = path.join(root, 'public/images/hero/laptop-slider-1080.png');

async function run() {
  if (!fs.existsSync(src)) {
    console.error('Source not found:', src);
    process.exit(1);
  }
  await sharp(src).resize({ width: 1080 }).png({ quality: 80 }).toFile(out);
  console.log('Generated:', out);
}

run();
