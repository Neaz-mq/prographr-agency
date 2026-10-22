import Image from "next/image";

/* Figma: "Frame 2147227351" (1440 x 112.47). 1rem = 16px @1440, tai px / 16 = rem */

/* White panel-er slanted edge (Figma: Vector 7818 + Vector 7855). viewBox = panel size 559.12 x 112.47 */
const PANEL_PATH = "M0 0H559.12C545 0 533 9 526 24L514 52C504 76 493 92 480 102C473 107 468 112.47 458 112.47H0Z";

/* Logo gula public/logos/ e ache. Notun brand logo (Cuisine, Filamento, Lock & Load It, Storied Data Inc, WR-01) ekhane.
   Fail-er naame space ar "&" ache (Lock & Load It.svg), tai path encodeURIComponent diye banano, noile URL bhenge jay.
   Pore naam shohoj korte chaile (jemon lock-and-load-it.svg) public/logos/-e rename kore ekhane file naam-ta bodle dilei hobe.
   Image-er size: height fixed (ekhon 40-48px, ager 30px chhilo choto lagto), width auto, tai SVG-r nijer ratio thake, kono logo thele/chepte jay na.
   Kono logo onno-gulo-r cheye boro/choto dekhale shudhu oi logo-r `h` (px) bodlao. */
const logoSrc = (file: string) => `/logos/${encodeURIComponent(file)}`;

const logos = [
  { file: "Cuisine.svg", alt: "Cuisine", h: 40 },
  { file: "Filamento.svg", alt: "Filamento", h: 40 },
  { file: "Lock & Load It.svg", alt: "Lock & Load It", h: 44 },
  { file: "Storied Data Inc.svg", alt: "Storied Data Inc", h: 48 },
  { file: "WR-01.svg", alt: "WR-01", h: 48 },
];

/* Marquee: logo-set ek-i jinis kotobar repeat kora. Track -50% porjonto jay, tai seamless hote half >= region-er width lagbe.
   Ek set kom-pokkhe ~700px+ hole 6 set (half = 3 set) region-er (boro screen-e ~1800px) cheye boro thake; set choto hole SET_COUNT barhao. */
const SET_COUNT = 6;
const MARQUEE_SECONDS = 50; // boro = dhire. Hero marquee-r speed-er kachakachi (~50px/s)

function LogoSet({ hidden = false }: { hidden?: boolean }) {
  return (
    /* gap == pr, tai set-er shesh ar porer set-er shuru-r majhe gap ekoi thake (seamless) */
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10 xl:gap-[6.5rem] xl:pr-[6.5rem]">
      {logos.map((logo) => (
        <li key={logo.file} className="flex shrink-0 items-center">
          <Image
            src={logoSrc(logo.file)}
            alt={hidden ? "" : logo.alt}
            width={0}
            height={0}
            unoptimized
            style={{ height: `${logo.h / 16}rem`, width: "auto" }}
            className="block max-w-none"
          />
        </li>
      ))}
    </ul>
  );
}

export function TrustedBy() {
  return (
    <section id="trusted-by" aria-label="Companies we collaborate with" className="scroll-mt-20 bg-[#FAFAFA]">
      {/* Mobile/tablet: stacked. xl (1280px+): Figma-r row layout, height 112.47px */}
      <div className="mx-auto flex max-w-[90rem] flex-col xl:h-[clamp(5.5rem,calc(var(--h)*0.07768_+_23.52px),7.029rem)] xl:flex-row xl:items-center xl:gap-[4.1231rem]">
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