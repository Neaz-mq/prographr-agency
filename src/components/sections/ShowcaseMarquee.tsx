import type { ReactNode } from "react";
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

/* Desktop card: CSS frame (height Figma: 472.87, border 5.02px #000, radius 23.43px) + bhitore image FRAME-ER PURO WIDTH/HEIGHT bhore (object-cover), hero-er card-er moto full-bleed.
   Kono white gap / shadow margin dekha jay na. Protita frame-er width image-er ratio onujayi (widthClass), tai object-cover-e kono ongsho kata-o jay na.
   Desktop - 93 PNG 2956 x 2301, charpashe 3.25% baked shadow margin ache, tai innerClassName negative inset (-3.5%) diye oi margin frame-er bairey pathiye kete dewa hoyeche. */
type FramedShot = { kind: "framed"; src: string; alt: string; widthClass: string; innerClassName: string; sizes: string };

/* Phone card: PNG-te nijer border ache. Height fixed (em), width natural aspect onujayi auto, tai kono faka thake na */
type PlainShot = { kind: "plain"; src: string; alt: string; width: number; height: number; heightClass: string; sizes: string };

type Shot = FramedShot | PlainShot;

/* Phone card: loop-er seam-eo (set-er shesh o notun set-er shuru) duto dashboard pashapashi na ashe, tai phone protita dashboard-er majhe boshe */
const phoneShot: PlainShot = {
  kind: "plain",
  src: images.showcasePhone, // iPhone 13 mini (218.44 x 473)
  alt: "Health insurance mobile app design",
  width: 218,
  height: 473,
  heightClass: "h-[29.5625em]",
  sizes: "(min-width: 768px) 219px, 137px",
};

/* Sequence: Dashboard, Phone, Dashboard, Phone, (loop) Dashboard, Phone ... */
const shots: Shot[] = [
  {
    kind: "framed",
    src: images.showcaseDashboard, // Desktop - 93 (PNG 2956 x 2301, charpashe 3.25% baked shadow margin, tai -3.5% inset e kete full-bleed kora)
    alt: "MoneyBoard finance dashboard web design",
    widthClass: "w-[38em]",
    innerClassName: "-inset-[3.5%]",
    sizes: "(min-width: 768px) 620px, 394px",
  },
  phoneShot,
  {
    kind: "framed",
    src: images.showcaseFinPilot, // Desktop - 57 (Figma: 691.34 x 466.18, ratio 1.48). Shadow/margin nai, tai pura frame bhore (inset-0), frame-er width ratio onujayi boro
    alt: "FinPilot finance dashboard web design",
    widthClass: "w-[43.5em]",
    innerClassName: "inset-0",
    sizes: "(min-width: 768px) 700px, 440px",
  },
  phoneShot,
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
    <div className="marquee overflow-hidden" suppressHydrationWarning>
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
      {shots.map((shot, index) => (
        <li key={`${shot.src}-${index}`} className="flex shrink-0">
          {shot.kind === "framed" ? (
            <div className={cn("relative isolate box-border h-[29.5544em] shrink-0 overflow-hidden rounded-[1.4647em] border-[0.3138em] border-black bg-white", shot.widthClass)}>
              <div className={cn("absolute", shot.innerClassName)}>
                <CloudImage
                  src={shot.src}
                  alt={hidden ? "" : shot.alt}
                  fill
                  sizes={shot.sizes}
                  loading="eager"
                  fetchPriority="low"
                  decoding="async"
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
              decoding="async"
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
  /* Tinta row-i full-bleed (screen-er puro width), hero-er marquee-r moto. Majher image row ager moto 1280px container-e clip kora ar fade chhilo na, ekhon puro width */
  return (
    <section aria-label="Our design work and services" className="flex flex-col gap-8 overflow-x-clip bg-[#FAFAFA] py-16 md:gap-[3.75rem] md:py-[6.25rem]">
      {/* Row 1: text, bam-e cholbe */}
      <MarqueeRow duration="48s" renderSet={(hidden) => <WordSet hidden={hidden} />} />

      {/* Row 2: image, dan-e cholbe (ulta dike). Full-bleed (Container ar fade chhara), hero-er marquee-r moto screen-er ek pash theke arek pash porjonto */}
      <div className="text-[0.625rem] sm:text-xs md:text-base">
        <MarqueeRow reverse duration="75s" renderSet={(hidden) => <ShotSet hidden={hidden} />} />
      </div>

      {/* Row 3: text, bam-e cholbe */}
      <MarqueeRow duration="48s" renderSet={(hidden) => <WordSet hidden={hidden} />} />
    </section>
  );
}