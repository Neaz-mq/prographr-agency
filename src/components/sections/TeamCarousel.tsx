"use client";

import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { CloudImage } from "@/components/ui/CloudImage";
import { ChevronRightIcon, LinkedinIcon, VerifyBoldIcon } from "@/components/ui/icons";
import { team } from "@/lib/team";
import { cn } from "@/lib/utils";

type EmblaApi = NonNullable<ReturnType<typeof useEmblaCarousel>[1]>;

/* Figma: card 302 x 336 (4 ta ekshathe, gap 24px), nicher progress bar (6 x 110px, gap 9px) + prev/next (32px) */
export function TeamCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const fills = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    /* Progress bar: scroll-er shathe segment gula fill hoy. Direct DOM update, jeno protita frame-e re-render na hoy */
    const updateProgress = (api: EmblaApi) => {
      const total = team.length;
      const raw = api.scrollSnapList().length > 1 ? api.scrollProgress() : 1;
      const progress = Math.min(1, Math.max(0, raw)) * total;
      fills.current.forEach((el, i) => {
        if (el) el.style.transform = `scaleX(${Math.min(1, Math.max(0, progress - i))})`;
      });
    };
    const updateButtons = (api: EmblaApi) => {
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };

    const onScroll = () => updateProgress(emblaApi);
    const onSelect = () => updateButtons(emblaApi);
    const onReInit = () => {
      updateProgress(emblaApi);
      updateButtons(emblaApi);
    };

    onReInit();
    emblaApi.on("scroll", onScroll).on("select", onSelect).on("reInit", onReInit);
    return () => {
      emblaApi.off("scroll", onScroll).off("select", onSelect).off("reInit", onReInit);
    };
  }, [emblaApi]);

  return (
    <div className="flex flex-col items-center gap-[1.875rem]" role="region" aria-roledescription="carousel" aria-label="Our team">
      <div ref={emblaRef} className="w-full overflow-hidden">
        <ul className="-ml-4 flex sm:-ml-6">
          {team.map((member, i) => (
            <li
              key={`${member.name}-${i}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${team.length}`}
              className="min-w-0 shrink-0 grow-0 basis-[80%] pl-4 sm:basis-1/2 sm:pl-6 lg:basis-1/3 min-[1400px]:basis-1/4"
            >
              <article
                className={cn(
                  "relative isolate flex h-[21rem] flex-col justify-end overflow-hidden rounded-[1.25rem] bg-[#FAFAFA] px-5 pt-5",
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
                    draggable={false}
                  />
                </div>

                {/* Caption: bg white 80%, blur 3px, radius 12px, padding 12px */}
                <div className="relative z-10 flex w-full items-center justify-between gap-3 rounded-xl bg-white/80 p-3 backdrop-blur-[3px]">
                  <div className="flex min-w-0 flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-xl font-medium leading-none text-ink">{member.name}</h3>
                      <VerifyBoldIcon className="size-5 shrink-0 text-accent" />
                    </div>
                    <p className="truncate text-base leading-none text-ink/70">{member.role}</p>
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
      <div className="flex w-full max-w-[49.8125rem] items-center gap-5">
        <div className="flex flex-1 items-center gap-[0.5625rem]" aria-hidden="true">
          {team.map((member, i) => (
            <span key={`${member.name}-${i}`} className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-[#F0F0F0]">
              <span
                ref={(el) => {
                  fills.current[i] = el;
                }}
                className="absolute inset-0 origin-left rounded-full bg-black will-change-transform"
                style={{ transform: "scaleX(0)" }}
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