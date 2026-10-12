"use client";

import { Fragment, useCallback, useEffect, useId, useRef, useState, type RefObject } from "react";
import Image, { getImageProps } from "next/image";
import { cloudinaryLoader } from "@/lib/cloudinary";
import type { Service, ServiceImage } from "@/lib/services";
import { cn } from "@/lib/utils";

/* Real <Image> ar warm-up (prefetch), dutoi ei ek-i `sizes` use kore. Tai browser ek-i URL pick kore ar cache hit hoy */
const MEDIA_SIZES = "(min-width: 1280px) 1200px, (min-width: 640px) 90vw, 92vw";

/* ---------- Image warm-up ----------
   Problem: closed panel height 0 + overflow hidden, tai browser lazy image load kore na. Click korle tokhon download shuru hoy.
   Solution: image gula agey theke background-e cache-e anii (detached Image, same srcset/sizes), tai click-e instant dekha jay.
   Page speed-e effect nai: Services section-er kachakachi ashle tobei, ek ek kore, browser idle thakle. */
const warmed = new Set<string>();

function warmImage(image?: ServiceImage): Promise<void> {
  if (!image || typeof window === "undefined" || warmed.has(image.src)) return Promise.resolve();
  warmed.add(image.src);

  const { props } = getImageProps({ src: image.src, alt: image.alt, fill: true, sizes: MEDIA_SIZES, loader: cloudinaryLoader });
  const img = new window.Image();
  img.decoding = "async";
  img.sizes = props.sizes ?? MEDIA_SIZES; // sizes/srcset agey, src sheshe
  if (props.srcSet) img.srcset = props.srcSet;
  img.src = String(props.src);
  return img.decode().catch(() => undefined); // decode kora thakle open-e paint-e jank hoy na
}

function useWarmServiceImages(ref: RefObject<HTMLElement | null>, services: Service[], defaultOpenId: string | null) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Data Saver ba 2G hole bulk prefetch kori na, shudhu hover/focus-e hoy */
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "")) return;

    let cancelled = false;
    const whenIdle = (cb: () => void) => {
      if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(cb, { timeout: 1500 });
      else window.setTimeout(cb, 200); // Safari-te requestIdleCallback nai
    };

    /* Default open service age, tarpor baki gula upor theke niche */
    const queue = [...services].sort((a, b) => Number(b.id === defaultOpenId) - Number(a.id === defaultOpenId));

    const run = async () => {
      for (const service of queue) {
        if (cancelled) return;
        await warmImage(service.image);
        await new Promise<void>((resolve) => whenIdle(resolve)); // ek-ta shesh hole tarpor porer-ta
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          void run();
        }
      },
      { rootMargin: "800px 0px" } // section dekha jabar ~800px age theke shuru
    );
    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [ref, services, defaultOpenId]);
}

/* Figma: 60px circle, 24px icon, 2px stroke, 15.62% inset (= 3.75 → 20.25 @ 24 viewBox).
   Open hole vertical line scale-y-0 + rotate hoye mile jay, tai plus → minus smooth morph hoy. */
function ToggleIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-6" aria-hidden="true">
      <path d="M3.75 12h16.5" />
      <path
        d="M12 3.75v16.5"
        className={cn(
          "origin-center [transform-box:fill-box] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          open ? "rotate-90 scale-y-0" : "rotate-0 scale-y-100"
        )}
      />
    </svg>
  );
}

