import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { HeroShowcase } from "./HeroShowcase";
import { HeroDuo } from "./HeroDuo";

export function Hero() {
  return (
    <section className="pb-10 pt-5 md:pb-[4.375rem] md:pt-6">
      <Container>
        <Header />

        <div className="mt-10 flex flex-col items-center md:mt-[3.75rem]">
          <p className="max-w-full rounded-full bg-chip px-3 py-1.5 text-center text-sm leading-[1.2] text-black">
            Prographr — Product Design and Development Agency
          </p>

          <div className="mt-6 flex flex-col items-center gap-4">
            <h1 className="max-w-[66.4rem] text-center text-[2rem] font-medium leading-[1.1] text-black sm:text-5xl lg:text-[3.75rem]">
              Turning Bold Ideas Into Exceptional Digital Experiences{" "}
              <HeroDuo />{" "}
              Inspire.
            </h1>
            <p className="max-w-[40.4rem] text-center text-base leading-[1.6] text-black/70">
              We design and develop intuitive digital products, stunning websites, and scalable solutions that help
              businesses innovate, connect with their audiences
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="#contact">Let&rsquo;s start talk</Button>
            <Button href="#projects" variant="light">
              Explore work
            </Button>
          </div>
        </div>
      </Container>

      <HeroShowcase />
    </section>
  );
}