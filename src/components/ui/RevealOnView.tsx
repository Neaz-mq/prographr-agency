"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealOnViewProps = {
  children: ReactNode;
  className?: string;
  /** element-er koto ongsho dekha gele shuru hobe (0 - 1) */
  threshold?: number;
  /** viewport-er niche theke koto ager-e dhora hobe. Negative = ektu bhitore dhukle shuru */
  rootMargin?: string;
};

/* Scroll-e viewport-e ashle `data-inview="true"` boshay. Bhitorer `.sr` (blur + fade + rise) ar `.sr-up` (fade + rise) element-gulo tokhon
   nijer `--reveal-delay` onujayi stagger kore ashe (globals.css). lib/reveal.ts-er `reveal()` diye delay/duration dewa hoy.
   Ekbar-i cholbe (observer disconnect hoye jay). JS na thakle (`scripting: none`) content shorashori dekha jay. */
export function RevealOnView({ children, className, threshold = 0.25, rootMargin = "0px 0px -8% 0px" }: RevealOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={ref} data-inview={inView ? "true" : "false"} className={className}>
      {children}
    </div>
  );
}