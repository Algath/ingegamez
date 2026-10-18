// Convertit les images de public/posts et public/gallery en WebP et met à jour la base.
//   node optimizeImages.js              → convertit, supprime les originaux, met à jour MongoDB
//   node optimizeImages.js --dry-run    → affiche seulement ce qui serait fait
//   node optimizeImages.js --no-db      → convertit les fichiers sans toucher à la base
import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Post from './models/Post.js';
import GalleryImage from './models/GalleryImage.js';
import { toWebp, webpName, CONVERTIBLE } from './services/images.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, '../public');
const DIRS = ['posts', 'gallery'];

const DRY_RUN = process.argv.includes('--dry-run');
const NO_DB = process.argv.includes('--no-db');

const kb = (n) => `${Math.round(n / 1024)} ko`;

async function run() {
  const renamed = {};   // "/posts/a.png" → "/posts/a.webp"
  let before = 0, after = 0;

  for (const dir of DIRS) {
    const abs = path.join(PUBLIC, dir);
    if (!fs.existsSync(abs)) continue;

    for (const file of fs.readdirSync(abs).filter((f) => CONVERTIBLE.test(f))) {
      const src = path.join(abs, file);
      const out = webpName(file);
      const size = fs.statSync(src).size;
      before += size;

      if (DRY_RUN) { console.log(`  ${dir}/${file} (${kb(size)}) → ${out}`); continue; }

      const buf = await toWebp(src);
      fs.writeFileSync(path.join(abs, out), buf);
      fs.unlinkSync(src);
      after += buf.length;
      renamed[`/${dir}/${file}`] = `/${dir}/${out}`;
      console.log(`  ✓ ${dir}/${file}  ${kb(size)} → ${kb(buf.length)}`);
    }
  }

  const count = Object.keys(renamed).length;
  if (DRY_RUN || count === 0) {
    console.log(DRY_RUN ? `\n(dry-run) ${kb(before)} à convertir.` : '\nRien à convertir.');
    return;
  }
  console.log(`\n${count} image(s) : ${kb(before)} → ${kb(after)}`);

  if (NO_DB) return;
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI manquant (ou lance avec --no-db)');
  await mongoose.connect(process.env.MONGO_URI);

  let posts = 0, gallery = 0;
  for (const [from, to] of Object.entries(renamed)) {
    posts += (await Post.updateMany({ image: from }, { $set: { image: to } })).modifiedCount;
    gallery += (await GalleryImage.updateMany({ url: from }, { $set: { url: to } })).modifiedCount;
  }
  console.log(`Base mise à jour : ${posts} post(s), ${gallery} image(s) de galerie.`);
  await mongoose.disconnect();
}

run().catch((err) => { console.error('Erreur optimisation :', err); process.exit(1); });
