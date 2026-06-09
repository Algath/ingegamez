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

async function searchGame(name) {
  const data = await fetchXml(`${BASE}/search?query=${encodeURIComponent(name)}&type=boardgame&exact=1`);

  // Si exact ne donne rien, on refait sans le flag
  const items = data.items?.item;
  if (!items) {
    const fallback = await fetchXml(`${BASE}/search?query=${encodeURIComponent(name)}&type=boardgame`);
    const fallbackItems = fallback.items?.item;
    if (!fallbackItems) throw new Error(`Aucun jeu trouvé pour "${name}"`);
    // Prend le premier résultat si plusieurs
    return Array.isArray(fallbackItems) ? fallbackItems[0].$.id : fallbackItems.$.id;
  }

  return Array.isArray(items) ? items[0].$.id : items.$.id;
}

export async function fetchGameByName(name) {
  const id = await searchGame(name);
  const data = await fetchXml(`${BASE}/thing?id=${id}&stats=1`);
  const item = data.items.item;

  // Le nom peut être un tableau (versions localisées) ou un objet unique
  const names = Array.isArray(item.name) ? item.name : [item.name];
  const primaryName = names.find(n => n.$.type === 'primary')?.$.value ?? name;

  const rating = parseFloat(item.statistics?.ratings?.average?.$.value);

  return {
    bggId: String(id),
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
