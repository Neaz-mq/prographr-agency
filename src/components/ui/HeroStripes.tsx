/* Figma: "Frame 2147237402" (1280 x 525, left 80, top -35, z-index 0): hero-r pichone 4ta lomba rectangle (255 x 525 each),
   upor theke niche halka gray (#F9F9F9) -> shada (#FFF) gradient. x position (frame-er bhitore): 0, 337, 693, 1025.
   - Bam-dan-er duto (0, 1025): gradient pura 525px-e (0.02% -> 99.98%). Majher duto (337, 693): 61.52% e-i shada hoye jay.
   - Frame hero section-er top theke 35px upore shuru (top -35), tai upor-er 35px section-er baire/kata. Section-er niche-r ongsho (525 - 35 - hero height)
     Figma-te porer TrustedBy strip (z-index 1, bg #FAFAFA) dheke dey, tai overflow-hidden diye kete dilam.
   - Frame 1280px-e fixed + majhkhane (Container-er content width-er shathe milbe 1440px-e). Shudhu xl (1280px+) screen-e, choto screen-e rectangle gulo overlap korto.
   Shob hero-te (Home, Projects, Services, Pricing, Contact) ekoi background, tai ekhane ekbar-i rakha.
   Babohar: hero <section className="relative ..."> er bhitore, Container-er (jeta `relative` thakte hobe) AGE <HeroStripes /> boshao. */
const BG_STRIPES = [
  { left: 0, background: "linear-gradient(180.03deg, #F9F9F9 0.02%, #FFFFFF 99.98%)" },
  { left: 337, background: "linear-gradient(180.04deg, #F9F9F9 0.04%, #FFFFFF 61.52%)" },
  { left: 693, background: "linear-gradient(180.04deg, #F9F9F9 0.04%, #FFFFFF 61.52%)" },
  { left: 1025, background: "linear-gradient(180.03deg, #F9F9F9 0.02%, #FFFFFF 99.98%)" },
];

export function HeroStripes() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden overflow-hidden xl:block">
      <div className="absolute left-1/2 top-[-35px] h-[525px] w-[1280px] -translate-x-1/2">
        {BG_STRIPES.map((stripe) => (
          <div
            key={stripe.left}
            className="absolute top-0 h-[525px] w-[255px]"
            style={{ left: stripe.left, background: stripe.background }}
          />
        ))}
      </div>
    </div>
  );
}
