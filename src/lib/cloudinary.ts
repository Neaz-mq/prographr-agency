// Cloud name secret na, public URL-er-i ongsho
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dzi3u164c";

type LoaderArgs = { src: string; width: number; quality?: number };

/**
 * next/image-er custom loader.
 * f_auto = browser onujayi WebP/AVIF, q_auto:good = quality-size balance (UI screenshot-er text sharp thake),
 * c_limit = shudhu choto kora hobe, boro kora hobe na, w_ = jotota dorkar
 */
export function cloudinaryLoader({ src, width, quality }: LoaderArgs) {
  const id = src.replace(/^\//, "");
  const q = quality ? `q_${quality}` : "q_auto:good";
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,${q},c_limit,w_${width}/${id}`;
}

/**
 * Showcase (Figma frame export) image-er jonno: e_trim diye PNG-er charpashe-r faka/transparent ongsho Cloudinary-te kete dey,
 * tai image-er pashe ar upore-niche onojaniyo gap thake na. e_trim ALADA component (age apply hoy), tarpor resize.
 */
export function cloudinaryTrimLoader({ src, width, quality }: LoaderArgs) {
  const id = src.replace(/^\//, "");
  const q = quality ? `q_${quality}` : "q_auto:good";
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/e_trim/f_auto,${q},c_limit,w_${width}/${id}`;
}

/**
 * Shadow-shoho image-er jonno: e_trim:<tolerance>. Default e_trim (tolerance 10) shudhu ekdom shada/transparent edge kate,
 * kintu soft shadow-r halka pixel gulo kate na. Tolerance barale (0-100) shadow-o kete jay. Boro korle image-er bhitore-r halka rong-o kete jete pare, tai 20 -> 30 -> 40 kore dekho.
 * Loader gulo cache kora, jeno protibar notun function reference toiri hoye next/image re-render na kore.
 */
const trimLoaders = new Map<number, (args: LoaderArgs) => string>();

export function cloudinaryTrimLoaderWith(tolerance: number) {
  let loader = trimLoaders.get(tolerance);
  if (!loader) {
    loader = ({ src, width, quality }: LoaderArgs) => {
      const id = src.replace(/^\//, "");
      const q = quality ? `q_${quality}` : "q_auto:good";
      return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/e_trim:${tolerance}/f_auto,${q},c_limit,w_${width}/${id}`;
    };
    trimLoaders.set(tolerance, loader);
  }
  return loader;
}