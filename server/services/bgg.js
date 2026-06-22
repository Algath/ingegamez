import { parseStringPromise } from 'xml2js';

const BASE = 'https://boardgamegeek.com/xmlapi2';

async function fetchXml(url) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.BGG_TOKEN}`,
    },
  });
  if (!res.ok) throw new Error(`BGG API error: ${res.status}`);
  const xml = await res.text();
  return parseStringPromise(xml, { explicitArray: false });
}

// Recherche → liste de candidats (pour laisser l'admin choisir le bon jeu)
export async function searchGames(name) {
  const data = await fetchXml(`${BASE}/search?query=${encodeURIComponent(name)}&type=boardgame`);
  let items = data.items?.item;
  if (!items) return [];
  if (!Array.isArray(items)) items = [items];

  // on limite pour ne pas faire un appel "thing" trop lourd
  const candidates = items.slice(0, 12).map((it) => {
    const nameObj = Array.isArray(it.name) ? it.name[0] : it.name;
    return {
      bggId: String(it.$.id),
      name: nameObj?.$?.value ?? '(sans nom)',
      yearPublished: parseInt(it.yearpublished?.$?.value) || null,
      thumbnail: null,
    };
  });

  // un seul appel "thing" (ids séparés par des virgules) pour récupérer les miniatures
  try {
    const ids = candidates.map((g) => g.bggId).join(',');
    const things = await fetchXml(`${BASE}/thing?id=${ids}`);
    let thingItems = things.items?.item;
    if (thingItems) {
      if (!Array.isArray(thingItems)) thingItems = [thingItems];
      const thumbById = {};
      for (const t of thingItems) thumbById[String(t.$.id)] = t.thumbnail ?? null;
      for (const g of candidates) g.thumbnail = thumbById[g.bggId] ?? null;
    }
  } catch {
    // miniatures indisponibles → on renvoie quand même les résultats
  }

  return candidates;
}

// Détails complets d'un jeu à partir de son bggId
export async function fetchGameById(bggId) {
  const data = await fetchXml(`${BASE}/thing?id=${bggId}&stats=1`);
  const item = data.items.item;

  // Le nom peut être un tableau (versions localisées) ou un objet unique
  const names = Array.isArray(item.name) ? item.name : [item.name];
  const primaryName = names.find((n) => n.$.type === 'primary')?.$.value ?? '';

  const rating = parseFloat(item.statistics?.ratings?.average?.$.value);

  return {
    bggId: String(bggId),
    name: primaryName,
    yearPublished: parseInt(item.yearpublished?.$.value) || null,
    description: item.description?.replace(/&#10;/g, '\n').trim() ?? null,
    thumbnail: item.thumbnail ?? null,
    image: item.image ?? null,
    minPlayers: parseInt(item.minplayers?.$.value) || null,
    maxPlayers: parseInt(item.maxplayers?.$.value) || null,
    playingTime: parseInt(item.playingtime?.$.value) || null,
    rating: isNaN(rating) ? null : Math.round(rating * 10) / 10,
  };
}

// (compatibilité) recherche par nom + premier résultat
export async function fetchGameByName(name) {
  const results = await searchGames(name);
  if (!results.length) throw new Error(`Aucun jeu trouvé pour "${name}"`);
  return fetchGameById(results[0].bggId);
}
