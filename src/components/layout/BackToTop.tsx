"use client";

import { ArrowUp } from "@/components/ui/icons";

export function BackToTop() {
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="pointer-events-auto grid size-11 place-items-center rounded-full bg-black text-white transition-transform duration-300 hover:-translate-y-1 md:size-[3.25rem]"
    >
      <ArrowUp className="size-5 md:size-6" />
    </button>
  );
}