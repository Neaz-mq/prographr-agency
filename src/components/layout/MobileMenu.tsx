"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CloseIcon, MenuIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  links: { label: string; href: string }[];
};

export function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    // Menu khola thakle background scroll bondho
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      root.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#222222] text-white md:hidden"
      >
        {open ? <CloseIcon className="size-[1.125rem]" /> : <MenuIcon className="size-[1.125rem]" />}
      </button>

      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 -z-10 bg-black/60 transition-opacity duration-300 md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* Menu sheet */}
      <div
        id={panelId}
        role="dialog"
        aria-label="Site menu"
        className={cn(
          "fixed inset-x-4 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] z-20 max-h-[calc(100dvh-7.5rem)] overflow-y-auto rounded-2xl border border-white/10 bg-black p-2 text-white shadow-2xl transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden",
          open ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0"
        )}
      >
        <ul>
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-4 text-xl font-medium transition-colors hover:bg-white/10"
              >
                {link.label}
                <ArrowUpRight className="size-5 opacity-60" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}