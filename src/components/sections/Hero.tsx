import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";

export function Hero() {
  return (
    <section className="pb-12 pt-10 md:pb-[3.75rem]">
      <Container>
        <Header />

        <div className="mt-10 flex flex-col items-center md:mt-[3.75rem]">
          <p className="max-w-full rounded-full bg-chip px-3 py-1.5 text-center text-sm leading-[1.2] text-black">
            Prographr — Product Design and Development Agency
          </p>

          <div className="mt-6 flex flex-col items-center gap-4">
            <h1 className="max-w-[66.4rem] text-center text-[2rem] font-medium leading-[1.1] text-black sm:text-5xl lg:text-[3.75rem]">
              Turning Bold Ideas Into Exceptional Digital Experiences{" "}
              <Image
                src="/icons/figma-webflow.svg"
                alt=""
                width={127}
                height={50}
                aria-hidden="true"
                className="mx-[0.05em] inline-block h-[0.825em] w-auto align-middle"
              />{" "}
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
    </section>
  );
}