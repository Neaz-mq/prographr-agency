"use client";

import { useEffect } from "react";

/* Screen-er baire thaka infinite marquee gulo pause kore rakhe (data-offscreen), jeno scroll-er shomoy shudhu je gulo dekha jachche
   shegulo-i animate hoy. `.marquee` element-e suppressHydrationWarning dewa ache, karon ei script server HTML-e nai emon attribute boshay. Layout-e kono effect nai (shudhu animation-play-state), tai scroll jump hoy na. Rule globals.css-e. */
export function ScrollPerf() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) el.removeAttribute("data-offscreen");
          else el.setAttribute("data-offscreen", "");
        }
      },
      { rootMargin: "200px 0px" } // ektu age-i chalu, jeno screen-e ashar shomoy thama theke shuru na dekhay
    );
    document.querySelectorAll<HTMLElement>(".marquee").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}