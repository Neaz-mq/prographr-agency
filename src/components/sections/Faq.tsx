import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SparkleIcon } from "@/components/ui/icons";
import { RevealOnView } from "@/components/ui/RevealOnView";
import { RevealWords } from "@/components/ui/RevealWords";
import { defaultOpenFaqId, faqs } from "@/lib/faqs";
import { reveal } from "@/lib/reveal";
import { FaqAccordion } from "./FaqAccordion";

/* Figma: "Frame 2147237246" (1440 x 752), bg #FAFAFA, padding 100px 80px.
   Content 1280px: left column 492px, gap 68px, right column 720px (flex-grow).
   Left: badge → (gap 16) heading 60px/120% → (gap 36) button. Left column desktop-e sticky (answer lomba hole heading thake). */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24 bg-[#FAFAFA] py-16 md:py-[6.25rem]">
      <Container className="flex flex-col gap-10 lg:flex-row lg:gap-[4.25rem]">
        {/* Left: scroll-e viewport-e ashle badge -> heading (word by word) -> button stagger kore ashe */}
        <RevealOnView className="lg:sticky lg:top-28 lg:w-[30.75rem] lg:shrink-0 lg:self-start" threshold={0.3}>
          <div className="flex flex-col items-start gap-6 md:gap-9">
            <div className="flex flex-col items-start gap-4">
              <p
                className="sr flex items-center gap-3 text-base font-medium leading-none text-ink"
                style={reveal(0, { blur: 6, y: 12 })}
              >
                <span className="grid size-8 place-items-center rounded-full bg-accent" aria-hidden="true">
                  <SparkleIcon className="size-4 text-white" />
                </span>
                FAQ&rsquo;S
              </p>
              {/* Figma copy hubohu ("We’ve Get Answer"), grammar-e "We’ve Got Answers" hobar kotha.
                  Figma-te heading box 497px (sobcheye lomba line "We’ve Get Answer"), left column 492px. Column-er cheye ektu boro,
                  tai lg-te explicit width (32rem) lage, noile column-er width-e (492px) wrap hoye "Answer" 3rd line-e jay.
                  "Got Questions? We’ve" ekline-e dhore na (~620px), tai "Questions?"-er por-i 2nd line-e jay. Gap 68px, tai right column-er upor pore na. */}
              <h2
                id="faq-heading"
                className="text-[2rem] font-medium leading-[1.2] text-black sm:text-5xl lg:w-[32rem] lg:text-[3.75rem]"
              >
                <RevealWords
                  variant="scroll"
                  text="Got Questions? We’ve Get Answer"
                  start={120}
                  step={45}
                  duration={650}
                  blur={8}
                  y={14}
                />
              </h2>
            </div>

            <div className="sr" style={reveal(480, { blur: 6, y: 12 })}>
              <Button href="#contact">Let&rsquo;s start talk</Button>
            </div>
          </div>
        </RevealOnView>

        {/* Right: accordion row gulo viewport-e dhukle ek-ek kore niche theke fade + rise kore ashe (FaqAccordion-e `sr-up`) */}
        <RevealOnView className="w-full min-w-0 lg:flex-1" threshold={0} rootMargin="0px 0px -10% 0px">
          <FaqAccordion faqs={faqs} defaultOpenId={defaultOpenFaqId} />
        </RevealOnView>
      </Container>
    </section>
  );
}