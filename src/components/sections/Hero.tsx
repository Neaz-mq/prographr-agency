import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RevealWords } from "@/components/ui/RevealWords";
import { Header } from "@/components/layout/Header";
import { HeroStripes } from "@/components/ui/HeroStripes";
import { reveal } from "@/lib/reveal";
import { HeroShowcase } from "./HeroShowcase";
import { HeroDuo } from "./HeroDuo";

/* Hero text reveal timeline (ms). Sequence: header -> badge -> heading (word by word) -> paragraph -> buttons -> showcase */
const HEADING_START = 250; // prothom word kokhon shuru
const HEADING_STEP = 55; // ek word theke porer word-er gap

const HEADING_LEAD = "Turning Bold Ideas Into Exceptional Digital Experiences";
const leadCount = HEADING_LEAD.split(" ").length; // 7 ta word, tarpor duo, tarpor "Inspire."

export function Hero() {
  return (
    /* flex-auto: page.tsx-er wrapper (min-h-svh) screen-er cheye lomba hole extra jayga ei section nei.
       Text block header ar showcase-er majhe majhkhane boshe. Choto screen-e extra jayga nai, tai layout ager moto-i thake. */
    <section className="relative flex flex-auto flex-col pb-10 pt-10 md:pt-[clamp(1.25rem,calc(var(--h)*0.06349_-_32.70px),2.5rem)] md:pb-[clamp(2.5rem,calc(var(--h)*0.09524_-_39.05px),4.375rem)]">
      {/* Figma background stripes (decorative, shob hero-te ekoi). Content ar showcase-er pichone */}
      <HeroStripes />

      <Container className="relative flex flex-auto flex-col">
        <Header />

        <div className="mt-10 flex flex-auto flex-col items-center md:mt-[clamp(1.75rem,calc(var(--h)*0.15238_-_98.48px),4.75rem)]">
          {/* Spacer: extra faka thakle text block-er upore 5 bhag, niche 3 bhag jay, tai text ektu niche boshe. Faka na thakle height 0 */}
          <div aria-hidden="true" className="grow-[5]" />
          <p
            className="reveal max-w-full rounded-full bg-chip px-3 py-1.5 text-center text-sm leading-[1.2] text-black"
            style={reveal(150, { blur: 6 })}
          >
            Prographr — Product Design and Development Agency
          </p>

          <div className="mt-6 flex flex-col items-center gap-4 md:mt-[clamp(1rem,calc(var(--h)*0.02540_-_5.08px),1.5rem)]">
            <h1 className="max-w-[66.4rem] text-center text-[2rem] font-medium leading-[1.1] text-black sm:text-5xl lg:text-[length:clamp(2.75rem,calc(var(--h)*0.05079_+_1.84px),3.75rem)]">
              <RevealWords text={HEADING_LEAD} start={HEADING_START} step={HEADING_STEP} />{" "}
              <HeroDuo delay={HEADING_START + leadCount * HEADING_STEP} />{" "}
              <RevealWords text="Inspire." start={HEADING_START + (leadCount + 1) * HEADING_STEP} step={HEADING_STEP} />
            </h1>
            <p
              className="reveal max-w-[40.4rem] text-center text-base leading-[1.6] text-black/70"
              style={reveal(650, { duration: 800, blur: 6 })}
            >
              We design and develop intuitive digital products, stunning websites, and scalable solutions that help
              businesses innovate, connect with their audiences
            </p>
          </div>

          <div
            className="reveal mt-10 md:mt-[clamp(1.5rem,calc(var(--h)*0.05079_-_18.16px),2.5rem)] flex flex-wrap items-center justify-center gap-3"
            style={reveal(850, { blur: 6, y: 10 })}
          >
            <Button href="#contact">Let&rsquo;s start talk</Button>
            <Button href="#projects" variant="light">
              Explore work
            </Button>
          </div>
          <div aria-hidden="true" className="grow-[3]" />
        </div>
      </Container>

      {/* Boro block: blur chara, shudhu fade + niche theke uthe ashe (performance) */}
      <div className="reveal-up relative" style={reveal(1000, { duration: 900, y: 24 })}>
        <HeroShowcase />
      </div>
    </section>
  );
}