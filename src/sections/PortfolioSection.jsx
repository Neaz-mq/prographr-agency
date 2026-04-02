import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";

const LEFT_INDENT = "max(40px, calc((100vw - 80rem) / 2 + 2.5rem))";

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
            className="text-[10px] text-[#555] border border-[#ddd] bg-[#F2F2F2] px-2.5 py-[5px] whitespace-nowrap leading-none"
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
      <section className="bg-white w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="pt-6 pb-6 border-b border-[#efefef]">
            
            <h2 className="text-[clamp(28px,7vw,40px)] font-extrabold leading-[1.15] text-[#0a0a0a] tracking-[-0.5px]">
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
              style={{ width: "clamp(240px, 68vw, 300px)" }}
            >
              <PortfolioCard item={item} imgHeight="clamp(180px, 48vw, 260px)" />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
  }

  // ── DESKTOP ──────────────────────────────────────────────────────────
  // Heading padding tightened (pt-10→pt-5, pb-8→pb-5) so Portfolio sits
  // flush right after the About section spacer ends — no visible gap.
  return (
    <section className="bg-white w-full overflow-hidden">
      {/* Heading */}
      <div
        className="border-b border-[#efefef] pt-20 pb-12"
        style={{ paddingLeft: LEFT_INDENT, paddingRight: LEFT_INDENT }}
      >    
        <h2 className="text-[clamp(36px,3.8vw,58px)] font-extrabold leading-[1.1] text-[#0a0a0a] tracking-[-1.5px]">
          Our Previous
          <br />
          Work
        </h2>
      </div>

      {/* Images */}
      <Swiper {...swiperProps} speed={4500}>
        {SLIDES.map((item, i) => (
          <SwiperSlide
            key={`d-${item.id}-${i}`}
            style={{ width: "clamp(560px, 26vw, 500px)" }}
          >
            <PortfolioCard
              item={item}
              imgHeight="clamp(200px, 22vw, 360px)"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}