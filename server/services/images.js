import sharp from 'sharp';

export const MAX_WIDTH = 1600;   // largeur max (px), suffisant pour un affichage plein écran
export const QUALITY = 80;       // qualité WebP (0-100)

export const CONVERTIBLE = /\.(png|jpe?g|avif|gif|tiff?)$/i;

// convertit un buffer (ou un chemin) en WebP redimensionné ; renvoie un Buffer
export function toWebp(input) {
  return sharp(input, { animated: true })
    .rotate()                                            // respecte l'orientation EXIF
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer();
}

// "photo.png" → "photo.webp"
export function webpName(filename) {
  return filename.replace(CONVERTIBLE, '.webp');
}
