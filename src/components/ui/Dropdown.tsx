"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Custom dropdown (Figma "popup"): white card, radius 16, padding 16, gap 6, shadow 0 4px 30px rgba(0,0,0,.06), min-width 224.
   Option: 34px high, padding 10, radius 12, text 14px #121212. Selected option: pill (radius 100) + bg #F9F6F3.
   Native <select> er jaygay, tai browser-er default (kalo border / blue highlight) list ar dekha jay na.
   Accessibility: WAI-ARIA select-only combobox. Focus trigger button-e thake, list-e aria-activedescendant diye ghore.
   Keyboard: Up/Down/Home/End, Enter/Space (select), Esc (close), Tab (close), okkhor type korle sei option-e jay. */

export type DropdownOption = { value: string; label: string };

type DropdownProps = {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  /* value khali thakle trigger-e ei text dekhay (jemon "Ex. Web Design") */
  placeholder?: string;
  /* Trigger-er bhitorer content nijer moto dite chaile (jemon country code: flag + code). selected = ekhon-er option, open = list khola ki na */
  renderTrigger?: (selected: DropdownOption | undefined, open: boolean) => ReactNode;
  ariaLabel?: string;
  ariaRequired?: boolean;
  ariaInvalid?: boolean;
  ariaDescribedBy?: string;
  /* Trigger button-er className (default: full-width, 16px text) */
  className?: string;
};

export function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3.1 6.8 9 12.1l5.9-5.3" />
    </svg>
  );
}

export function Dropdown({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  renderTrigger,
  ariaLabel,
  ariaRequired,
  ariaInvalid,
  ariaDescribedBy,
  className,
}: DropdownProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const typed = useRef({ text: "", timer: 0 });

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const optionId = (i: number) => `${listId}-opt-${i}`;

  const openList = useCallback(() => {
    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  }, [selectedIndex]);

  const closeList = useCallback(() => setOpen(false), []);

  const choose = (i: number) => {
    const opt = options[i];
    if (opt) onChange(opt.value);
    setOpen(false);
  };

  /* Bahire click korle bondho */
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  /* Keyboard diye ghorar shomoy active option-ta list-er bhitore dekha jay emon jaygay anbo */
  useEffect(() => {
    if (!open) return;
    document.getElementById(optionId(active))?.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, active]);

  useEffect(() => {
    const t = typed.current;
    return () => window.clearTimeout(t.timer);
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1;

    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        openList();
      }
      return; // Enter/Space button-er click diye-i khole
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => Math.min(a + 1, last));
        return;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
        return;
      case "Home":
        e.preventDefault();
        setActive(0);
        return;
      case "End":
        e.preventDefault();
        setActive(last);
        return;
      case "Enter":
      case " ":
        e.preventDefault(); // click fire hoye abar toggle hoye jeno na jay
        choose(active);
        return;
      case "Escape":
        e.preventDefault();
        closeList();
        return;
      case "Tab":
        closeList();
        return;
    }

    /* Type-ahead: okkhor type korle sei okkhor diye shuru hoa option-e jay */
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const t = typed.current;
      window.clearTimeout(t.timer);
      t.text += e.key.toLowerCase();
      t.timer = window.setTimeout(() => (t.text = ""), 600);
      const from = t.text.length === 1 ? active + 1 : active; // ek-i okkhor bar bar chaple porer-ta
      const order = [...options.keys()].map((_, n) => (from + n) % options.length);
      const hit = order.find((i) => options[i].label.toLowerCase().startsWith(t.text));
      if (hit !== undefined) setActive(hit);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id={id}
        name={name}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? optionId(active) : undefined}
        aria-label={ariaLabel}
        aria-required={ariaRequired || undefined}
        aria-invalid={ariaInvalid || undefined}
        aria-describedby={ariaDescribedBy}
        onClick={() => (open ? closeList() : openList())}
        onKeyDown={onKeyDown}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between gap-4 bg-transparent p-0 text-left text-base leading-[1.2] outline-none",
          className
        )}
      >
        {renderTrigger ? (
          renderTrigger(selected, open)
        ) : (
          <>
            <span className={selected ? "text-black" : "text-black/70"}>{selected ? selected.label : placeholder}</span>
            <ChevronDownIcon
              className={cn(
                "size-[1.125rem] shrink-0 text-black transition-transform duration-300 motion-reduce:transition-none",
                open && "rotate-180"
              )}
            />
          </>
        )}
      </button>

      {/* Popup: form field-er 1px underline trigger-er 14px niche, tai popup line-er (14 + 1px) 8px niche theke shuru (mt 23px), line-er upor chole jay na.
          Bondho obosthay invisible (screen reader-o dekhe na), tai fade + ektu uthe ashe */}
      <div
        ref={listRef}
        id={listId}
        role="listbox"
        aria-label={ariaLabel}
        onMouseDown={(e) => e.preventDefault()} // option-e click korleo focus trigger-e thake
        className={cn(
          "absolute left-0 top-full z-30 mt-[1.4375rem] flex max-h-[min(22rem,60svh)] w-max min-w-56 max-w-[min(24rem,calc(100vw-3rem))] flex-col gap-1.5 overflow-y-auto rounded-2xl bg-white p-4 shadow-[0px_4px_30px_rgba(0,0,0,0.06)]",
          "origin-top transition-[opacity,transform,visibility] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        )}
      >
        {options.map((opt, i) => {
          const isSelected = i === selectedIndex;
          const isActive = open && i === active;
          return (
            <div
              key={opt.value}
              id={optionId(i)}
              role="option"
              aria-selected={isSelected}
              onClick={() => choose(i)}
              onMouseMove={() => active !== i && setActive(i)}
              className={cn(
                "flex min-h-[2.125rem] shrink-0 cursor-pointer items-center whitespace-nowrap p-2.5 text-sm leading-none text-ink transition-colors duration-150 motion-reduce:transition-none",
                isSelected ? "rounded-full bg-[#F9F6F3]" : "rounded-xl",
                !isSelected && isActive && "bg-[#F9F6F3]/70"
              )}
            >
              {opt.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}