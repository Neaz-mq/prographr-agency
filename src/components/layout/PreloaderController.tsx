"use client";

import { useEffect } from "react";

const MIN_VISIBLE = 4300; // entry animation shesh hobar por-o ektu thake, jate logo ta bhalo kore dekha jay
const MAX_VISIBLE = 8000; // internet khub slow hole-o ete-i chole jabe, user atke thakbe na
const EXIT_FALLBACK_MS = 3000; // overlay-r `pl-out` animationend kono karone na fire hole eto pore-i zor kore shesh kora hobe

/* Preloader-er "brain":
   - Page load + font ready + minimum time, tinta-i hole exit animation chalay
   - Preloader cholar shomoy scroll bondho, ar hero/section-er load animation pause kore rakhe (jate user miss na kore)
   - Overlay-r fade-out (`pl-out`) shotti shesh hole-i hero animation gulo shuru hoy, jate reveal ta overlay-r niche miss na hoy.
     (Timer na, animationend e bind kora, tai globals.css-e exit-er timing bodlale ekhane kichu bodlate hoy na) */
export function PreloaderController() {
  useEffect(() => {
    const el = document.getElementById("preloader");
    const root = document.documentElement;
    if (!el) {
      root.removeAttribute("data-preloading");
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    let finished = false;

    /* Scroll lock: `overflow: hidden` diye na. Oita korle scrollbar chole jay, release hole fire ashe, ar puro layout ~15px bame shore jay (Windows).
       Tai wheel / touch / keyboard / scrollbar-drag block kori, scrollbar-ta jayga-y thake. Capture phase-e atkai, jate Lenis-o shuntey na pay. */
    const scrollY0 = window.scrollY;
    const block = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const SCROLL_KEYS = new Set([" ", "PageUp", "PageDown", "Home", "End", "ArrowUp", "ArrowDown"]);
    const onKey = (e: KeyboardEvent) => {
      if (SCROLL_KEYS.has(e.key)) block(e);
    };
    const onScroll = () => {
      if (window.scrollY !== scrollY0) window.scrollTo(0, scrollY0);
    };
    const opts = { capture: true, passive: false } as const;
    window.addEventListener("wheel", block, opts);
    window.addEventListener("touchmove", block, opts);
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("scroll", onScroll);

    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      root.removeAttribute("data-preloading");
      window.removeEventListener("wheel", block, opts);
      window.removeEventListener("touchmove", block, opts);
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("scroll", onScroll);
    };

    const finish = () => {
      if (finished) return;
      finished = true;

      if (reduced) {
        el.hidden = true;
        release();
        return;
      }
      const done = () => {
        el.hidden = true;
        release();
      };
      el.addEventListener(
        "animationend",
        (e) => {
          if (e.target === el && e.animationName === "pl-out") done();
        }
      );
      el.dataset.state = "exit";
      timers.push(window.setTimeout(done, EXIT_FALLBACK_MS));
    };

    // animation SSR HTML-er first paint theke shuru hoyeche, tai shei somoy theke minimum ta gonbo
    const firstPaint = performance.getEntriesByName("first-paint")[0]?.startTime ?? 0;
    const minWait = Math.max(0, (reduced ? 500 : MIN_VISIBLE) - (performance.now() - firstPaint));

    const minDone = new Promise<void>((resolve) => timers.push(window.setTimeout(resolve, minWait)));
    const loaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });
    const fontsReady = document.fonts?.ready.then(() => undefined) ?? Promise.resolve();

    Promise.all([minDone, loaded, fontsReady]).then(finish);
    timers.push(window.setTimeout(finish, MAX_VISIBLE));

    // Back/forward (bfcache) diye fire ashle abar preloader dekhano hobe na
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        finished = true;
        el.hidden = true;
        release();
      }
    };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener("pageshow", onPageShow);
      release();
    };
  }, []);

  return null;
}
