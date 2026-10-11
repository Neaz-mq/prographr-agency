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