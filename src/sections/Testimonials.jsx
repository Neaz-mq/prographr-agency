import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";

const LEFT_INDENT = "max(40px, calc((100vw - 80rem) / 2 + 2.5rem))";

// ── ICONS ─────────────────────────────────────────────────────────────
const UiUxIcon = () => (
  <img src="/Asset 5.svg" alt="Ui icon" width={38} height={38} />
);

const CodeIcon = () => (
  <img src="/Asset 4.svg" alt="Development icon" width={38} height={38} />
);

const MarketIcon = () => (
  <img src="/Asset 3.svg" alt="Marketing icon" width={38} height={38} />
);

// ── DATA ──────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 1,
    icon: <UiUxIcon />,
    title: ["Ui/Ux", "Design services"],
    desc: "A Showcase of Our Latest Completed Works",
  },
  {
    id: 2,
    icon: <CodeIcon />,
    title: ["Development", "Solution"],
    desc: "A Showcase of Our Latest Completed Works",
  },
  {
    id: 3,
    icon: <MarketIcon />,
    title: ["Marketing", "and Automation"],
    desc: "A Showcase of Our Latest Completed Works",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    thumbnail:
      "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775279980/1_boplvw.webp",
    name: "Elena Rodriguez",
    role: "Founder & CEO",
    review:
      "Honestly didn't expect this level of quality. The brand identity they built feels premium, intentional, and exactly us.",
  },
  {
    id: 2,
    thumbnail:
      "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775280021/2_gsi1di.webp",
    name: "Sarah Jenkins",
    role: "Marketing Director",
    review:
      "Fastest turnaround I've seen — and zero quality drop. Our campaign materials went viral on LinkedIn within 48 hours.",
  },
  {
    id: 3,
    thumbnail:
      "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775280158/3_y9ndfl.webp",
    name: "David Harrison",
    role: "Project Manager",
    review:
      "They didn't just build a website — they built a conversion machine. Traffic doubled, bounce rate dropped. Crazy results.",
  },
  {
    id: 4,
    thumbnail:
      "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775280183/4_gxrtp2.webp",
    name: "Mark Smith",
    role: "Co-founder & COO",
    review:
      "Three agencies passed on our timeline. Prographr delivered ahead of it. Slides, deck, site — all on point. 10/10.",
  },
];

const SLIDES = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

// ── PLAY BUTTON ───────────────────────────────────────────────────────
function PlayBtn() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="flex items-center justify-center rounded-full w-[52px] h-[52px] bg-white/[18%] border-[1.5px] border-white/[45%] backdrop-blur-[6px]">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="ml-[2px]"
        >
          <path d="M4 2.5L13.5 8L4 13.5V2.5Z" fill="white" />
        </svg>
      </div>
    </div>
  );
}

// ── TESTIMONIAL CARD ──────────────────────────────────────────────────
function TestimonialCard({ item, cardHeight, slideWidth }) {
  return (
    <div
      className="relative overflow-hidden w-full"
      style={{ height: cardHeight, width: slideWidth }}
    >
      <img
        src={item.thumbnail}
        alt={item.name}
        className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
        loading="lazy"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.04) 20%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.88) 100%)",
        }}
      />
      <PlayBtn />
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
        <p className="text-white font-bold text-[18px] leading-tight tracking-[-0.3px]">
          {item.name}
        </p>
        <p className="text-[12px] font-medium mt-[3px] mb-3 text-white/[65%]">
          {item.role}
        </p>
        <p className="text-[11px] leading-[1.65] line-clamp-3 text-white/50">
          {item.review}
        </p>
      </div>
    </div>
  );
}

