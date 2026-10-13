import type { CSSProperties } from "react";

type RevealOptions = {
  /** animation koto ms dhore cholbe (default css-e 700ms, `reveal-up`-e 900ms) */
  duration?: number;
  /** shuru-te koto px blur thakbe (default 10). `.reveal`-e kaj kore, `.reveal-up`-e na */
  blur?: number;
  /** shuru-te niche theke koto px uthe ashbe (default 0) */
  y?: number;
  /** shuru-te left/right theke koto px dure thakbe. Negative = left theke ashbe (default -14, `.slide-in-left`-e) */
  x?: number;
};

/* globals.css-er `.reveal` / `.reveal-up` er jonno inline CSS variable toiri kore.
   Use: <p className="reveal" style={reveal(650, { blur: 6 })}> */
export function reveal(delay: number, { duration, blur, y, x }: RevealOptions = {}): CSSProperties {
  const vars: Record<string, string> = { "--reveal-delay": `${delay}ms` };
  if (duration !== undefined) vars["--reveal-dur"] = `${duration}ms`;
  if (blur !== undefined) vars["--reveal-blur"] = `${blur}px`;
  if (y !== undefined) vars["--reveal-y"] = `${y}px`;
  if (x !== undefined) vars["--reveal-x"] = `${x}px`;
  return vars as CSSProperties;
}