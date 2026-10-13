"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { ArrowUpRight } from "./icons";
import { cn } from "@/lib/utils";

/* Hover animation (reference video theke frame-by-frame mapping):
   - Label: ek line upore uthe jay (clip hoye), notun copy niche theke uthe ashe.
   - Arrow: top-right-e beriye jay, notun arrow bottom-left theke dhuke.
   - Hover-e AR hover theke soriye gele-o ekoi dike roll hoy (video-r moto).

   Smooth-er jonno CSS keyframe na, ekta continuous "position" p (JS spring, critically damped, overshoot nai):
   - p-er unit = ek roll. Label/arrow-er position p theke seedha hishab hoy, tai beshi tara-tari hover korleo
     jekhane achhe sekhan theke velocity shoho smoothly ghure jay, kokhono jump/restart hoy na.
   - Hover = p bijor (odd), hover chhara = p jor (even). Beshi tara-tari hole nikoter correct-parity target-e ghore.
   - rAF shudhu animation cholar shomoy chole, shesh hole thame. Re-render hoy na (direct transform). */

/* Spring speed. Boro = tez, choto = dhire. Roll-er distance chhoto (label-er ek line), tai beshi tez hole jhalok-er moto lage.
   36 = 0.1s-e 90% (khub tez), 13 = 0.3s-e 90% / 0.5s-e shesh (smooth, premium).
   Tune: 16 = ektu tez (0.24s), 10 = aro dhire (0.39s). */
const OMEGA = 13;

/* v-ke [-1, 1) range-e wrap kore. +-1 mane box-er bairer (clip hoye lukano) */
const wrap = (v: number) => ((((v + 1) % 2) + 2) % 2) - 1;

/* parity (0 ba 1)-er shathe mele emon nikototon integer. Tie hole shamne (forward) */
const nearestWithParity = (p: number, parity: number) => {
  const below = Math.floor((p - parity) / 2) * 2 + parity;
  const above = below + 2;
  return p - below < above - p ? below : above;
};

type RollButtonProps = {
  href: string;
  children: string;
  size?: "sm" | "md";
  className?: string;
};

export function RollButton({ href, children, size = "md", className }: RollButtonProps) {
  const textA = useRef<HTMLSpanElement>(null);
  const textB = useRef<HTMLSpanElement>(null);
  const iconA = useRef<HTMLSpanElement>(null);
  const iconB = useRef<HTMLSpanElement>(null);
  const s = useRef({ p: 0, v: 0, t: 0, hovered: false, raf: 0, last: 0 });
  const isSmall = size === "sm";

  const render = useCallback((p: number) => {
    const ya = wrap(-p) * 100; // primary: 0 -> -100% (upore)
    const yb = wrap(1 - p) * 100; // copy: +100% (niche) -> 0
    if (textA.current) textA.current.style.transform = `translate3d(0, ${ya}%, 0)`;
    if (textB.current) textB.current.style.transform = `translate3d(0, ${yb}%, 0)`;
    // Arrow: dik top-right <-> bottom-left (x = -y)
    if (iconA.current) iconA.current.style.transform = `translate3d(${-ya}%, ${ya}%, 0)`;
    if (iconB.current) iconB.current.style.transform = `translate3d(${-yb}%, ${yb}%, 0)`;
  }, []);

  const tick = useCallback(
    (now: number) => {
      const st = s.current;
      const dt = Math.min((now - st.last) / 1000, 0.05);
      st.last = now;

      // Critically damped spring-er exact solution (kono frame rate-e stable)
      const x = st.p - st.t;
      const decay = Math.exp(-OMEGA * dt);
      const k = st.v + OMEGA * x;
      st.p = st.t + (x + k * dt) * decay;
      st.v = (st.v - k * OMEGA * dt) * decay;

      if (Math.abs(st.p - st.t) < 0.0004 && Math.abs(st.v) < 0.004) {
        // Settled: p ke target-e snap kore, ar even sankhya diye komiye choto rakhi (parity thik thake)
        const shift = Math.floor(st.t / 2) * 2;
        st.t -= shift;
        st.p = st.t;
        st.v = 0;
        st.raf = 0;
        render(st.p);
        return;
      }

      render(st.p);
      st.raf = requestAnimationFrame(tick);
    },
    [render]
  );

  const setHover = useCallback(
    (next: boolean) => {
      const st = s.current;
      if (st.hovered === next) return;
      st.hovered = next;
      st.t = nearestWithParity(st.p, next ? 1 : 0);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        st.p = st.t;
        st.v = 0;
        render(st.p);
        return;
      }
      if (!st.raf) {
        st.last = performance.now();
        st.raf = requestAnimationFrame(tick);
      }
    },
    [render, tick]
  );

  useEffect(() => {
    const st = s.current;
    return () => {
      if (st.raf) cancelAnimationFrame(st.raf);
    };
  }, []);

  const iconClass = isSmall ? "size-4" : "size-[1.125rem]";

  return (
    <Link
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className={cn(
        "roll-btn inline-flex items-center gap-2 rounded-xl bg-ink text-sm font-medium leading-[1.2] text-white shadow-[inset_3px_3px_10px_rgba(255,255,255,0.2)] transition-transform duration-300 active:scale-[0.98]",
        isSmall ? "h-9 pl-3 pr-1" : "h-[2.625rem] pl-4 pr-1",
        className
      )}
    >
      {/* Label: duita copy ekoi cell-e (grid), overflow-hidden diye clip */}
      <span className="grid overflow-hidden">
        <span ref={textA} className="roll-text col-start-1 row-start-1 py-[0.12em]">
          {children}
        </span>
        <span ref={textB} aria-hidden="true" className="roll-text roll-copy-text col-start-1 row-start-1 py-[0.12em]">
          {children}
        </span>
      </span>

      {/* Arrow box: duita arrow ekoi cell-e, box-er bairer ongsho clip */}
      <span
        className={cn(
          "grid place-items-center overflow-hidden rounded-lg bg-white text-black",
          isSmall ? "size-7" : "size-[2.125rem]"
        )}
      >
        <span ref={iconA} className="roll-icon col-start-1 row-start-1 grid">
          <ArrowUpRight className={iconClass} />
        </span>
        <span ref={iconB} aria-hidden="true" className="roll-icon roll-copy-icon col-start-1 row-start-1 grid">
          <ArrowUpRight className={iconClass} />
        </span>
      </span>
    </Link>
  );
}