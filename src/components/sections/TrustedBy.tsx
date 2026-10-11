import Image from "next/image";

/* Figma: "Frame 2147227351" (1440 x 112.47). 1rem = 16px @1440, tai px / 16 = rem */

/* White panel-er slanted edge (Figma: Vector 7818 + Vector 7855). viewBox = panel size 559.12 x 112.47 */
const PANEL_PATH = "M0 0H559.12C545 0 533 9 526 24L514 52C504 76 493 92 480 102C473 107 468 112.47 458 112.47H0Z";

/* Logo gula public/logos/ e ache. Figma theke SVG export kore same naam-e replace korle pixel-perfect hobe */
const logos = [
  { src: "/logos/google-pay.svg", alt: "Google Pay", width: 76, height: 30, widthClass: "w-[4.73rem]" },
  { src: "/logos/aws.svg", alt: "Amazon Web Services", width: 43, height: 30, widthClass: "w-[2.7rem]" },
  { src: "/logos/blockbank.svg", alt: "BlockBank", width: 153, height: 30, widthClass: "w-[9.55rem]" },
  { src: "/logos/contentful.svg", alt: "Contentful", width: 151, height: 29, widthClass: "w-[9.46rem]" },
];

export function TrustedBy() {
  return (
    <section aria-label="Companies we collaborate with" className="bg-[#FAFAFA]">
      {/* Mobile/tablet: stacked. xl (1280px+): Figma-r row layout, height 112.47px */}
      <div className="mx-auto flex max-w-[90rem] flex-col xl:h-[7.0294rem] xl:flex-row xl:items-center xl:gap-[4.1231rem]">
        {/* Left: white panel + text */}
        <div className="relative flex h-24 items-center justify-center rounded-b-[1.5rem] bg-white px-4 xl:h-full xl:w-[34.945rem] xl:shrink-0 xl:rounded-none xl:bg-transparent xl:px-0">
          <svg
            viewBox="0 0 559.12 112.47"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-0 hidden size-full xl:block"
          >
            <path d={PANEL_PATH} fill="#FFFFFF" />
          </svg>
          {/* 1440px-er baire bam dike shada ongsho barhiye screen-er edge porjonto niye jay */}
          <span aria-hidden="true" className="absolute right-full top-0 hidden h-full w-screen bg-white xl:block" />

          <p className="relative text-center text-xl font-medium leading-[1.2] text-ink sm:text-2xl xl:-translate-x-[0.6rem] xl:-translate-y-[0.36rem] xl:whitespace-nowrap xl:text-[1.5rem]">
            We collaborate with <span className="text-accent">300+</span> company
          </p>
        </div>

        {/* Right: logos */}
        <ul className="flex flex-1 flex-wrap items-center justify-center gap-x-10 gap-y-6 px-4 py-8 sm:px-8 xl:flex-nowrap xl:justify-between xl:gap-0 xl:py-0 xl:pl-0 xl:pr-20">
          {logos.map((logo) => (
            <li key={logo.src} className="flex shrink-0 items-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className={`h-auto ${logo.widthClass}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}