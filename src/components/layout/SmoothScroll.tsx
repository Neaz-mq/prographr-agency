"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/smooth-scroll";

/* Site-wide smooth scrolling (Lenis).
   - Mouse wheel / trackpad: momentum-shoho dim dim kore scroll hoy. Touch-e native scroll-i thake (phone-e sobcheye smooth).
   - #anchor link (Project, Services, Let's talk...) click korle smooth kore sei section-e jay.
   - prefers-reduced-motion hole kichu-i kore na. */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let raf = 0;

    const tick = (time: number) => {
      lenis?.raf(time);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (lenis || reduced.matches) return;
      lenis = new Lenis({
        duration: 1.2, // boro hole aro "floaty", chhoto hole aro responsive
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out: shuru-te druto, shesh-e dhire thame
        smoothWheel: true,
        anchors: true, // href="#id" gulo smooth scroll hoy
      });
      setLenis(lenis);
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
      setLenis(null);
    };

    const onChange = () => {
      stop();
      start();
    };

    start();
    reduced.addEventListener("change", onChange);

    return () => {
      reduced.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  return null;
}
