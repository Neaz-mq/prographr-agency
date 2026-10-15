import { Container } from "@/components/ui/Container";
import { SparkleIcon } from "@/components/ui/icons";
import { RevealOnView } from "@/components/ui/RevealOnView";
import { RevealWords } from "@/components/ui/RevealWords";
import { reveal } from "@/lib/reveal";
import { defaultOpenServiceId, services } from "@/lib/services";
import { ServicesAccordion } from "./ServicesAccordion";

/* Figma: "Desktop - 2015" (1440 x 1611), bg #FFFFFF, padding 100px 80px, gap 60px */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-24 bg-white py-16 md:py-[6.25rem]">
      <Container className="flex flex-col gap-10 md:gap-[3.75rem]">
        {/* Header: Projects-er moto, scroll-e viewport-e ashle badge -> heading (word by word) stagger kore ashe */}
        <RevealOnView className="flex flex-col items-start gap-4" threshold={0.3}>
          <p
            className="sr flex items-center gap-3 text-base font-medium leading-none text-ink"
            style={reveal(0, { blur: 6, y: 12 })}
          >
            <span className="grid size-8 place-items-center rounded-full bg-accent" aria-hidden="true">
              <SparkleIcon className="size-4 text-white" />
            </span>
            Our Services
          </p>
          <h2
            id="services-heading"
            className="max-w-[60.375rem] text-[2rem] font-medium leading-[1.2] text-black sm:text-5xl lg:text-[3.75rem]"
          >
            <RevealWords
              variant="scroll"
              text="We Create Experiences That Connect With Audiences"
              start={120}
              step={45}
              duration={650}
              blur={8}
              y={14}
            />
          </h2>
        </RevealOnView>

        {/* Accordion row gulo: list-ta viewport-e dhukle ek-ek kore niche theke fade + rise kore ashe (ServicesAccordion-e `sr-up`) */}
        <RevealOnView className="w-full" threshold={0} rootMargin="0px 0px -10% 0px">
          <ServicesAccordion services={services} defaultOpenId={defaultOpenServiceId} />
        </RevealOnView>
      </Container>
    </section>
  );
}