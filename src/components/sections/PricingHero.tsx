import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { RevealWords } from "@/components/ui/RevealWords";
import { ChevronRightIcon } from "@/components/ui/icons";
import { Header } from "@/components/layout/Header";
import { reveal } from "@/lib/reveal";
import { HeroDuo } from "./HeroDuo";

/* Figma: "Frame 2147237091" (1280 x 250, hug), column, center, gap 24. /services ar /projects-er hero-r ekoi layout, shudhu text alada.
   1) Breadcrumb pill: bg #F0F0F0, radius 100, padding 6 12, gap 4. "Home" 14px rgba(18,18,18,.5) > chevron 12px > "Pricing" 14px #000
   2) Frame (column, gap 16): H1 60px / 110% / 500, center, max 936px | paragraph 16px / 160%, rgba(0,0,0,.7), max 644px
   H1-er majhe Figma + Dribbble circle (HeroDuo: 1em = heading font-size), "Digital" ar "Experiences"-er majhe.
   Header-er upore faka (pt) home Hero-r ekoi formula (var(--h)), --h ashe page.tsx-er wrapper theke. */

/* Figma: "Frame 2147237402" (1280 x 525, left 80, top -35, z-index 0): hero-r pichone 4ta lomba rectangle (255 x 525 each),
   upor theke niche halka gray (#F9F9F9) -> shada (#FFF) gradient. x position (frame-er bhitore): 0, 337, 693, 1025.
   - Bam-dan-er duto (0, 1025): gradient pura 525px-e (0.02% -> 99.98%). Majher duto (337, 693): 61.52% e-i shada hoye jay.
   - Frame hero section-er top theke 35px upore shuru (top -35), tai upor-er 35px section-er baire/kata. Section-er niche-r ongsho (525 - 35 - hero height)
     Figma-te porer TrustedBy strip (z-index 1, bg #FAFAFA) dheke dey, tai section-e overflow-hidden diye kete dilam.
   - Frame 1280px-e fixed + majhkhane (Container-er content width-er shathe milbe 1440px-e). Shudhu xl (1280px+) screen-e, choto screen-e rectangle gulo overlap korto. */
const BG_STRIPES = [
  { left: 0, background: "linear-gradient(180.03deg, #F9F9F9 0.02%, #FFFFFF 99.98%)" },
  { left: 337, background: "linear-gradient(180.04deg, #F9F9F9 0.04%, #FFFFFF 61.52%)" },
  { left: 693, background: "linear-gradient(180.04deg, #F9F9F9 0.04%, #FFFFFF 61.52%)" },
  { left: 1025, background: "linear-gradient(180.03deg, #F9F9F9 0.02%, #FFFFFF 99.98%)" },
];

/* Reveal timeline (ms) /services-er moto-i: header -> breadcrumb -> heading (word by word) -> duo -> paragraph */
const HEADING_START = 250;
const HEADING_STEP = 55;

const HEADING_LEAD = "Simple Pricing for Meaningful Digital";
const leadCount = HEADING_LEAD.split(" ").length; // 5 ta word, tarpor duo, tarpor "Experiences"

export function PricingHero() {
  return (
    <section className="relative pb-10 pt-10 md:pb-[4.375rem] md:pt-[clamp(1.25rem,calc(var(--h)*0.06349_-_32.70px),2.5rem)]">
      {/* Figma background rectangle-gulo (decorative). Content-er pichone (Container `relative` hole upore thake) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden overflow-hidden xl:block">
        <div className="absolute left-1/2 top-[-35px] h-[525px] w-[1280px] -translate-x-1/2">
          {BG_STRIPES.map((stripe) => (
            <div
              key={stripe.left}
              className="absolute top-0 h-[525px] w-[255px]"
              style={{ left: stripe.left, background: stripe.background }}
            />
          ))}
        </div>
      </div>

      <Container className="relative">
        <Header />

        <div className="mt-10 flex flex-col items-center gap-6 md:mt-[3.75rem]">
          <nav aria-label="Breadcrumb" className="reveal" style={reveal(150, { blur: 6 })}>
            <ol className="flex items-center gap-1 rounded-full bg-chip px-3 py-1.5 text-sm leading-none">
              <li>
                <Link href="/" className="text-ink/50 transition-colors duration-300 hover:text-black">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="grid size-3 place-items-center text-ink/50">
                <ChevronRightIcon className="size-3" />
              </li>
              <li aria-current="page" className="text-black">
                Pricing
              </li>
            </ol>
          </nav>

          <div className="flex w-full flex-col items-center gap-4">
            <h1 className="max-w-[58.5rem] text-center text-[2rem] font-medium leading-[1.1] text-black sm:text-5xl lg:text-[3.75rem]">
              <RevealWords text={HEADING_LEAD} start={HEADING_START} step={HEADING_STEP} />{" "}
              <HeroDuo delay={HEADING_START + leadCount * HEADING_STEP} />{" "}
              <RevealWords text="Experiences" start={HEADING_START + (leadCount + 1) * HEADING_STEP} step={HEADING_STEP} />
            </h1>
            <p
              className="reveal max-w-[40.25rem] text-center text-base leading-[1.6] text-black/70"
              style={reveal(650, { duration: 800, blur: 6 })}
            >
              Explore flexible pricing options designed to fit your goals, project needs, and budget while delivering
              meaningful digital experiences that create lasting value.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}