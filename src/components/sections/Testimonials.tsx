import { Container } from "@/components/ui/Container";
import { SparkleIcon } from "@/components/ui/icons";
import { RevealOnView } from "@/components/ui/RevealOnView";
import { RevealWords } from "@/components/ui/RevealWords";
import { reveal } from "@/lib/reveal";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";

/* Figma: "Testimonial" (1440 x 912), bg white, padding 100px 80px, gap 60px. Header center-aligned (badge + 60px heading, gap 32).
   Carousel full-width (Container-er baire), jeno duipashe card peek kore */
export function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="scroll-mt-24 overflow-x-clip bg-white py-16 md:py-[6.25rem]">
      <div className="flex flex-col gap-10 md:gap-[3.75rem]">
        <Container>
          <RevealOnView className="flex flex-col items-center gap-5 md:gap-8" threshold={0.3}>
            <p
              className="sr flex items-center gap-3 text-base font-medium leading-none text-ink"
              style={reveal(0, { blur: 6, y: 12 })}
            >
              <span className="grid size-8 place-items-center rounded-full bg-accent" aria-hidden="true">
                <SparkleIcon className="size-4 text-white" />
              </span>
              Testimonial
            </p>
            <h2
              id="testimonials-heading"
              className="max-w-[60.375rem] text-center text-[2rem] font-medium leading-[1.2] text-black sm:text-5xl lg:text-[3.75rem]"
            >
              <RevealWords
                variant="scroll"
                text="What Our Clients Say About Working With Us"
                start={120}
                step={45}
                duration={650}
                blur={8}
                y={14}
              />
            </h2>
          </RevealOnView>
        </Container>

        <RevealOnView className="w-full" threshold={0} rootMargin="0px 0px -10% 0px">
          <TestimonialCarousel />
        </RevealOnView>
      </div>
    </section>
  );
}
