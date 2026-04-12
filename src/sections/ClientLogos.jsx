import { useEffect, useRef } from "react";
import gsap from "gsap";

const logos = [
  { src: "/Be.webp",  alt: "Behance" },
  { src: "/Bk.webp",  alt: "Dribbble" },
  { src: "/Fi.webp",  alt: "Fiverr" },
  { src: "/Cir.webp", alt: "Circle" },
  { src: "/Up.webp",  alt: "Upwork" },
  { src: "/gr.svg",  alt: "Graphicriver" },
  { src: "/freepik.svg",  alt: "Freepik" },
  { src: "/st.svg",  alt: "Adobe" },
];

const LogoTrack = () => (
  <div className="flex items-center shrink-0">
    {logos.map((logo, i) => (
      <div key={i} className="shrink-0 px-10">
        <img
          src={logo.src}
          alt={logo.alt}
          className="lg:h-8 md:h-7 h-6 3xl:h-8 2xl:h-6 w-auto object-contain opacity-60 hover:opacity-90 transition-opacity duration-200 grayscale"
        />
      </div>
    ))}
  </div>
);

export default function ClientLogos() {
  const trackRef = useRef(null);
  const tickerFnRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let xPos = 0;
    let trackWidth = 0;

    const startTicker = () => {
      // Measure ONE LogoTrack's width
      trackWidth = track.children[0].offsetWidth;

      if (tickerFnRef.current) gsap.ticker.remove(tickerFnRef.current);

      tickerFnRef.current = () => {
        xPos -= 0.6;
        // Reset after exactly one full track width — 4 copies means no gap ever
        if (xPos <= -trackWidth) xPos += trackWidth;
        gsap.set(track, { x: xPos });
      };

      gsap.ticker.add(tickerFnRef.current);
    };

    const imgs = Array.from(track.querySelectorAll("img"));
    const loadPromises = imgs.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise((res) => {
            img.onload = res;
            img.onerror = res;
          })
    );

    Promise.all(loadPromises).then(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(startTicker);
      });
    });

    return () => {
      if (tickerFnRef.current) gsap.ticker.remove(tickerFnRef.current);
    };
  }, []);

  return (
    <section className="bg-white lg:pb-20 3xl:pt-36 3xl:pb-36 2xl:pt-28 xl:pt-28 lg:pt-28 md:pb-14 md:pt-16 sm:pb-12 sm:pt-20 pb-12 pt-10">
      <div className="md:px-10 3xl:px-[26rem] 2xl:px-[10rem] xl:px-20 lg:px-14 mx-auto px-6">
        <div
          className="relative overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          {/* 4 copies — always enough to fill any viewport without gaps */}
          <div ref={trackRef} className="flex will-change-transform">
            <LogoTrack />
            <LogoTrack />
            <LogoTrack />
            <LogoTrack />
          </div>
        </div>
      </div>
    </section>
  );
}