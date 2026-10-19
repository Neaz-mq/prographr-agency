"use client";

import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { CloudImage } from "@/components/ui/CloudImage";
import { ChevronRightIcon } from "@/components/ui/icons";
import { testimonials } from "@/lib/testimonials";
import { reveal } from "@/lib/reveal";
import { isBackdropFrozen } from "@/lib/menu-backdrop";
import { cn } from "@/lib/utils";

type EmblaApi = NonNullable<ReturnType<typeof useEmblaCarousel>[1]>;

const AUTOPLAY_MS = 5000; // ek-ta slide-er jonno koto ms (progress bar-o ei somoye egoy)
const GLIDE_DURATION = 42; // embla scroll speed: boro = dhire/narom glide (default 25 ~ 0.9s, 42 ~ 1.6s)

/* Figma: card 302 x 336 (lg+ e 4 ta ekshathe, md-te 3, sm-e 2, gap 24px), nicher progress bar (6 x 110px, gap 9px) + prev/next (32px) */
export function TestimonialCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center", loop: true, containScroll: false, duration: GLIDE_DURATION });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const fills = useRef<(HTMLSpanElement | null)[]>([]);
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!emblaApi) return;

    /* Progress bar: scroll-er shathe segment gula fill hoy. Direct DOM update, jeno protita frame-e re-render na hoy */
    const updateProgress = (api: EmblaApi) => {
      const active = api.scrollSnapList().length > 1 ? api.selectedScrollSnap() : -1;
      fills.current.forEach((el, i) => {
        if (!el) return;
        el.style.transform = "scaleX(1)";
        el.style.opacity = active === -1 || i === active ? "1" : "0";
      });
    };
    /* Prev arrow: prothom slide-e thakle gray + click kora jay na. 2nd slide-e gele (autoplay ba Next click e) active hoy.
       Embla `loop: true`-te canScrollPrev() shobsomoy true thake, tai selectedScrollSnap() dekhe nijera thik kori.
       Next arrow loop-er jonno shobsomoy active (slide korar moto jinis thakle). */
    const updateButtons = (api: EmblaApi) => {
      const hasSlides = api.scrollSnapList().length > 1;
      setCanPrev(hasSlides && api.selectedScrollSnap() > 0);
      setCanNext(hasSlides && api.canScrollNext());
    };

    /* Autoplay cholle bar-er fill niche-r effect-e time diye hoy. Shudhu reduced-motion-e (autoplay nai) scroll-er shathe fill hoy */
    const scrollDriven = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onScroll = () => {
      if (scrollDriven) updateProgress(emblaApi);
    };
    const onSelect = () => updateButtons(emblaApi);
    const onReInit = () => {
      if (scrollDriven) updateProgress(emblaApi);
      updateButtons(emblaApi);
    };

    onReInit();
    emblaApi.on("scroll", onScroll).on("select", onSelect).on("reInit", onReInit);
    return () => {
      emblaApi.off("scroll", onScroll).off("select", onSelect).off("reInit", onReInit);
    };
  }, [emblaApi]);

  /* Autoplay (infinite loop): protita slide AUTOPLAY_MS dhore thake, tarpor nijei porer slide-e jay. Shesh slide-er por card gulo seamless-e
     prothom card-e continue kore (embla loop), kothao ferot jay na, reload/restart-er feel nai.
     Progress bar (story / hero-carousel-er standard pattern): ek-ta segment = ek-ta slide. Shudhu active slide-er segment dhire fill hoy
     (AUTOPLAY_MS dhore), baki segment grey. Slide bodlale ager segment fade out hoy, porer-ta 0 theke fill shuru kore. Shesh theke prothome gele
     o ekoi niyom, bar kokhono ekdom khali ba "drain" hoy na. Arrow / drag korle active segment sathe sathe bodle jay ar timer reset hoy.
     Pause hoy: mouse upore thakle, keyboard focus bhitore thakle, drag cholle, section screen-e na thakle, tab hidden hole.
     prefers-reduced-motion-e autoplay hoy na (shudhu active segment solid dekhay). */
  useEffect(() => {
    if (!emblaApi) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const region = regionRef.current;
    let elapsed = 0;
    let activeSeg = -1;
    let last = 0;
    let raf = 0;
    let hovered = false;
    let focused = false;
    let dragging = false;
    let inView = false;

    /* Active segment-er fill = elapsed / AUTOPLAY_MS. Segment inactive hole opacity fade out (scale ta fade shesh howar por-i reset hoy,
       tai ager segment ekdom khali hoye jay na), abar active hole 0 theke shuru */
    const paint = (active: number, progress: number) => {
      fills.current.forEach((el, i) => {
        if (!el) return;
        if (i === active) {
          if (i !== activeSeg) {
            el.style.transition = "none";
            el.style.transform = "scaleX(0)";
            el.style.opacity = "1";
          }
          el.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
        } else if (i === activeSeg) {
          el.style.transition = "opacity 450ms ease";
          el.style.opacity = "0";
        }
      });
      activeSeg = active;
    };

    const loop = (now: number) => {
      raf = 0;
      const dt = last ? Math.min(now - last, 50) : 16;
      last = now;

      const snaps = emblaApi.scrollSnapList().length;
      if (snaps <= 1) {
        // sob card ekshathe dekha jay, slide korar kichu nai, shob segment bhora
        fills.current.forEach((el) => {
          if (el) {
            el.style.transform = "scaleX(1)";
            el.style.opacity = "1";
          }
        });
        return;
      }

      /* Nav menu (Project / Services) khola thakle autoplay ruke thake: pechone slide/progress bar nore na, tai blur-er niche kono extra frame toiri hoy na */
      const paused = hovered || focused || dragging || document.hidden || isBackdropFrozen();
      if (!paused) elapsed += dt;

      if (elapsed >= AUTOPLAY_MS) {
        elapsed = 0;
        emblaApi.scrollNext(); // loop: shesh slide theke seamless-e prothomey jay
      }

      paint(emblaApi.selectedScrollSnap(), elapsed / AUTOPLAY_MS);

      if (inView) raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!raf && inView) {
        last = 0;
        raf = requestAnimationFrame(loop);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
      },
      { threshold: 0.2 },
    );
    if (region) observer.observe(region);

    const reset = () => {
      elapsed = 0;
    };
    const onDown = () => {
      dragging = true;
    };
    const onUp = () => {
      dragging = false;
      reset();
    };
    const onEnter = () => {
      hovered = true;
    };
    const onLeave = () => {
      hovered = false;
    };
    // mouse click-e button focus pay, oita pause kora jabe na. Shudhu keyboard (focus-visible) hole pause
    const onFocusIn = (e: FocusEvent) => {
      focused = (e.target as HTMLElement).matches(":focus-visible");
    };
    const onFocusOut = () => {
      focused = false;
    };
    const onVisibility = () => {
      if (!document.hidden) start();
    };

    emblaApi.on("select", reset).on("pointerDown", onDown).on("pointerUp", onUp).on("reInit", start);
    const viewport = emblaApi.rootNode(); // shudhu card-er upor hover hole pause, arrow/bar-er upor na
    viewport.addEventListener("pointerenter", onEnter);
    viewport.addEventListener("pointerleave", onLeave);
    region?.addEventListener("focusin", onFocusIn);
    region?.addEventListener("focusout", onFocusOut);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
      emblaApi.off("select", reset).off("pointerDown", onDown).off("pointerUp", onUp).off("reInit", start);
      viewport.removeEventListener("pointerenter", onEnter);
      viewport.removeEventListener("pointerleave", onLeave);
      region?.removeEventListener("focusin", onFocusIn);
      region?.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [emblaApi]);

  return (
    <div ref={regionRef} className="flex w-full flex-col items-center gap-[1.875rem]" role="region" aria-roledescription="carousel" aria-label="Client testimonials">
      {/* Full-width viewport: majhkhane active card, duipashe porer/ager card-er ongsho peek kore (Figma-r moto) */}
      {/* Reveal ekhane, protita card-e na: embla loop-e left card ashole shesh slide (index 5) hoy, tai card-wise stagger korle
          left card shobar shesh-e (180ms pore) ashto ar faka dekhto. Ekhon 3 ta card ekshathe ek-i animation-e ashe. */}
      <div ref={emblaRef} className="sr-up w-full overflow-hidden" style={reveal(0, { duration: 900, y: 40 })}>
        <ul className="-ml-4 flex md:-ml-[2.8rem]">
          {testimonials.map((t, i) => (
            <li
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${testimonials.length}`}
              className="min-w-0 shrink-0 grow-0 basis-[88%] pl-4 md:basis-[49.8rem] md:pl-[2.8rem]"
            >
              {/* Figma: 797 x 398, bg #FAFAFA, radius 25, padding 37, gap 16 */}
              <article className="flex h-full flex-col gap-4 rounded-[1.5rem] bg-[#FAFAFA] p-4 sm:p-6 md:min-h-[24.9rem] md:flex-row md:p-[2.3rem]">
                {/* Screenshot frame: 228 x 324, white, radius 20. Page-er upor-er ongsho dekha jay */}
                <div className="relative h-56 shrink-0 overflow-hidden rounded-[1.25rem] bg-white md:h-auto md:w-[14.25rem] md:self-stretch">
                  <CloudImage
                    src={t.screenshot}
                    alt={`${t.name}, ${t.role}: website screenshot`}
                    fill
                    sizes="(min-width: 768px) 14.25rem, 80vw"
                    loading="eager" /* lazy hole offscreen/peek card-er image pore load hoy, left card faka dekhay */
                    className="object-cover object-top"
                    draggable={false}
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between gap-5">
                  <div className="flex flex-col gap-4">
                    <p className="flex items-center gap-2 text-base font-medium leading-tight text-ink md:text-xl">
                      <AsteriskIcon className="size-5 shrink-0 text-accent md:size-6" />
                      {t.duration}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {t.services.map((service) => (
                        <li key={service} className="rounded-full bg-white px-2.5 py-0.5 text-sm leading-[1.6] text-black">
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <blockquote className="text-base leading-[1.6] text-black md:text-xl">{t.quote}</blockquote>

                  <div className="flex items-end justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-2">
                      {t.avatar ? (
                        <span className="relative size-10 shrink-0 overflow-hidden rounded-full bg-[#D9D9D9]">
                          <CloudImage src={t.avatar} alt="" fill sizes="2.5rem" className="object-cover" />
                        </span>
                      ) : (
                        <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-[#D9D9D9] text-sm font-medium text-black/70">
                          {t.name.charAt(0)}
                        </span>
                      )}
                      <div className="flex min-w-0 flex-col gap-1">
                        <p className="truncate text-base font-medium leading-[1.2] text-black md:text-[1.0875rem]">{t.name}</p>
                        <p className="truncate text-sm leading-[1.2] text-black/70 md:text-[0.855rem]">{t.role}</p>
                      </div>
                    </div>
                    <p className="flex shrink-0 items-center gap-1 text-xl leading-[1.2] text-black">
                      {t.rating}
                      <StarIcon className="size-[0.9375rem] text-[#FFD43B]" />
                    </p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {/* Controls: card-er width-er moto (797px): progress bar + prev/next. Team-er moto ekoi behaviour */}
      <div className="sr-up flex w-full max-w-[49.8125rem] items-center gap-5 px-4 md:px-0" style={reveal(450, { duration: 900, y: 20 })}>
        <div className="flex flex-1 items-center gap-[0.5625rem]" aria-hidden="true">
          {testimonials.map((_, i) => (
            <span key={i} className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-[#F0F0F0]">
              <span
                ref={(el) => {
                  fills.current[i] = el;
                }}
                className="absolute inset-0 origin-left rounded-full bg-black will-change-transform"
                style={{ transform: "scaleX(0)", opacity: i === 0 ? 1 : 0 }}
              />
            </span>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            aria-label="Previous testimonial"
            className={cn(
              "grid size-8 place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              canPrev ? "bg-black text-white" : "bg-[#F0F0F0] text-[#112222]",
            )}
          >
            <ChevronRightIcon className="size-4 -scale-x-100" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            aria-label="Next testimonial"
            className={cn(
              "grid size-8 place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              canNext ? "bg-black text-white" : "bg-[#F0F0F0] text-[#112222]",
            )}
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function AsteriskIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <path d="M12 2.5v19M3.8 7.25l16.4 9.5M3.8 16.75l16.4-9.5" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.2l2.9 6.2 6.8.8-5 4.7 1.3 6.7L12 17.2 6 20.6l1.3-6.7-5-4.7 6.8-.8L12 2.2z" />
    </svg>
  );
}