import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { RevealWords } from "@/components/ui/RevealWords";
import { ChevronRightIcon } from "@/components/ui/icons";
import { Header } from "@/components/layout/Header";
import { HeroStripes } from "@/components/ui/HeroStripes";
import { reveal } from "@/lib/reveal";
import { HeroDuo } from "./HeroDuo";

/* Figma: "Frame 2147237091" (1280 x 250, hug), column, center, gap 24. /projects-er hero-r ekoi layout, shudhu text alada.
   1) Breadcrumb pill: bg #F0F0F0, radius 100, padding 6 12, gap 4. "Home" 14px rgba(18,18,18,.5) > chevron 12px > "Service" 14px #000
   2) Frame (column, gap 16): H1 60px / 110% / 500, center, max 936px | paragraph 16px / 160%, rgba(0,0,0,.7), max 696px
   H1-er majhe Figma + Dribbble circle (HeroDuo: 1em = heading font-size), "More" ar "Memorable"-er majhe.
   Header-er upore faka (pt) home Hero-r ekoi formula (var(--h)), --h ashe page.tsx-er wrapper theke. */

/* Reveal timeline (ms) /projects-er moto-i: header -> breadcrumb -> heading (word by word) -> duo -> paragraph */
const HEADING_START = 250;
const HEADING_STEP = 55;

const HEADING_LEAD = "We Design Experiences That Make Brands More";
const leadCount = HEADING_LEAD.split(" ").length; // 8 ta word, tarpor duo, tarpor "Memorable"

export function ServicesHero() {
  return (
    <section className="relative pb-10 pt-10 md:pb-[4.375rem] md:pt-[clamp(1.25rem,calc(var(--h)*0.06349_-_32.70px),2.5rem)]">
      {/* Figma background stripes (decorative, shob hero-te ekoi). Content-er pichone (Container `relative` hole upore thake) */}
      <HeroStripes />

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
                Service
              </li>
            </ol>
          </nav>

          <div className="flex w-full flex-col items-center gap-4">
            <h1 className="max-w-[58.5rem] text-center text-[2rem] font-medium leading-[1.1] text-black sm:text-5xl lg:text-[3.75rem]">
              <RevealWords text={HEADING_LEAD} start={HEADING_START} step={HEADING_STEP} />{" "}
              <HeroDuo delay={HEADING_START + leadCount * HEADING_STEP} />{" "}
              <RevealWords text="Memorable" start={HEADING_START + (leadCount + 1) * HEADING_STEP} step={HEADING_STEP} />
            </h1>
            <p
              className="reveal max-w-[43.5rem] text-center text-base leading-[1.6] text-black/70"
              style={reveal(650, { duration: 800, blur: 6 })}
            >
              We create meaningful digital experiences that connect brands with their audiences, strengthen
              relationships, and turn bold ideas into lasting impact through thoughtful design
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}