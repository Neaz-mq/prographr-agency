import type { ImageLoaderProps } from "next/image";

/**
 * Unsplash-er jonno next/image loader (Cloudinary loader-er moto).
 * `src` = "photo-xxxxxxxxxx-xxxxxxxxxxxx" (images.unsplash.com-er por-er ongsho).
 * Custom loader, tai next.config.ts-e remotePatterns lagbe na.
 * auto=format = browser onujayi WebP/AVIF, fit=crop = size-e crop, w = jotota dorkar
 */
export function unsplashLoader({ src, width, quality }: ImageLoaderProps) {
  return `https://images.unsplash.com/${src}?auto=format&fit=crop&q=${quality ?? 75}&w=${width}`;
}