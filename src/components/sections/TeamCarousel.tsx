"use client";

import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { CloudImage } from "@/components/ui/CloudImage";
import { ChevronRightIcon, LinkedinIcon, VerifyBoldIcon } from "@/components/ui/icons";
import { team } from "@/lib/team";
import { reveal } from "@/lib/reveal";
import { isBackdropFrozen } from "@/lib/menu-backdrop";
import { cn } from "@/lib/utils";

type EmblaApi = NonNullable<ReturnType<typeof useEmblaCarousel>[1]>;

const AUTOPLAY_MS = 5000; // ek-ta slide-er jonno koto ms (progress bar-o ei somoye egoy)
const GLIDE_DURATION = 42; // embla scroll speed: boro = dhire/narom glide (default 25 ~ 0.9s, 42 ~ 1.6s)

/* Figma: card 302 x 336 (lg+ e 4 ta ekshathe, md-te 3, sm-e 2, gap 24px), nicher progress bar (6 x 110px, gap 9px) + prev/next (32px) */
export function TeamCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true, containScroll: false, duration: GLIDE_DURATION });
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
    <div ref={regionRef} className="flex flex-col items-center gap-[1.875rem]" role="region" aria-roledescription="carousel" aria-label="Our team">
      <div ref={emblaRef} className="w-full overflow-hidden">
        <ul className="-ml-4 flex sm:-ml-6">
          {team.map((member, i) => (
            <li
              key={`${member.name}-${i}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${team.length}`}
              style={reveal(Math.min(i, 4) * 90, { duration: 900, y: 40 })}
              className="sr-up min-w-0 shrink-0 grow-0 basis-[80%] pl-4 sm:basis-1/2 sm:pl-6 md:basis-1/3 lg:basis-1/4"
            >
              <article
                className={cn(
                  "relative isolate flex h-[21rem] flex-col justify-end overflow-hidden rounded-[1.25rem] bg-[#FAFAFA] px-3 pt-5 min-[1280px]:px-5",
                  member.captionLow ? "pb-3" : "pb-5",
                )}
              >
                <div className="absolute z-0" style={member.imageStyle}>
                  <CloudImage
                    src={member.image}
                    alt={`${member.name}, ${member.role}`}
                    fill
                    sizes="(min-width: 1024px) 35rem, 100vw"
                    className="object-cover"
                    style={member.imagePosition ? { objectPosition: member.imagePosition } : undefined}
                    draggable={false}
                  />
                </div>

                {/* Caption: bg white 80%, blur 3px, radius 12px, padding 12px */}
                <div className="relative z-10 flex w-full items-center justify-between gap-3 rounded-xl bg-white/80 p-3 backdrop-blur-[3px]">
                  <div className="flex min-w-0 flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium leading-tight text-ink min-[1280px]:truncate min-[1280px]:text-base min-[1280px]:leading-none min-[1440px]:text-xl">{member.name}</h3>
                      <VerifyBoldIcon className="size-4 shrink-0 text-accent min-[1440px]:size-5" />
                    </div>
                    <p className="text-xs leading-tight text-ink/70 min-[1280px]:truncate min-[1280px]:text-sm min-[1280px]:leading-none min-[1440px]:text-base">{member.role}</p>
                  </div>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="grid size-[2.125rem] shrink-0 place-items-center rounded-lg bg-[#FAFAFA] text-black transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <LinkedinIcon className="size-5" />
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {/* Controls: progress bar (705px) + gap 20px + prev/next (72px) = 797px */}
      <div className="sr-up flex w-full max-w-[49.8125rem] items-center gap-5" style={reveal(450, { duration: 900, y: 20 })}>
        <div className="flex flex-1 items-center gap-[0.5625rem]" aria-hidden="true">
          {team.map((member, i) => (
            <span key={`${member.name}-${i}`} className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-[#F0F0F0]">
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
            aria-label="Previous team members"
            className={cn(
              "grid size-8 place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-default",
              canPrev ? "bg-black text-white" : "bg-[#F0F0F0] text-[#112222]",
            )}
          >
            <ChevronRightIcon className="size-4 -scale-x-100" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            aria-label="Next team members"
            className={cn(
              "grid size-8 place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-default",
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