"use client";

import { ArrowUp } from "@/components/ui/icons";
import { scrollToTop } from "@/lib/smooth-scroll";

export function BackToTop() {
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      className="pointer-events-auto grid size-10 shrink-0 place-items-center rounded-full bg-black text-white transition-transform duration-300 hover:-translate-y-1 min-[380px]:size-11 md:size-[3.25rem]"
    >
      <ArrowUp className="size-5 md:size-6" />
    </button>
  );
}