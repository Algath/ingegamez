import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Post from './models/Post.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_POSTS = path.join(__dirname, '../public/posts');

const WP = 'https://ingegamez.isc-vs.ch/?rest_route=/wp/v2';
const CATEGORY_MAP = { 9: 'Thursday Games', 10: 'Events', 11: 'Pixel Jam', 31: 'Pixel Lan' };
const CATEGORY_PRIORITY = [11, 31, 10, 9]; // Pixel Jam / Pixel Lan / Events / Thursday Games (du + spécifique au + générique)
const FALLBACK_IMAGE = { 'Pixel Jam': '/posts/pixel_jam_2026.png' }; // si l'image est protégée côté API WP
const MONTHS_BACK = 3;          // on importe les posts des N derniers mois
const PER_PAGE = 30;

// --- helpers -----------------------------------------------------------
function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// décode les entités HTML les plus courantes + retire les balises
function cleanText(html) {
  return html
    .replace(/<[^>]*>/g, '')                                   // balises
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n))    // entités numériques (&#8230; …)
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '…')
    .replace(/&rsquo;/g, '’')
    .replace(/&laquo;|&raquo;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

// comme cleanText mais préserve les sauts de paragraphe (pour le contenu complet)
function cleanContent(html) {
  return html
    .replace(/<\/(p|div|h[1-6]|li|blockquote)>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<li[^>]*>/gi, '• ')
    .replace(/<[^>]*>/g, '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n))
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '…')
    .replace(/&rsquo;/g, '’')
    .replace(/&laquo;|&raquo;/g, '"')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

async function downloadImage(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Image ${url} → ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const filename = path.basename(new URL(url).pathname);
  fs.writeFileSync(path.join(PUBLIC_POSTS, filename), buf);
  return `/posts/${filename}`;
}

// --- import ------------------------------------------------------------
async function run() {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI manquant (lance avec MONGO_URI=... node importFromWP.js)');
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connecté');
  fs.mkdirSync(PUBLIC_POSTS, { recursive: true });

  // repart propre : retire les posts déjà importés du site officiel (marqueur author),
  // sans toucher au seed ni aux posts créés via l'admin
  const removed = await Post.deleteMany({ author: 'IngéGamEZ' });
  console.log(`(${removed.deletedCount} ancien(s) post(s) importé(s) supprimé(s))`);

  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - MONTHS_BACK);

  const res = await fetch(`${WP}/posts&per_page=${PER_PAGE}&_embed`);
  const posts = await res.json();
  let imported = 0;

  for (const p of posts) {
    const date = new Date(p.date);
    if (date < cutoff) continue;   // hors fenêtre (N derniers mois)

    const catId = CATEGORY_PRIORITY.find((id) => (p.categories || []).includes(id));
    const category = CATEGORY_MAP[catId] || 'Thursday Games';

    let image = null;
    const media = p._embedded?.['wp:featuredmedia']?.[0];
    if (media?.source_url) {
      try { image = await downloadImage(media.source_url); }
      catch (e) { console.warn('  ⚠ image:', e.message); }
    }
    // image protégée côté API WP → repli par catégorie
    if (!image) image = FALLBACK_IMAGE[category] || null;

    const post = {
      title: cleanText(p.title.rendered),
      date: date.toLocaleDateString('fr-CH', { year: 'numeric', month: 'long', day: 'numeric' }),
      category,
      author: 'IngéGamEZ',
      image,
      description: cleanText(p.excerpt.rendered),
      content: cleanContent(p.content.rendered),
      slug: p.slug || slugify(p.title.rendered),
    };

    await Post.findOneAndUpdate(
      { slug: post.slug },
      { $set: post },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    imported++;
    console.log(`  ✓ ${post.title}  [${post.category}]  ${image ?? '(sans image)'}`);
  }

  console.log(`\n${imported} post(s) importé(s).`);
  await mongoose.disconnect();
}

run().catch((err) => { console.error('Erreur import :', err); process.exit(1); });
