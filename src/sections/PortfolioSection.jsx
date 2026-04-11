import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775119897/1_dc1bes.webp",
    tags: ["Flyer Design", "Rack Card", "App UI Design"],
    dark: true,
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775120064/2_vtojsw.webp",
    tags: ["UI UX Design", "Web Design", "Prototyping"],
    dark: false,
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775120173/3_vykw9g.webp",
    tags: ["React JS", "Next JS", "MERN"],
    dark: true,
  },
  {
    id: 4,
    image: "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775120276/4_v4puxw.webp",
    tags: ["Brand Identity", "Brand Book", "Brand Manual"],
    dark: true,
  },
  {
    id: 5,
    image: "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775120377/5_go4zm2.webp",
    tags: ["Product Label", "Label Design", "Bottle Label"],
    dark: true,
  },
];

const SLIDES = [...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS];

function useDesktopSizes() {
  const getSizes = () => {
    if (typeof window === "undefined") {
      return { imgHeight: "clamp(500px, 42vw, 660px)", slideWidth: "clamp(660px, 45vw, 1200px)" };
    }
    const w = window.innerWidth;
    if (w >= 1920) return { imgHeight: "clamp(500px, 42vw, 660px)",  slideWidth: "clamp(660px, 45vw, 1200px)" };
    if (w >= 1536) return { imgHeight: "clamp(300px, 37vw, 360px)",  slideWidth: "clamp(450px, 38vw, 1000px)"  };
    if (w >= 1280) return { imgHeight: "clamp(200px, 36vw, 320px)",  slideWidth: "clamp(400px, 36vw, 800px)"  };
    return              { imgHeight: "clamp(200px, 36vw, 300px)",  slideWidth: "clamp(340px, 38vw, 760px)"  };
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
    <div className="h-full flex flex-col">
      <div
        className="relative overflow-hidden shrink-0"
        style={{ height: imgHeight }}
      >
        <img
          src={item.image}
          alt={item.tags[0]}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]"
          loading="lazy"
        />
        {item.dark ? (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.78) 100%)",
            }}
          />
        ) : (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "rgba(0,0,0,0.06)" }}
          />
        )}
      </div>

      <div className="flex items-center gap-2 pl-0 pr-4 py-3 border-t border-[#efefef] flex-wrap bg-white">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] text-black border border-[#ddd] font-bold bg-[#F2F2F2] px-2.5 py-[5px] whitespace-nowrap leading-none"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { imgHeight, slideWidth } = useDesktopSizes();

  const swiperProps = {
    modules: [Autoplay, FreeMode],
    slidesPerView: "auto",
    spaceBetween: 24,
    freeMode: { enabled: true, momentum: false },
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    loop: true,
    style: { margin: 0 },
  };

  // ── MOBILE ──────────────────────────────────────────────────────────
  if (!isDesktop) {
    return (
      <section id="portfolio" className="bg-white w-full overflow-hidden mb-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="pt-10 pb-6 border-b border-[#efefef]">
            <h2 className="text-[clamp(28px,10vw,40px)] font-extrabold leading-[1.15] text-[#0a0a0a] tracking-[-0.5px]">
              Our Previous
              <br />
              Work
            </h2>
          </div>
        </div>

        <Swiper {...swiperProps} speed={3500}>
          {SLIDES.map((item, i) => (
            <SwiperSlide
              key={`m-${item.id}-${i}`}
              style={{ width: "clamp(160px, 72vw, 360px)" }}
            >
              <PortfolioCard item={item} imgHeight="clamp(120px, 72vw, 220px)" />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
  }

  // ── DESKTOP ──────────────────────────────────────────────────────────
  return (
    <section id="portfolio" className="bg-white w-full overflow-hidden mb-24 3xl:-mt-2 2xl:mt-14 xl:mt-2 lg:mt-10">
      {/* ✅ FIX: replaced LEFT_INDENT style with matching Tailwind px classes */}
      <div className="border-b border-[#efefef] pb-12 px-3 md:px-10 3xl:px-60 2xl:px-60 xl:px-20 lg:px-14">
        <h2 className="3xl:text-[clamp(52px,10vw,150px)] 2xl:text-[clamp(52px,3.8vw,58px)] xl:text-[clamp(45px,3.8vw,58px)] lg:text-[clamp(40px,3.8vw,58px)] md:text-[clamp(36px,3.8vw,58px)] font-semibold leading-[1.1] text-[#0a0a0a]  tracking-[0.02em]">
          Our Previous
          <br />
          Work
        </h2>
      </div>

      <Swiper {...swiperProps} speed={4500}>
        {SLIDES.map((item, i) => (
          <SwiperSlide
            key={`d-${item.id}-${i}`}
            style={{ width: slideWidth }}
          >
            <PortfolioCard item={item} imgHeight={imgHeight} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}