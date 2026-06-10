import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import GalleryImage from './models/GalleryImage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_GALLERY = path.join(__dirname, '../public/gallery');
const BASE = 'https://ingegamez.isc-vs.ch/wp-content/uploads/';

// Sélection curée (année + catégorie déduites du site officiel)
const GALLERY = [
  // --- Pixel Jam 2025 (carrousel 453) ---
  ...['1', '2', '3', '4', '5', '6', '7', '8'].map((n) => ({
    year: 2025, category: 'Pixel Jam', file: `2025/03/PixelJam2025-${n}-scaled.jpeg`,
  })),
  // --- Pixel Lan 2025 (carrousel 434) ---
  ...['20251025_175554', '20251025_175625', '20251025_175637'].map((n) => ({
    year: 2025, category: 'Pixel Lan', file: `2025/10/${n}-scaled.jpg`,
  })),
  ...['2131763870', '2059816425', '2010383162', '1546046589', '1458424973'].map((n) => ({
    year: 2025, category: 'Pixel Lan', file: `2025/10/Snapchat-${n}-rotated.jpg`,
  })),
  // --- Pixel Jam 2026 (carrousel 454) ---
  ...['4', '11', '40', '43', '59'].map((n) => ({
    year: 2026, category: 'Pixel Jam', file: `2025/10/pixeljam_2026__${n}-scaled.jpg`,
  })),
  ...['IMG_6114', 'IMG_6155', 'IMG_6260'].map((n) => ({
    year: 2026, category: 'Pixel Jam', file: `2025/10/${n}-scaled.jpg`,
  })),
];

// alt = nom du fichier (sans extension ni suffixes WP -scaled/-rotated)
function altFromFile(file) {
  return path.basename(file).replace(/\.[^.]+$/, '').replace(/-(scaled|rotated)$/g, '');
}

async function downloadImage(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const filename = path.basename(new URL(url).pathname);
  fs.writeFileSync(path.join(PUBLIC_GALLERY, filename), buf);
  return `/gallery/${filename}`;
}

async function run() {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI manquant (lance avec MONGO_URI=... node importGalleryFromWP.js)');
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connecté');
  fs.mkdirSync(PUBLIC_GALLERY, { recursive: true });

  // repart propre : retire les entrées galerie déjà importées (évite les orphelins après recatégorisation)
  const removed = await GalleryImage.deleteMany({ url: { $regex: '^/gallery/' } });
  console.log(`(${removed.deletedCount} ancienne(s) entrée(s) galerie supprimée(s))`);

  let n = 0;
  for (const g of GALLERY) {
    let localUrl;
    try { localUrl = await downloadImage(BASE + g.file); }
    catch (e) { console.warn('  ⚠', e.message); continue; }

    const alt = altFromFile(g.file);
    await GalleryImage.findOneAndUpdate(
      { url: localUrl },
      { $set: { url: localUrl, alt, year: g.year, category: g.category } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    n++;
    console.log(`  ✓ ${g.category} ${g.year} — ${alt}`);
  }

  console.log(`\n${n} image(s) de galerie importée(s).`);
  await mongoose.disconnect();
}

run().catch((err) => { console.error('Erreur import galerie :', err); process.exit(1); });