// ── SERVICE CARD ──────────────────────────────────────────────────────
function ServiceCard({ icon, title, desc }) {
  return (
    <div className="flex flex-col justify-between p-8 xl:p-9 min-h-[300px] xl:min-h-[320px] bg-[#111616]">
      <div className="flex flex-col gap-6">
        <div className="w-10 h-10 flex items-center justify-center">{icon}</div>
        <h3
          className="text-white font-bold leading-[1.25] tracking-[-0.3px]"
          style={{ fontSize: "clamp(16px, 1.4vw, 20px)" }}
        >
          {title[0]}
          <br />
          {title[1]}
        </h3>
      </div>
      <p className="text-[12px] leading-[1.7] text-white/[30%] mt-10 max-w-[180px]">
        {desc}
      </p>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────
export default function Testimonials() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
  );

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const swiperProps = {
    modules: [Autoplay, FreeMode],
    slidesPerView: "auto",
    spaceBetween: 16,
    freeMode: { enabled: true, momentum: false },
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    loop: true,
    style: { margin: 0 },
  };

  // ── MOBILE ────────────────────────────────────────────────────────
  if (!isDesktop) {
    return (
      <section className="w-full bg-white overflow-hidden md:pt-10 pt-0">
        <div className="bg-[#0a0a0a] pb-[220px]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-10">
            <div className="flex items-end justify-between gap-4">
              <h2
                className="font-extrabold leading-[1.12] text-white tracking-[-0.8px]"
                style={{ fontSize: "clamp(26px,7vw,38px)" }}
              >
                Built to Scale:
                <br />
                Solutions for
                <br />
                Your Evolution
              </h2>
              <p className="text-right leading-relaxed shrink-0 text-[10px] pb-1 text-white/[38%]">
                A Showcase
                <br />
                of Our Latest
                <br />
                Completed Works
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-8">
              {SERVICES.map(({ id, icon, title, desc }) => (
                <div
                  key={id}
                  className="flex flex-col p-5 gap-10 border border-white/[10%] bg-[#111111]"
                >
                  <div className="flex flex-col gap-4">
                    <div>{icon}</div>
                    <h3 className="text-white font-bold text-[15px] leading-tight">
                      {title[0]}
                      <br />
                      {title[1]}
                    </h3>
                  </div>
                  <p className="text-[10px] leading-relaxed text-white/[32%]">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-6">
            <div className="flex items-end justify-between gap-4">
              <h2
                className="font-extrabold leading-[1.12] text-white tracking-[-0.8px]"
                style={{ fontSize: "clamp(26px,7vw,38px)" }}
              >
                Success Stories
                <br />
                That Inspire Us
              </h2>
              <button className="shrink-0 text-white font-semibold uppercase transition-colors duration-200 hover:bg-white hover:text-black text-[9px] tracking-[1.8px] px-3 py-[7px] border border-white/30 self-end mb-1">
                Client Stories
              </button>
            </div>
          </div>
        </div>

        <div className="-mt-[180px]">
          <Swiper {...swiperProps} speed={3500}>
            {SLIDES.map((item, i) => (
              <SwiperSlide
                key={`m-${item.id}-${i}`}
                style={{ width: "clamp(200px, 62vw, 260px)" }}
              >
                <TestimonialCard
                  item={item}
                  cardHeight="clamp(300px, 70vw, 380px)"
                  slideWidth="clamp(200px, 62vw, 260px)"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="pb-14" />
      </section>
    );
  }

  // ── DESKTOP ───────────────────────────────────────────────────────
  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="bg-[#0a0a0a] pb-[310px]">
        <div
          className="pt-20 pb-14"
          style={{ paddingLeft: LEFT_INDENT, paddingRight: LEFT_INDENT }}
        >
          {/* ↓ FIXED: removed py-10 so items-end aligns to heading baseline correctly */}
          <div className="relative">
            <h2
              className="font-extrabold leading-[1.2] text-white tracking-[-1.5px] max-w-[660px]"
              style={{ fontSize: "clamp(36px,3.8vw,58px)" }}
            >
              Built to Scale: Solutions
              <br />
              for Your Evolution
            </h2>
            <p className="absolute bottom-0 top-40 right-0 text-sm text-right leading-relaxed text-[#B2B2B2]">
              A Showcase
              <br />
              of Our Latest Completed Works
            </p>
          </div>

          <div className="grid grid-cols-3 mt-28 gap-8">
            {SERVICES.map(({ id, icon, title, desc }) => (
              <ServiceCard key={id} icon={icon} title={title} desc={desc} />
            ))}
          </div>
        </div>

        {/* Success Stories heading + button */}
        <div style={{ paddingLeft: LEFT_INDENT, paddingRight: LEFT_INDENT }}>
          <div className="flex items-end justify-between pt-24 border-t border-white/[8%] py-12">
            <h2
              className="font-extrabold leading-[1.1] text-white tracking-[-1.5px]"
              style={{ fontSize: "clamp(36px,3.8vw,58px)" }}
            >
              Success Stories That
              <br />
              Inspire Us
            </h2>
            <button className="text-white font-semibold uppercase transition-colors duration-200 hover:bg-white hover:text-black shrink-0 self-end mb-1 text-[10px] tracking-[2px] px-5 py-[10px] border border-white/30">
              Client Stories
            </button>
          </div>
        </div>
      </div>

      {/* Testimonial carousel */}
      <div className="-mt-[250px]">
        <Swiper {...swiperProps} speed={4500}>
          {SLIDES.map((item, i) => (
            <SwiperSlide
              key={`d-${item.id}-${i}`}
              style={{ width: "clamp(240px, 22vw, 320px)" }}
            >
              <TestimonialCard
                item={item}
                cardHeight="clamp(380px, 38vw, 480px)"
                slideWidth="clamp(240px, 22vw, 320px)"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="2xl:mb-20 xl:mb-14 lg:mb-12" />
    </section>
  );
}
