"use client";

import { useId, useRef, useState } from "react";
import type { Faq } from "@/lib/faqs";
import { cn } from "@/lib/utils";
import { reveal } from "@/lib/reveal";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]"; // site-er shob jaygay ek-i easing (ServicesAccordion-er moto)

/* Figma: 60px circle, 24px icon, 2px stroke. ServicesAccordion-er ToggleIcon-er hubohu.
   Open hole vertical line scale-y-0 + rotate hoye mile jay, tai plus → minus smooth morph hoy. */
function ToggleIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      className={cn(
        "size-6 transition-transform duration-500 motion-reduce:transition-none",
        EASE,
        /* Closed row-te hover/focus-e + puro 90deg ghore (shuru ar shesh duto-i "+"), 45deg dile hover-e × theke jeto */
        !open && "group-hover:rotate-90 group-focus-visible:rotate-90"
      )}
    >
      <path d="M3.75 12h16.5" />
      <path
        d="M12 3.75v16.5"
        className={cn(
          "origin-center [transform-box:fill-box] transition-transform duration-500 motion-reduce:transition-none",
          EASE,
          open ? "rotate-90 scale-y-0" : "rotate-0 scale-y-100"
        )}
      />
    </svg>
  );
}

type FaqAccordionProps = {
  faqs: Faq[];
  defaultOpenId?: string | null;
};

/* Figma (720px column, gap 20px):
   - Open row: bg #F0F0F0, radius 20, padding 20, header (60px) → gap 16 → answer (16px / 160%, ink 70%)
   - Closed row: transparent, padding 8px 20px (= 76px high)
   - Title: open 24px, closed 22px (500, line-height 120%)
   Padding header button-er bhitore, tai puro row (padding shoho) clickable. */
export function FaqAccordion({ faqs, defaultOpenId = null }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);
  const baseId = useId();
  const listRef = useRef<HTMLUListElement>(null);

  /* WAI-ARIA accordion keyboard: Up/Down/Home/End diye header-e header-e jaowa */
  const onKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return;
    const triggers = Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>("[data-accordion-trigger]") ?? []);
    const current = triggers.indexOf(document.activeElement as HTMLButtonElement);
    if (current === -1) return;

    e.preventDefault();
    const last = triggers.length - 1;
    const next =
      e.key === "Home" ? 0 : e.key === "End" ? last : e.key === "ArrowDown" ? (current + 1) % triggers.length : (current - 1 + triggers.length) % triggers.length;
    triggers[next]?.focus();
  };

  return (
    <ul ref={listRef} onKeyDown={onKeyDown} className="flex w-full flex-col gap-3 md:gap-5">
      {faqs.map((faq, index) => {
        const open = openId === faq.id;
        const triggerId = `${baseId}-trigger-${faq.id}`;
        const panelId = `${baseId}-panel-${faq.id}`;

        return (
          <li
            key={faq.id}
            /* Row gulo ek-ek kore niche theke fade + rise kore ashe (RevealOnView-er bhitore `sr-up`, stagger) */
            style={reveal(index * 90, { duration: 900, y: 36 })}
            className={cn(
              "sr-up rounded-2xl transition-[background-color] duration-500 motion-reduce:transition-none md:rounded-[1.25rem]",
              EASE,
              open ? "bg-chip" : "bg-transparent hover:bg-chip/50"
            )}
          >
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={open}
                aria-controls={panelId}
                data-accordion-trigger
                onClick={() => setOpenId(open ? null : faq.id)}
                className={cn(
                  "group flex w-full items-center justify-between gap-4 rounded-2xl px-4 text-left outline-none transition-[padding] duration-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 motion-reduce:transition-none md:rounded-[1.25rem] md:px-5",
                  EASE,
                  open ? "pb-0 pt-4 md:pt-5" : "py-2"
                )}
              >
                <span
                  className={cn(
                    "font-medium leading-[1.2] text-ink transition-[translate,font-size] duration-500 group-hover:translate-x-1 motion-reduce:transition-none",
                    EASE,
                    open ? "text-xl md:text-2xl" : "text-lg md:text-[1.375rem]"
                  )}
                >
                  {faq.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-full border transition-[background-color,color,border-color,scale] duration-500 motion-reduce:transition-none md:size-[3.75rem]",
                    EASE,
                    open
                      ? "border-ink bg-ink text-white"
                      : "border-ink text-ink group-hover:bg-ink group-hover:text-white group-active:scale-95"
                  )}
                >
                  <ToggleIcon open={open} />
                </span>
              </button>
            </h3>

            {/* grid 0fr → 1fr: height auto-te smooth animate hoy, JS measure lage na */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              inert={!open}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 motion-reduce:transition-none",
                EASE,
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="min-h-0 overflow-hidden">
                {/* Padding ei bhitorer div-e (overflow-hidden wrapper-e na), noile closed-e-o height 0 hoy na */}
                <div className="px-4 pb-4 pt-3 md:px-5 md:pb-5 md:pt-4">
                  <p className="max-w-[36.0625rem] text-base leading-[1.6] text-ink/70">{faq.answer}</p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}