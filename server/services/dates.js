// Les dates des posts sont stockées en texte, dans plusieurs formats :
//   "2026-10-18" (admin, <input type="date">), "15 octobre 2026" (import WP), "December 25, 2025" (seed)
// parsePostDate les convertit en Date pour pouvoir trier ; renvoie null si le format est inconnu.
const FR_MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

export function parsePostDate(str) {
  if (!str) return null;
  const fr = str.trim().toLowerCase().match(/^(\d{1,2})(?:er)? ([a-zéû]+) (\d{4})$/);
  if (fr) {
    const month = FR_MONTHS.indexOf(fr[2]);
    if (month >= 0) return new Date(Date.UTC(Number(fr[3]), month, Number(fr[1])));
  }
  const d = new Date(str);   // ISO et formats anglais
  return isNaN(d) ? null : d;
}
