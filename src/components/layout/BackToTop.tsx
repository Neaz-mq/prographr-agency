"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "@/components/ui/icons";
import { scrollToTop } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

/* Industry standard: page-er shuru-te "Back to top" dekhay na (ekhane to already top-e). Hero + prothom section par hole (~1.5 screen niche)
   dhire fade/slide-in hoy. Jayga ta niye rakhi (opacity/transform), tai dekhale bake nav-er position nore na, layout shift nai.
   Hidden thakle click/Tab-o kora jay na (pointer-events + tabIndex + aria-hidden). */
const SHOW_AFTER_VIEWPORTS = 1.5;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * SHOW_AFTER_VIEWPORTS);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  /* Hover jitter fix: pehle button nijei upore uthto, tai cursor ta button theke berie jeto, hover chole jeto, abar niche nambto, abar hover... (kapte thakto).
     Ekhon button (hit area) jayga-y sthir, shudhu bhitorer "disc" ta upore uthe. Cursor-er niche hit area thake, tai kapa nai. */
  return (
    <button
      type="button"
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={scrollToTop}
      className={cn(
        "group grid size-10 shrink-0 place-items-center transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] min-[380px]:size-11 md:size-[3.25rem]",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0 motion-reduce:translate-y-0"
      )}
    >
      <span className="grid size-full place-items-center rounded-full bg-black text-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:-translate-y-1 group-focus-visible:-translate-y-1 cursor-pointer">
        <ArrowUp className="size-5 md:size-6" />
      </span>
    </button>
  );
}
