import { Container } from "@/components/ui/Container";
import { CloudImage } from "@/components/ui/CloudImage";
import { RevealOnView } from "@/components/ui/RevealOnView";
import { SparkleIcon } from "@/components/ui/icons";
import { ContactForm } from "@/components/sections/ContactForm";
import { images } from "@/lib/images";
import { reveal } from "@/lib/reveal";
import { cn } from "@/lib/utils";

/* Figma: "Desktop - 2014" (1440 x 1105), bg #FAFAFA, padding 100px 80px.
   Frame (1280 x 905, gap 20): white card (1280 x 814, radius 30, padding 40, gap 60) -> banner pill (1280 x 71, #F0F0F0).
   Card = left (471 wide: "Contact Us" badge, heading, 3 ta checklist, image collage 471 x 306) + right (669 wide: form).
   id="contact": Footer-er "Contact" link ei section-e ashe. */

const CHECKS = ["Expect a response from us within 24 hours", "We’re happy to sign an NDA upon request.", "Get access to a team of dedicated product specialists."];

/* Figma: vuesax/linear/tick-circle 18 x 18, stroke 1.2 */
function TickCircleIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="#000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="size-[1.125rem] shrink-0" aria-hidden="true">
      <circle cx="9" cy="9" r="7.5" />
      <path d="M5.81 9.05 7.95 11.1l4.24-4.2" />
    </svg>
  );
}

/* Figma: Frame 2147237442 (471 x 306, #F0F0F0, radius 20, overflow clip). Tile height 135, gap 11.02.
   Ekhon duita row automatic marquee: upor-er row dan-e (left -> right), niche-r row bam-e (right -> left). Home-er ShowcaseMarquee-r moto
   pure CSS (.marquee-track / .marquee-track-reverse, globals.css), tai GPU-te smooth, JS lage na.
   Seamless loop: protita set-er width container (471px)-er cheye boro (>= 700px), duita copy, -50% translate.
   Seam-e duita ekoi tile pashapashi na ashe, tai set-er shesh ar shuru-r tile alada (Cuisine/Header, ar 3/4/6/5). */
type Tile = { src: string; width: number };

const ROW_TOP: Tile[] = [
  { src: images.menuCollage2, width: 174.73 }, // Cuisine
  { src: images.menuCollage1, width: 194.19 }, // Header
  { src: images.menuCollage2, width: 174.73 },
  { src: images.menuCollage1, width: 194.19 },
];

const ROW_BOTTOM: Tile[] = [
  { src: images.menuCollage3, width: 176.71 },
  { src: images.menuCollage4, width: 192.41 },
  { src: images.menuCollage6, width: 163.92 },
  { src: images.menuCollage5, width: 189.64 },
];

/* Ekta marquee row. Duita ekoi set, -50% porjonto giye abar shuru (seamless). reverse = left -> right */
function CollageRow({ tiles, reverse = false, duration }: { tiles: Tile[]; reverse?: boolean; duration: string }) {
  const set = (copy: number) => (
    <ul className="flex shrink-0 items-center gap-[11.02px] pr-[11.02px]">
      {tiles.map((tile, i) => (
        <li key={`${copy}-${tile.src}-${i}`} className="relative h-[135px] shrink-0" style={{ width: tile.width }}>
          <CloudImage
            src={tile.src}
            alt=""
            fill
            sizes="200px"
            loading="eager"
            fetchPriority="low"
            decoding="async"
            draggable={false}
            className="select-none object-fill"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee fade-edges overflow-hidden" suppressHydrationWarning>
      <div className={cn("flex w-max", reverse ? "marquee-track-reverse" : "marquee-track")} style={{ animationDuration: duration }}>
        {set(0)}
        {set(1)}
      </div>
    </div>
  );
}

export function ContactFormSection() {
  return (
    <section id="contact" aria-labelledby="contact-form-heading" className="scroll-mt-24 bg-[#FAFAFA] py-16 md:py-[6.25rem]">
      <Container>
        <RevealOnView className="flex flex-col gap-5" threshold={0} rootMargin="0px 0px -10% 0px">
          <div
            className="sr-up grid grid-cols-1 gap-10 rounded-[1.25rem] bg-white p-5 sm:p-8 md:rounded-[1.875rem] lg:grid-cols-[minmax(0,471fr)_minmax(0,669fr)] lg:gap-[3.75rem] lg:p-10"
            style={reveal(0, { duration: 900, y: 40 })}
          >
            {/* Left: Figma Frame 2147237467 (gap 60) */}
            <div className="flex min-w-0 flex-col gap-10 lg:gap-[3.75rem]">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-8 place-items-center rounded-full bg-accent text-white">
                      <SparkleIcon className="size-4" />
                    </span>
                    <span className="text-base font-medium leading-none text-ink">Contact Us</span>
                  </div>
                  <h2
                    id="contact-form-heading"
                    className="text-[2rem] font-medium leading-[1.2] text-black sm:text-5xl lg:text-[length:min(3.75rem,4.1667vw)]"
                  >
                    Have a Project in Mind? Let’s Talk
                  </h2>
                </div>

                <ul className="flex flex-col gap-5">
                  {CHECKS.map((text, i) => (
                    <li key={text} className={`flex items-center gap-3 ${i < 2 ? "sm:h-[1.125rem]" : ""}`}>
                      <TickCircleIcon />
                      <span className={i === 2 ? "text-base leading-[1.5] text-black/70 sm:text-xl" : "text-base leading-[1.3] text-black/70 sm:text-xl sm:leading-none"}>
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Collage: decorative. Upor-er row dan-e, niche-r row bam-e automatic cholbe (hover-e thame, screen-er baire pause) */}
              <div aria-hidden="true" className="flex h-[306px] w-full flex-col justify-center gap-[11px] overflow-hidden rounded-[1.25rem] bg-chip">
                <CollageRow tiles={ROW_TOP} reverse duration="45s" />
                <CollageRow tiles={ROW_BOTTOM} duration="55s" />
              </div>
            </div>

            {/* Right: form */}
            <ContactForm />
          </div>

          {/* Banner pill: Contact.tsx-er ekoi (Figma: Background+Border+Shadow 1280 x 71, #F0F0F0) */}
          <p
            className="sr-up rounded-[1.75rem] bg-chip px-5 py-4 text-center text-base capitalize leading-normal tracking-[0.02em] text-black md:rounded-full md:px-4 md:py-[1.0625rem] md:text-[1.25rem] md:leading-[1.5] lg:px-6 lg:whitespace-nowrap lg:text-[length:min(1.4989rem,calc((100vw_-_13rem)_/_51.8))]"
            style={reveal(250, { duration: 900, y: 24 })}
          >
            Why Risk It With The <strong className="font-medium">Wrong Partner</strong> ? Get 100% Value And Guarantee. Don’t Miss Out - Secure Your{" "}
            <strong className="font-medium">Brand’s Future</strong>
          </p>
        </RevealOnView>
      </Container>
    </section>
  );
}