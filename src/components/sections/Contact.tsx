import { Container } from "@/components/ui/Container";
import { RevealOnView } from "@/components/ui/RevealOnView";
import { RevealWords } from "@/components/ui/RevealWords";
import { reveal } from "@/lib/reveal";
import { BookingSection } from "@/components/sections/BookingSection";

/* Figma: "Frame 2147237397" (1440 x 1030), bg white, padding 100px 80px, gap 60px.
   Title 60px center -> booking panel (1280 x 603, #171717) -> banner pill (1280 x 71, #F0F0F0). Nav-er "Let's talk" / "Book a call" ei id-te ashe */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 bg-white py-16 md:py-[6.25rem]">
      <Container className="flex flex-col gap-10 md:gap-[3.75rem]">
        <RevealOnView threshold={0.3}>
          <h2
            id="contact-heading"
            className="text-center text-[2rem] font-medium leading-[1.2] text-black sm:text-5xl lg:text-[3.75rem] lg:leading-[4.75rem]"
          >
            <RevealWords variant="scroll" text="Let’s Talk About Your Project" start={0} step={45} duration={650} blur={8} y={14} />
          </h2>
        </RevealOnView>

        <RevealOnView className="flex flex-col gap-5" threshold={0} rootMargin="0px 0px -10% 0px">
          <div className="sr-up" style={reveal(0, { duration: 900, y: 40 })}>
            <BookingSection />
          </div>

          {/* Banner pill */}
          <p
            className="sr-up rounded-[1.75rem] bg-[#F0F0F0] px-5 py-4 text-center text-base capitalize leading-normal tracking-[0.02em] text-black md:rounded-full md:px-4 md:py-[1.0625rem] min-[1400px]:whitespace-nowrap min-[1400px]:[word-spacing:-0.1em] md:text-[1.5rem] md:leading-9"
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
