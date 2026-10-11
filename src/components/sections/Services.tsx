import { Container } from "@/components/ui/Container";
import { SparkleIcon } from "@/components/ui/icons";
import { defaultOpenServiceId, services } from "@/lib/services";
import { ServicesAccordion } from "./ServicesAccordion";

/* Figma: "Desktop - 2015" (1440 x 1611), bg #FFFFFF, padding 100px 80px, gap 60px */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-24 bg-white py-16 md:py-[6.25rem]">
      <Container className="flex flex-col gap-10 md:gap-[3.75rem]">
        <div className="flex flex-col items-start gap-4">
          <p className="flex items-center gap-3 text-base font-medium leading-none text-ink">
            <span className="grid size-8 place-items-center rounded-full bg-accent" aria-hidden="true">
              <SparkleIcon className="size-4 text-white" />
            </span>
            Our Services
          </p>
          <h2
            id="services-heading"
            className="max-w-[60.375rem] text-[2rem] font-medium leading-[1.2] text-black sm:text-5xl lg:text-[3.75rem]"
          >
            We Create Experiences That Connect With Audiences
          </h2>
        </div>

        <ServicesAccordion services={services} defaultOpenId={defaultOpenServiceId} />
      </Container>
    </section>
  );
}