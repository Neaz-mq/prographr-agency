const logos = [
  { src: "/Be.webp",  alt: "Behance" },
  { src: "/Bk.webp",  alt: "Dribbble" },
  { src: "/Fi.webp",  alt: "Fiverr" },
  { src: "/Fa.webp",  alt: "Falcon" },
  { src: "/Cir.webp", alt: "Circle" },
  { src: "/Up.webp",  alt: "Upwork" },
  { src: "/We.webp",  alt: "Webflow" },
  { src: "/Wr.webp",  alt: "WWR" },
  { src: "/Ww.webp",  alt: "WW" },
];

const LogoTrack = () => (
  <div className="flex items-center shrink-0 animate-marquee">
    {logos.map((logo, i) => (
      <div key={i} className="shrink-0 px-10">
        <img
          src={logo.src}
          alt={logo.alt}
          className="lg:h-8 md:h-7 h-6  w-auto object-contain opacity-60 hover:opacity-90 transition-opacity duration-200 grayscale"
        />
      </div>
    ))}
  </div>
);

export default function ClientLogos() {
  return (
    <section className="bg-white lg:pb-20 3xl:pt-36 2xl:pt-28 xl:pt-28 lg:pt-28 md:pb-14 md:pt-16 sm:pb-12 sm:pt-20 pb-12 pt-10">
      <div className="md:px-10 3xl:px-60 2xl:px-60 xl:px-20 lg:px-14 mx-auto px-6">
        <div
          className="relative overflow-hidden flex"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          {/* Two identical tracks — second starts immediately after first */}
          <LogoTrack />
          <LogoTrack />
        </div>
      </div>
    </section>
  );
}