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

/* Marquee: logo-set ek-i jinis kotobar repeat kora. Track -50% porjonto jay, tai seamless hote half >= region-er width lagbe.
   Ek set ~840px, region boro screen-e ~1800px porjonto hoy, tai 6 set (half = 3 set ~ 2500px) rakhi. */
const SET_COUNT = 6;
const MARQUEE_SECONDS = 50; // boro = dhire. Hero marquee-r speed-er kachakachi (~50px/s)

function LogoSet({ hidden = false }: { hidden?: boolean }) {
  return (
    /* gap == pr, tai set-er shesh ar porer set-er shuru-r majhe gap ekoi thake (seamless) */
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10 xl:gap-[6.5rem] xl:pr-[6.5rem]">
      {logos.map((logo) => (
        <li key={logo.src} className="flex shrink-0 items-center">
          <Image
            src={logo.src}
            alt={hidden ? "" : logo.alt}
            width={logo.width}
            height={logo.height}
            className={`h-auto ${logo.widthClass}`}
          />
        </li>
      ))}
    </ul>
  );
}

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

        {/* Right: logo marquee (right -> left). xl-e screen-er daan edge porjonto full-bleed, dui pashe soft fade.
            Hover-e pause (.marquee:hover), reduced-motion-e ruke jay (globals.css) */}
        <div suppressHydrationWarning className="marquee fade-edges min-w-0 overflow-hidden py-8 xl:mr-[calc((100%-100vw)/2)] xl:flex-1 xl:py-0">
          <div className="marquee-track flex w-max" style={{ animationDuration: `${MARQUEE_SECONDS}s` }}>
            {Array.from({ length: SET_COUNT }, (_, i) => (
              <LogoSet key={i} hidden={i > 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}