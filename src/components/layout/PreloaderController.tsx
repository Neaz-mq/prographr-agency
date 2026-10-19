"use client";

import { useEffect } from "react";

const MIN_VISIBLE = 3400; // entry animation shesh hobar por-o ektu thake, jate logo ta bhalo kore dekha jay
const MAX_VISIBLE = 6000; // internet khub slow hole-o ete-i chole jabe, user atke thakbe na
const REVEAL_LEAD_MS = 250; // curtain soro shuru howar koto ms pore page-er reveal animation shuru hobe (curtain-er edge upore header-er jayga chhariye jawar por, jate reveal ta curtain-er niche na hariye jay)
const EXIT_FALLBACK_MS = 3500; // overlay-r `pl-out` animationend kono karone na fire hole eto pore-i zor kore shesh kora hobe (exit animation ~2550ms, tai ekhane tar cheye beshi)

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

    // data-preloading shorle hero/nav/section-er load animation gulo shuru hoy
    const unpause = () => root.removeAttribute("data-preloading");

    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      unpause();
      window.removeEventListener("wheel", block, opts);
      window.removeEventListener("touchmove", block, opts);
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("scroll", onScroll);
    };

    /* Logo-morph: preloader-er logo majhkhane theke Header-er logo-r jayga-y uriye giye oitai Header-er logo hoye jay.
       Target-er jayga browser-er theke maapi (getBoundingClientRect), tai kono viewport / font / layout-e hardcode nai.
       Kono shomoshya hole (Header nai, page niche scroll kora, target screen-er baire) morph bad, ager moto vanish-e fallback. */
    let morphActive = false;
    let landed = false;
    const setupMorph = () => {
      const mark = el.querySelector<HTMLElement>(".pl-mark");
      const target = document.querySelector<HTMLElement>("[data-pl-logo] .logo-mark");
      if (!mark || !target || window.scrollY > 4) return;

      // Age flag boshai: eta Header wrapper-er slide-in animation bondho kore, tai transform chhara asol jayga maapa jay
      root.setAttribute("data-pl-morph", "");
      const t = target.getBoundingClientRect();
      const m = mark.getBoundingClientRect(); // entry shesh, tai kono transform nai: mark-er asol (natural) jayga
      const o = el.getBoundingClientRect();
      const inView = t.width > 0 && m.width > 0 && t.left >= 0 && t.top >= 0 && t.right <= o.width && t.bottom <= o.height;
      if (!inView) {
        root.removeAttribute("data-pl-morph");
        return;
      }
      // Landing-er distance mark-er MAAPA position theke (font / --pl-shift-er upor nirbhor na kore), tai kokhono 1px-o off hoy na
      el.style.setProperty("--pl-fx", `${t.left + t.width / 2 - (m.left + m.width / 2)}px`);
      el.style.setProperty("--pl-fy", `${t.top + t.height / 2 - (m.top + m.height / 2)}px`);
      el.style.setProperty("--pl-fscale", String(t.width / m.width));
      el.dataset.morph = "";
      morphActive = true;
    };

    // Logo Header-er jayga-y pouchhe gele: Header-er asol logo dekhao (crossfade), preloader-er mark lukao, text beriye ashbe
    const land = () => {
      if (!morphActive || landed) return;
      landed = true;
      root.setAttribute("data-pl-landed", "");
      el.dataset.landed = "";
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
        land(); // animationend kono karone na fire hole-o Header-er logo jeno lukiye na thake
        release();
      };
      setupMorph();
      // Overlay-r fade-out (`pl-out`) shuru hole-i page-er reveal shuru kori, overlay puro mishe jawar opekkha kori na.
      // Ager moto shesh howar por shuru hole nav/button age dekha jeto, logo + hero pore ashto, majhkhane faka lagto.
      el.addEventListener("animationstart", (e) => {
        if (e.target === el && e.animationName === "pl-out") timers.push(window.setTimeout(unpause, REVEAL_LEAD_MS));
      });
      el.addEventListener("animationend", (e) => {
        if (e.target === el && e.animationName === "pl-out") done();
        else if (e.animationName === "pl-mark-fly") land();
      });
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