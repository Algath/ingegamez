import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Post from './models/Post.js';
import { toWebp, webpName } from './services/images.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_POSTS = path.join(__dirname, '../public/posts');

const WP = 'https://ingegamez.isc-vs.ch/?rest_route=/wp/v2';
const CATEGORY_MAP = { 9: 'Thursday Games', 10: 'Events', 11: 'Pixel Jam', 31: 'Pixel Lan' };
const CATEGORY_PRIORITY = [11, 31, 10, 9]; // Pixel Jam / Pixel Lan / Events / Thursday Games (du + spécifique au + générique)
const FALLBACK_IMAGE = { 'Pixel Jam': '/posts/pixel_jam_2026.webp' }; // si l'image est protégée côté API WP
// date de début optionnelle : node importFromWP.js 2026-06-01 (par défaut : tout le site)
const SINCE = process.argv[2] ? new Date(process.argv[2]) : null;
const PER_PAGE = 100;

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
  // WP réutilise les mêmes noms (image.png…) d'un mois à l'autre → préfixe AAAA-MM
  const pathname = decodeURIComponent(new URL(url).pathname);
  const ym = pathname.match(/\/uploads\/(\d{4})\/(\d{2})\//);
  const filename = webpName((ym ? `${ym[1]}-${ym[2]}-` : '') + path.basename(pathname));
  fs.writeFileSync(path.join(PUBLIC_POSTS, filename), await toWebp(buf));
  return `/posts/${filename}`;
}

// --- import ------------------------------------------------------------
async function run() {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI manquant (lance avec MONGO_URI=... node importFromWP.js)');
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connecté');
  fs.mkdirSync(PUBLIC_POSTS, { recursive: true });

  // upsert par slug : les posts existants sont mis à jour, rien n'est supprimé
  const posts = [];
  for (let page = 1; ; page++) {
    const res = await fetch(`${WP}/posts&per_page=${PER_PAGE}&page=${page}&_embed`);
    if (!res.ok) throw new Error(`API WP → ${res.status}`);
    posts.push(...await res.json());
    if (page >= Number(res.headers.get('x-wp-totalpages') || 1)) break;
  }
  let imported = 0;

  for (const p of posts) {
    const date = new Date(p.date);
    if (SINCE && date < SINCE) continue;

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
      publishedAt: date,
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
