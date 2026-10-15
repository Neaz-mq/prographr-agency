import { Container } from "@/components/ui/Container";
import { SparkleIcon } from "@/components/ui/icons";
import { RevealOnView } from "@/components/ui/RevealOnView";
import { RevealWords } from "@/components/ui/RevealWords";
import { reveal } from "@/lib/reveal";
import { TeamCarousel } from "@/components/sections/TeamCarousel";

/* Figma: "Desktop - 2017" (1440 x 850), bg white, padding 100px 80px, gap 60px */
export function Team() {
  return (
    <section id="team" aria-labelledby="team-heading" className="scroll-mt-24 bg-white py-16 md:py-[6.25rem]">
      <Container className="flex flex-col gap-10 md:gap-[3.75rem]">
        {/* Header: left-aligned. Projects-er moto, scroll-e viewport-e ashle badge -> heading (word by word) stagger kore ashe */}
        <RevealOnView className="flex flex-col items-start gap-4" threshold={0.3}>
          <p
            className="sr flex items-center gap-3 text-base font-medium leading-none text-ink"
            style={reveal(0, { blur: 6, y: 12 })}
          >
            <span className="grid size-8 place-items-center rounded-full bg-accent" aria-hidden="true">
              <SparkleIcon className="size-4 text-white" />
            </span>
            Our Team Member
          </p>
          <h2
            id="team-heading"
            className="max-w-[59.1875rem] text-[2rem] font-medium leading-[1.2] text-black sm:text-5xl lg:text-[3.75rem]"
          >
            <RevealWords
              variant="scroll"
              text="Meet the People Behind The Prographr Turning Ideas"
              start={120}
              step={45}
              duration={650}
              blur={8}
              y={14}
            />
          </h2>
        </RevealOnView>

        {/* Card + controls: carousel viewport-e dhukle card gulo ek-ek kore niche theke fade + rise kore ashe (TeamCarousel-e `sr-up`) */}
        <RevealOnView className="w-full" threshold={0} rootMargin="0px 0px -10% 0px">
          <TeamCarousel />
        </RevealOnView>
      </Container>
    </section>
  );
}