import { Container } from "@/components/ui/Container";
import { SparkleIcon } from "@/components/ui/icons";
import { TeamCarousel } from "@/components/sections/TeamCarousel";

/* Figma: "Desktop - 2017" (1440 x 850), bg white, padding 100px 80px, gap 60px */
export function Team() {
  return (
    <section id="team" aria-labelledby="team-heading" className="scroll-mt-24 bg-white py-16 md:py-[6.25rem]">
      <Container className="flex flex-col gap-10 md:gap-[3.75rem]">
        {/* Header: left-aligned, badge + heading, gap 16px */}
        <div className="flex flex-col items-start gap-4">
          <p className="flex items-center gap-3 text-base font-medium leading-none text-ink">
            <span className="grid size-8 place-items-center rounded-full bg-accent" aria-hidden="true">
              <SparkleIcon className="size-4 text-white" />
            </span>
            Our Team Member
          </p>
          <h2
            id="team-heading"
            className="max-w-[59.1875rem] text-[2rem] font-medium leading-[1.2] text-black sm:text-5xl lg:text-[3.75rem]"
          >
            Meet the People Behind The Prographr Turning Ideas
          </h2>
        </div>

        <TeamCarousel />
      </Container>
    </section>
  );
}