function ServiceMedia({ service, open }: { service: Service; open: boolean }) {
  const image = service.image;
  const [loaded, setLoaded] = useState(false);

  /* Cache-e thakle onLoad fire hoy na-o hote pare, tai mount-e `complete` check kori */
  const markIfComplete = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    /* Figma: Image Wrapper 1200 x 488, radius 30px, bg #121212. Sob service-er frame ek-i size */
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.25rem] bg-ink sm:aspect-[1200/488] md:rounded-[1.875rem]">
      {image ? (
        /* Bhitore 1181 x 449 image (~0.8% x 4%).
           preFramed (Brand Identity): image-e-i black bg + padding + rounded ache, tai shorashori fill.
           Baki raw image: code theke black panel + padding (~24px) + rounded corner, Brand-er moto look.
           Raw image-er visible area ~1134 x 402 (2.82 : 1), ei ratio-r image hole kono ongsho kate na */
        <div className="absolute inset-[4%] sm:inset-x-[0.8%] sm:inset-y-[4%]">
          <div className={cn("size-full", !image.preFramed && "bg-black p-[3%] sm:p-[2%]")}>
            <div className={cn("relative size-full overflow-hidden", !image.preFramed && "rounded-xl sm:rounded-[1.3rem]")}>
              <Image
                ref={markIfComplete}
                src={image.src}
                alt={image.alt}
                loader={cloudinaryLoader}
                fill
                sizes={MEDIA_SIZES}
                onLoad={() => setLoaded(true)}
                style={image.position ? { objectPosition: image.position } : undefined}
                className={cn(
                  "object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                  loaded ? "opacity-100" : "opacity-0", // dark frame theke smooth fade-in, kono pop/flash nai
                  open ? "scale-100" : "scale-[1.05]"
                )}
              />
            </div>
          </div>
        </div>
      ) : (
        /* PLACEHOLDER: service-er image ashle service.image set korlei eta chole jabe */
        <div className="absolute inset-0 grid place-items-center p-6 text-center">
          <p className="text-2xl font-medium leading-[1.2] text-white/20 sm:text-4xl lg:text-[3.75rem]">{service.title}</p>
        </div>
      )}
    </div>
  );
}

type ServicesAccordionProps = {
  services: Service[];
  defaultOpenId?: string | null;
};

export function ServicesAccordion({ services, defaultOpenId = null }: ServicesAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);
  const baseId = useId();
  const listRef = useRef<HTMLUListElement>(null);

  useWarmServiceImages(listRef, services, defaultOpenId);

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
    <ul ref={listRef} onKeyDown={onKeyDown} className="flex w-full flex-col gap-4 md:gap-8 lg:gap-12">
      {services.map((service) => {
        const open = openId === service.id;
        const triggerId = `${baseId}-trigger-${service.id}`;
        const panelId = `${baseId}-panel-${service.id}`;
        const warm = () => void warmImage(service.image); // hover/focus = click-er age-i image anar shuru

        return (
          <li
            key={service.id}
            className={cn(
              "rounded-[1.25rem] px-4 transition-[background-color,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:rounded-[1.875rem] md:px-10",
              open ? "bg-[#FAFAFA] py-5 md:py-10" : "bg-transparent py-0"
            )}
          >
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={open}
                aria-controls={panelId}
                data-accordion-trigger
                onPointerEnter={warm}
                onFocus={warm}
                onClick={() => setOpenId(open ? null : service.id)}
                className="group flex min-h-12 w-full cursor-pointer items-center justify-between gap-4 rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 md:min-h-[3.75rem]"
              >
                <span className="text-xl font-medium leading-[1.22] text-ink transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none sm:text-2xl md:text-4xl">
                  {service.title}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-full border transition-[background-color,color,border-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:size-[3.75rem]",
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
                "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="flex flex-col gap-6 pt-6 md:gap-8 md:pt-10">
                  <ul className="flex flex-wrap items-center gap-2 lg:flex-nowrap lg:gap-4">
                    {service.tags.map((tag, i) => (
                      <Fragment key={tag}>
                        {i > 0 && <li aria-hidden="true" className="hidden h-px min-w-6 flex-1 bg-ink lg:block" />}
                        <li className="rounded-full bg-white px-3 py-1.5 text-sm font-medium leading-[1.5] text-ink lg:bg-transparent lg:p-0 lg:text-lg">
                          {tag}
                        </li>
                      </Fragment>
                    ))}
                  </ul>

                  <ServiceMedia service={service} open={open} />
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}