import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SparkleIcon } from "@/components/ui/icons";
import { RevealOnView } from "@/components/ui/RevealOnView";
import { RevealWords } from "@/components/ui/RevealWords";
import { features } from "@/lib/features";
import { reveal } from "@/lib/reveal";

/* Figma: "Desktop - 2019" (1440 x 984), bg #FAFAFA, padding 100px 80px, gap 60px. 1rem = 16px @1440
   Card: 410.67 x 254, bg white, radius 20px, padding 32 32 32 24, gap 31px, grid gap 24px */
export function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-us-heading"
      className="scroll-mt-24 bg-[#FAFAFA] py-16 md:py-[6.25rem]"
    >
      <Container className="flex flex-col items-center gap-10 md:gap-[3.75rem]">
        {/* Header: Projects-er moto, scroll-e viewport-e ashle badge -> heading (word by word) stagger kore ashe */}
        <RevealOnView
          className="flex flex-col items-center gap-4"
          threshold={0.3}
        >
          <p
            className="sr flex items-center gap-3 text-base font-medium leading-none text-ink"
            style={reveal(0, { blur: 6, y: 12 })}
          >
            <span
              className="grid size-8 place-items-center rounded-full bg-accent"
              aria-hidden="true"
            >
              <SparkleIcon className="size-4 text-white" />
            </span>
            Why Choose Us
          </p>
          <h2
            id="why-choose-us-heading"
            className="max-w-[60.375rem] text-center text-[2rem] font-medium leading-[1.2] text-black sm:text-5xl lg:text-[3.75rem]"
          >
            <RevealWords
              variant="scroll"
              text="Building Digital Experiences That Shape the Future"
              start={120}
              step={45}
              duration={650}
              blur={8}
              y={14}
            />
          </h2>
        </RevealOnView>

        {/* 3 x 2 grid (Figma: gap 24px). Mobile-e compact: choto padding/icon/gap, md+ e Figma-r size */}
        {/* Card gulo grid viewport-e dhukle ek-ek kore niche theke fade + rise kore ashe (`sr-up`, stagger) */}
        <RevealOnView
          className="w-full"
          threshold={0}
          rootMargin="0px 0px -10% 0px"
        >
          <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {features.map(
              ({ title, description, icon: Icon, iconSrc }, index) => (
                <li
                  key={title}
                  className="sr-up flex"
                  style={reveal(index * 90, { duration: 900, y: 40 })}
                >
                  <article className="flex w-full flex-col gap-5 rounded-2xl bg-white p-5 md:gap-[1.9375rem] md:rounded-[1.25rem] md:py-8 md:pl-6 md:pr-8">
                    {/* Icon box: 64 x 64, bg #FAFAFA, radius 12px, padding 10px, icon 30px */}
                    <span
                      className="grid size-14 shrink-0 place-items-center rounded-xl bg-[#FAFAFA] p-2 text-accent md:size-16 md:p-2.5"
                      aria-hidden="true"
                    >
                      {iconSrc ? (
                        <Image
                          src={iconSrc}
                          alt=""
                          width={30}
                          height={30}
                          className="size-6 md:size-[1.875rem]"
                        />
                      ) : (
                        Icon && <Icon className="size-6 md:size-[1.875rem]" />
                      )}
                    </span>

                    <div className="flex flex-col gap-1.5 md:gap-2">
                      <h3 className="text-xl font-medium leading-[1.4] text-ink md:leading-[1.5833] lg:text-2xl">
                        {title}
                      </h3>
                      <p className="text-base leading-normal text-ink/70">
                        {description}
                      </p>
                    </div>
                  </article>
                </li>
              ),
            )}
          </ul>
        </RevealOnView>
      </Container>
    </section>
  );
}
