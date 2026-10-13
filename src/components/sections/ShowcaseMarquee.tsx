import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { CloudImage } from "@/components/ui/CloudImage";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

/* Figma: "Frame 2147237242" (1440 x 857), bg #FAFAFA, padding 100px 80px, gap 60px.
   Tinta row: text marquee (32px) / image marquee (473px) / text marquee (32px). Shob row-i 1280px container-e clip kora. */

const words = [
  "Framer",
  "Branding",
  "Figma",
  "Dashboard",
  "Logos",
  "Webflow",
  "Slide Decks",
  "Mobile Apps",
  "Social Media",
  "Web App",
  "Software",
];

/* Desktop card: CSS frame (Figma: 630.22 x 472.87, border 5.02px #000, radius 23.43px, bg white) + bhitore design image.
   Inner image-er position Figma theke (frame-er border-er bhitor theke, px / 16 = em). Frame-er bairer ongsho overflow-hidden diye kata. */
type FramedShot = { kind: "framed"; src: string; alt: string; innerClassName: string; sizes: string };

/* Phone card: PNG-te nijer border ache. Height fixed (em), width natural aspect onujayi auto, tai kono faka thake na */
type PlainShot = { kind: "plain"; src: string; alt: string; width: number; height: number; heightClass: string; sizes: string };

type Shot = FramedShot | PlainShot;

const shots: Shot[] = [
  {
    kind: "framed",
    src: images.showcaseDashboard, // Desktop - 93 (691 x 527.23, left 29.95, top 30)
    alt: "MoneyBoard finance dashboard web design",
    innerClassName: "left-[1.5581em] top-[1.5613em] h-[32.9519em] w-[43.1875em]",
    sizes: "(min-width: 768px) 692px, 432px",
  },
  {
    kind: "plain",
    src: images.showcasePhone, // iPhone 13 mini (218.44 x 473)
    alt: "Health insurance mobile app design",
    width: 218,
    height: 473,
    heightClass: "h-[29.5625em]",
    sizes: "(min-width: 768px) 219px, 137px",
  },
  {
    kind: "framed",
    src: images.showcaseFinPilot, // Desktop - 57 (691.34 x 466.18, left 33.78, top 33.47)
    alt: "FinPilot finance dashboard web design",
    innerClassName: "left-[1.7975em] top-[1.7781em] h-[29.1363em] w-[43.2088em]",
    sizes: "(min-width: 768px) 693px, 433px",
  },
];

/* Ekta marquee row. Duita copy (duitar width soman) rakhle -50% translate-e seamless loop hoy. Dwitiyo copy screen reader theke lukano */
function MarqueeRow({
  renderSet,
  reverse = false,
  duration,
  className,
}: {
  renderSet: (hidden: boolean) => ReactNode;
  reverse?: boolean;
  duration: string;
  className?: string;
}) {
  return (
    <div className="marquee overflow-hidden">
      <div
        className={cn("flex w-max", reverse ? "marquee-track-reverse" : "marquee-track", className)}
        style={{ animationDuration: duration }}
      >
        {renderSet(false)}
        {renderSet(true)}
      </div>
    </div>
  );
}

/* Text: 24px, letter-spacing 0.64px, dot 10.67px, gap 41px */
function WordSet({ hidden }: { hidden: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-6 pr-6 md:gap-[2.5625rem] md:pr-[2.5625rem]"
    >
      {words.map((word) => (
        <li key={word} className="flex items-center gap-6 md:gap-[2.5625rem]">
          <span className="whitespace-nowrap text-lg leading-none tracking-[0.0267em] text-black md:text-2xl">{word}</span>
          <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-black md:size-[0.6667rem]" />
        </li>
      ))}
    </ul>
  );
}

/* Images: gap 40px. Mobile-e em scale choto, 768px+ e Figma-r size.
   loading="eager": marquee-r image lazy hole scroll-er shomoy pop-in/jank hoy, tai age-i load kore rakha hoy (priority low, jeno hero-ke slow na kore) */
function ShotSet({ hidden }: { hidden: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-[2.5em] pr-[2.5em]">
      {shots.map((shot) => (
        <li key={shot.src} className="flex shrink-0">
          {shot.kind === "framed" ? (
            <div className="relative isolate box-border h-[29.5544em] w-[39.3888em] shrink-0 overflow-hidden rounded-[1.4647em] border-[0.3138em] border-black bg-white">
              <div className={cn("absolute", shot.innerClassName)}>
                <CloudImage
                  src={shot.src}
                  alt={hidden ? "" : shot.alt}
                  fill
                  sizes={shot.sizes}
                  loading="eager"
                  fetchPriority="low"
                  draggable={false}
                  className="select-none object-cover"
                />
              </div>
            </div>
          ) : (
            <CloudImage
              trim
              src={shot.src}
              alt={hidden ? "" : shot.alt}
              width={shot.width}
              height={shot.height}
              sizes={shot.sizes}
              loading="eager"
              fetchPriority="low"
              draggable={false}
              className={cn("w-auto max-w-none shrink-0 select-none", shot.heightClass)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export function ShowcaseMarquee() {
  return (
    <section aria-label="Our design work and services" className="bg-[#FAFAFA] py-16 md:py-[6.25rem]">
      <Container className="flex flex-col gap-8 md:gap-[3.75rem]">
        {/* Row 1: text, bam-e cholbe */}
        <MarqueeRow duration="48s" renderSet={(hidden) => <WordSet hidden={hidden} />} />

        {/* Row 2: image, dan-e cholbe (ulta dike). -ml: Figma-r moto shuru-te prothom desktop-er ektu ongsho kata thake */}
        <div className="text-[0.625rem] sm:text-xs md:text-base">
          <MarqueeRow
            reverse
            duration="70s"
            className="-ml-[5.65em]"
            renderSet={(hidden) => <ShotSet hidden={hidden} />}
          />
        </div>

        {/* Row 3: text, bam-e cholbe */}
        <MarqueeRow duration="48s" renderSet={(hidden) => <WordSet hidden={hidden} />} />
      </Container>
    </section>
  );
}