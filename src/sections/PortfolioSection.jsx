import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dzi3u164c/image/upload/v1777186805/Presentation-15_jnk5hi.webp",
    tags: ["Flyer Design", "Rack Card", "App UI Design"],
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dzi3u164c/image/upload/v1777185668/Restaurant_Web_mtcii7.webp",
    tags: ["UI UX Design", "Web Design", "Prototyping"],
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dzi3u164c/image/upload/v1777187897/web_ox490e.webp",
    tags: ["React JS", "Next JS", "MERN"],
  },
  {
    id: 4,
    image: "https://res.cloudinary.com/dzi3u164c/image/upload/v1777187448/Branding_cxgpvp.webp",
    tags: ["Brand Identity", "Brand Book", "Brand Manual"],
  },
  {
    id: 5,
    image: "https://res.cloudinary.com/dzi3u164c/image/upload/v1777187054/Presentation-16_clipec.webp",
    tags: ["Product Label", "Label Design", "Bottle Label"],
  },
];

// Duplicate once — CSS marquee only needs 2× to loop seamlessly
const SLIDES = [...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS];

function useDesktopSizes() {
  const getSizes = () => {
    if (typeof window === "undefined") {
      return { imgHeight: "clamp(500px, 42vw, 660px)", slideWidth: "clamp(660px, 45vw, 1200px)" };
    }
    const w = window.innerWidth;
    if (w >= 1920) return { imgHeight: "clamp(600px, 42vw, 650px)", slideWidth: "clamp(700px, 40vw, 1000px)" };
    if (w >= 1536) return { imgHeight: "clamp(370px, 37vw, 430px)", slideWidth: "clamp(450px, 38vw, 1000px)" };
    if (w >= 1280) return { imgHeight: "clamp(200px, 36vw, 320px)", slideWidth: "clamp(400px, 36vw, 800px)" };
    return           { imgHeight: "clamp(320px, 36vw, 420px)", slideWidth: "clamp(380px, 38vw, 660px)" };
  };

  const [sizes, setSizes] = useState(getSizes);

  useEffect(() => {
    const onResize = () => setSizes(getSizes());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return sizes;
}

function PortfolioCard({ item, imgHeight }) {
  return (
    <div className="h-full flex flex-col group">
      <div className="relative overflow-hidden shrink-0" style={{ height: imgHeight }}>
        <img
          src={item.image}
          alt={item.tags[0]}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
        />
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-100 group-hover:opacity-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.75) 100%)",
          }}
        />
        <div className="absolute bottom-4 left-4 right-0 px-4 py-4 flex items-center gap-3 flex-wrap transition-opacity duration-500 opacity-100 group-hover:opacity-0 pointer-events-none">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] 3xl:text-[18px] text-black border border-white/40 font-semibold bg-white backdrop-blur-[2px] px-2.5 py-[5px] 3xl:px-8 3xl:py-3 whitespace-nowrap leading-none"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Marquee strip ───────────────────────────────────────────────────────────
// `translateX(-50%)` moves exactly one full copy of PORTFOLIO_ITEMS,
// so the loop is invisible — no JS recalculation ever fires.
const MARQUEE_CSS = `
  @keyframes portfolio-marquee {
    from { transform: translate3d(0, 0, 0); }
    to   { transform: translate3d(-50%, 0, 0); }
  }

  .portfolio-track {
    display: flex;
    width: max-content;
    will-change: transform;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    animation: portfolio-marquee var(--marquee-duration) linear infinite;
  }

  /* pause on hover — works whether the cursor is on the track or any card */
  .portfolio-marquee-outer:hover .portfolio-track {
    animation-play-state: paused;
  }
`;

function MarqueeStrip({ slideWidth, imgHeight, duration }) {
  return (
    <div
      className="portfolio-marquee-outer overflow-hidden"
      /* gap is baked into padding-right on each slide so CSS can measure it */
    >
      <div
        className="portfolio-track"
        style={{ "--marquee-duration": `${duration}ms` }}
      >
        {SLIDES.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            style={{
              width: slideWidth,
              flexShrink: 0,
              paddingRight: "24px",
              boxSizing: "border-box",
            }}
          >
            <PortfolioCard item={item} imgHeight={imgHeight} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main section ────────────────────────────────────────────────────────────
export default function PortfolioSection() {
  const headingRef = useRef(null);
  const containerRef = useRef(null);

  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!headingRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: "110%", skewY: 7, opacity: 0 },
        {
          y: "0%",
          skewY: 0,
          opacity: 1,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [isDesktop]);

  const { imgHeight, slideWidth } = useDesktopSizes();

  // ── MOBILE ────────────────────────────────────────────────────────────
  if (!isDesktop) {
    const mobileSlideWidth =
      typeof window !== "undefined" && window.innerWidth >= 768
        ? "clamp(340px, 52vw, 520px)"
        : "clamp(160px, 72vw, 360px)";

    const mobileImgHeight =
      typeof window !== "undefined" && window.innerWidth >= 768
        ? "clamp(280px, 42vw, 420px)"
        : "clamp(120px, 72vw, 220px)";

    return (
      <section
        id="portfolio"
        ref={containerRef}
        className="bg-white w-full overflow-hidden mb-12 md:mt-8 sm:mt-4 mt-2"
      >
        <style>{MARQUEE_CSS}</style>

        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="pt-10 pb-6 border-b border-[#efefef] overflow-hidden">
            <h2
              ref={headingRef}
              className="text-[clamp(28px,10vw,40px)] font-extrabold leading-[1.15] text-[#0a0a0a] tracking-[-0.5px]"
            >
              Our Recent
              <br />
              Work
            </h2>
          </div>
        </div>

        <MarqueeStrip
          slideWidth={mobileSlideWidth}
          imgHeight={mobileImgHeight}
          duration={18000}
        />
      </section>
    );
  }

  // ── DESKTOP ───────────────────────────────────────────────────────────
  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="bg-white w-full overflow-hidden 3xl:mb-52 2xl:mb-52 xl:mb-36 lg:mb-32 3xl:mt-10 2xl:mt-0 xl:mt-28 lg:mt-28"
    >
      <style>{MARQUEE_CSS}</style>

      <div className="border-b border-[#efefef] pb-12 px-3 md:px-10 3xl:px-[26rem] 2xl:px-[10rem] xl:px-[5rem] lg:px-[4rem] overflow-hidden">
        <h2
          ref={headingRef}
          className="3xl:text-[clamp(52px,10vw,90px)] 2xl:text-[clamp(52px,10vw,80px)] xl:text-[clamp(45px,3.8vw,58px)] lg:text-[clamp(40px,3.8vw,58px)] md:text-[clamp(36px,3.8vw,58px)] font-semibold leading-[1.1] text-[#182F33] tracking-[0.02em]"
        >
          Our Recent
          <br />
          Work
        </h2>
      </div>

      <MarqueeStrip
        slideWidth={slideWidth}
        imgHeight={imgHeight}
        duration={26000}
      />
    </section>
  );
}