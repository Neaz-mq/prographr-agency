"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Scroll-driven stacking panels (oripio.com-er services section-er moto).
   - Protita panel (ekhane 2 ta card-er ek row) desktop-e `sticky` hoye upore atke thake.
   - Porer panel niche theke uthe ashe ar ager-tar upor diye cover kore.
   - Cover howar shomoy ager panel(gulo) halka choto (scale) ar ektu upore (peek) hoy. Kono shadow ba dim overlay nai.
   Shob kichu scroll-er progress theke, rAF-e shorashori style boshano hoy (React re-render nai, tai smooth).
   Mobile (< md) ba prefers-reduced-motion-e kono sticky/transform nai, panel gulo shadharon vabe uporer niche thake. */

const DESKTOP = "(min-width: 768px)";
const REDUCED = "(prefers-reduced-motion: reduce)";

const STICK_TOP = 40; // px: panel koto upore atkabe (Tailwind md:top-10 er soman)
/* Floating nav (FloatingNav) niche-e fixed: bottom 24px + height 52px. Panel-er niche-r ongsho (project naam, "Full view" button) jeno nav-er niche na pore,
   tai panel-er bottom ta nav-er upore (+16px gap) rakhi. Ager 16px-e bottom nav-er pichone chole jeto ar dekha jeto na. FloatingNav-er size bodlale eta-o bodlate hobe. */
const NAV_CLEARANCE = 24 + 52 + 16;
const MIN_FIT = 0.8; // panel viewport-e na dhukle maximum koto choto kora hobe (tar choto hole upor theke ektu kete jay)
const VIEWPORT_GAP = NAV_CLEARANCE; // px: panel-er bottom theke viewport-er bottom porjonto kom-pokkhe eto faka
const SCALE_STEP = 0.04; // protita cover-e koto choto hobe
const LIFT_STEP = 14; // protita cover-e koto px upore uthbe (peek)
const SMOOTH_TAU = 110; // ms: boro hole beshi "bhari/premium" glide, choto hole beshi responsive
const EPSILON = 0.0005; // ei-r cheye kom fark hole animation thamiye dei

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/* smoothstep: shuru ar shesh-e dhire, majhkhane druto. Linear scroll-ke norom, ease-kora feel dey */
const ease = (t: number) => t * t * (3 - 2 * t);

export function StackedPanels({ children, className }: { children: ReactNode; className?: string }) {
  const panels = Children.toArray(children);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const items = Array.from(list.children) as HTMLElement[];
    const layers = items.map((li) => li.querySelector<HTMLElement>("[data-stack-layer]"));
    const desktop = window.matchMedia(DESKTOP);
    const reduced = window.matchMedia(REDUCED);
    let raf = 0;
    let last = 0;
    let stick = STICK_TOP;
    let fit = 1; // panel boro hole (chhoto laptop) pura panel-take viewport-er (nav-er upor porjonto) bhitore ana-r scale
    /* current[i] = ekhon screen-e je depth dekhachhe (smooth), target[i] = scroll position onujayi asol depth */
    const current: number[] = new Array(items.length).fill(0);
    let snap = true;

    const apply = (i: number, d: number) => {
      const layer = layers[i];
      if (layer) layer.style.transform = `translate3d(0, ${(-LIFT_STEP * d).toFixed(3)}px, 0) scale(${(fit * (1 - SCALE_STEP * d)).toFixed(5)})`;
    };

    const reset = () => {
      items.forEach((li, i) => {
        li.style.top = "";
        const layer = layers[i];
        if (layer) layer.style.transform = "";
        current[i] = 0;
      });
      fit = 1;
      snap = true;
    };

    const active = () => desktop.matches && !reduced.matches;

    /* Panel jodi viewport-er cheye boro hoy (chhoto laptop), tahole top komiye niche-r ongsho-o dekha jay */
    const measure = () => {
      if (!active()) {
        reset();
        return;
      }
      const tallest = Math.max(...items.map((li) => li.offsetHeight));
      /* Age: shudhu top komiye bhoshano hoto, tai boro panel-er upor-er ongsho kete jeto. Ekhon age pura panel ektu choto kore (fit)
         viewport + nav-er upor-e ane, tarpor-o na dhukle top komai */
      const room = window.innerHeight - STICK_TOP - VIEWPORT_GAP;
      fit = clamp(room / tallest, MIN_FIT, 1);
      stick = Math.min(STICK_TOP, window.innerHeight - tallest * fit - VIEWPORT_GAP);
      items.forEach((li) => {
        li.style.top = `${stick}px`;
      });
    };

    /* Scroll position theke target depth ber kori (shudhu read, kono write nai) */
    const readTargets = () => {
      const n = items.length;
      const tops = items.map((li) => li.getBoundingClientRect().top);
      const heights = items.map((li) => li.offsetHeight);

      const arrive: number[] = new Array(n).fill(0);
      for (let j = 1; j < n; j++) {
        const h = heights[j - 1] || 1;
        arrive[j] = ease(clamp((stick + h - tops[j]) / h, 0, 1));
      }

      const target: number[] = new Array(n).fill(0);
      for (let i = n - 2; i >= 0; i--) target[i] = target[i + 1] + arrive[i + 1];
      return target;
    };

    /* Protita frame-e current-ke target-er dike ektu kore ogroshor kori (frame-rate-independent damping).
       Scroll thamle-o animation ektu pore shesh hoy, tai sticky (compositor) ar transform (JS) er micro-jitter dekha jay na */
    const tick = (now: number) => {
      raf = 0;
      if (!active()) return;

      const dt = last ? Math.min(now - last, 50) : 16;
      last = now;
      const alpha = snap ? 1 : 1 - Math.exp(-dt / SMOOTH_TAU);
      snap = false;

      const target = readTargets();
      let moving = false;
      for (let i = 0; i < target.length; i++) {
        const diff = target[i] - current[i];
        if (Math.abs(diff) > EPSILON) {
          current[i] += diff * alpha;
          moving = true;
        } else {
          current[i] = target[i];
        }
        apply(i, current[i]);
      }

      if (moving) raf = requestAnimationFrame(tick);
      else last = 0;
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const relayout = () => {
      measure();
      snap = true;
      schedule();
    };

    relayout();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", relayout);
    desktop.addEventListener("change", relayout);
    reduced.addEventListener("change", relayout);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(relayout) : null;
    ro?.observe(list);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", relayout);
      desktop.removeEventListener("change", relayout);
      reduced.removeEventListener("change", relayout);
      ro?.disconnect();
      if (raf) cancelAnimationFrame(raf);
      reset();
    };
  }, [panels.length]);

  return (
    /* Niche kono extra pb nai: ager 14vh-er jonno shesh card-er pore section-er 100px-er shathe mile boro gap hoto (~250-320px). Ekhon shudhu section-er nijer bottom padding */
    <ul ref={listRef} className={cn("flex w-full flex-col gap-6 md:gap-8", className)}>
      {panels.map((panel, i) => (
        <li key={i} className="md:sticky md:top-10 md:motion-reduce:static" style={{ zIndex: i + 1 }}>
          {/* Kono border / padding / radius nai (Figma-te card-er bairer frame nai). `bg-[#FAFAFA]` (section-er bg-r ekoi color) rakha hoyeche,
              jate porer panel uthe ashle ager panel-er card-gulo opaque vabe dhaka pore, kintu bg ta dekha jay na */}
          <div
            data-stack-layer
            className="relative [transform-origin:50%_0] md:bg-[#FAFAFA] md:will-change-transform md:[backface-visibility:hidden]"
          >
            {panel}
          </div>
        </li>
      ))}
    </ul>
  );
}