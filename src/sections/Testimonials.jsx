import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

const UiUxIcon = () => (
  <img src="/Asset 5.svg" alt="Ui icon" width={44} height={44} />
);
const CodeIcon = () => (
  <img src="/Asset 4.svg" alt="Development icon" width={44} height={44} />
);
const MarketIcon = () => (
  <img src="/Asset 3.svg" alt="Marketing icon" width={44} height={44} />
);

// ── Updated descriptions ──────────────────────────────────────────────
const SERVICES = [
  {
    id: 1,
    icon: <UiUxIcon />,
    title: ["UI/UX", "Design services"],
    desc: "We craft intuitive, beautiful interfaces that keep users engaged and drive meaningful interactions across every touchpoint.",
  },
  {
    id: 2,
    icon: <CodeIcon />,
    title: ["Development", "Solution"],
    desc: "From robust backends to pixel-perfect frontends, we build scalable web solutions tailored to your business goals.",
  },
  {
    id: 3,
    icon: <MarketIcon />,
    title: ["Marketing", "and Automation"],
    desc: "We design data-driven campaigns and smart automation systems that grow your reach and convert leads on autopilot.",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    thumbnail: "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775279980/1_boplvw.webp",
    name: "Elena Rodriguez",
    role: "Founder & CEO",
    review: "Honestly didn't expect this level of quality. The brand identity they built feels premium, intentional, and exactly us.",
  },
  {
    id: 2,
    thumbnail: "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775280021/2_gsi1di.webp",
    name: "Sarah Jenkins",
    role: "Marketing Director",
    review: "Fastest turnaround I've seen — and zero quality drop. Our campaign materials went viral on LinkedIn within 48 hours.",
  },
  {
    id: 3,
    thumbnail: "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775280158/3_y9ndfl.webp",
    name: "David Harrison",
    role: "Project Manager",
    review: "They didn't just build a website — they built a conversion machine. Traffic doubled, bounce rate dropped. Crazy results.",
  },
  {
    id: 4,
    thumbnail: "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775280183/4_gxrtp2.webp",
    name: "Mark Smith",
    role: "Co-founder & COO",
    review: "Three agencies passed on our timeline. Prographr delivered ahead of it. Slides, deck, site — all on point. 10/10.",
  },
];

const SLIDES = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

function PlayBtn() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="flex items-center justify-center rounded-full w-[52px] h-[52px] bg-white/[18%] border-[1.5px] border-white/[45%] backdrop-blur-[6px]">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-[2px]">
          <path d="M4 2.5L13.5 8L4 13.5V2.5Z" fill="white" />
        </svg>
      </div>
    </div>
  );
}

function TestimonialCard({ item }) {
  return (
    <div className="relative overflow-hidden w-full h-[380px] sm:h-[400px] md:h-[400px] lg:h-[420px] xl:h-[500px] 2xl:h-[520px] 3xl:h-[800px]">
      <img
        src={item.thumbnail}
        alt={item.name}
        className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
        loading="lazy"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.04) 20%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.88) 100%)" }}
      />
      <PlayBtn />
      <div className="absolute bottom-0 left-0 right-0 px-10 pb-5">
        <p className="text-white font-semibold 3xl:text-[30px] 2xl:text-[30px] xl:text-[22px] lg:text-[22px] md:text-[17px] text-[16px] leading-tight tracking-[-0.3px]">
          {item.name}
        </p>
        <p className="3xl:text-[18px] 2xl:text-[18px] xl:text-[16px] lg:text-[13px] md:text-[11px] font-medium mt-[3px] mb-3 text-white/[65%]">
          {item.role}
        </p>
        <p className="3xl:text-[15px] 2xl:text-[15px] xl:text-[14px] lg:text-[12px] md:text-[11px] text-[9px] leading-[1.65] line-clamp-3 text-white/50 pb-6">
          {item.review}
        </p>
      </div>
    </div>
  );
}

// ── Updated ServiceCard — compact, description right below title ───────
function ServiceCard({ icon, title, desc }) {
  return (
    <div className="flex flex-col p-8 3xl:p-14 bg-[#1E3539] gap-6">
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center">
        {icon}
      </div>
      {/* Title */}
      <h3 className="text-white font-medium leading-[1.35] tracking-[0.01em] 3xl:text-[clamp(24px,2vw,32px)] 2xl:text-[clamp(20px,1.6vw,26px)] xl:text-[22px] lg:text-[20px] text-[18px]">
        {title[0]}
        <br />
        {title[1]}
      </h3>
      {/* Description — immediately below title */}
      <p className="3xl:text-[15px] 2xl:text-[14px] xl:text-[13px] lg:text-[12px] text-[12px] leading-[1.7] text-[#B2B2B2]">
        {desc}
      </p>
    </div>
  );
}

export default function Testimonials() {
  const containerRef = useRef(null);
  const builtHeadingRef = useRef(null);
  const successHeadingRef = useRef(null);

  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
  );

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const refs = [builtHeadingRef.current, successHeadingRef.current].filter(Boolean);
    if (!refs.length) return;

    const ctx = gsap.context(() => {
      refs.forEach((el) => {
        gsap.fromTo(
          el,
          { y: "110%", skewY: 7, opacity: 0 },
          {
            y: "0%", skewY: 0, opacity: 1, duration: 1.5, ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 95%", toggleActions: "play none none none" },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isDesktop]);

  const swiperProps = {
    modules: [Autoplay, FreeMode],
    slidesPerView: "auto",
    spaceBetween: 36,
    freeMode: { enabled: true, momentum: false },
    autoplay: { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true },
    loop: true,
    style: { margin: 0 },
  };

  // ── MOBILE ─────────────────────────────────────────────────────────
  if (!isDesktop) {
    return (
      <section ref={containerRef} className="w-full bg-white overflow-hidden md:pt-10 pt-0">
        <div className="bg-[#0a0a0a] pb-[220px]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-10">
            <div className="flex items-end justify-between gap-4">
              <div className="overflow-hidden">
                <h2
                  ref={builtHeadingRef}
                  className="font-extrabold leading-[1.12] text-white tracking-[-0.8px]"
                  style={{ fontSize: "clamp(26px,7vw,38px)" }}
                >
                  Built to Scale:
                  <br />Solutions for
                  <br />Your Evolution
                </h2>
              </div>
              <p className="text-right leading-relaxed shrink-0 text-[12px] pb-1 text-white/[38%]">
                A Showcase<br />of Our Latest<br />Completed Works
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-8">
              {SERVICES.map(({ id, icon, title, desc }) => (
                <div key={id} className="flex flex-col p-5 gap-4 border border-white/[10%] bg-[#111111]">
                  <div>{icon}</div>
                  <h3 className="text-white font-bold text-[14px] leading-[1.35]">
                    {title[0]}<br />{title[1]}
                  </h3>
                  <p className="text-[11px] leading-relaxed text-white/[50%]">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-6">
            <div className="flex items-end justify-between gap-4">
              <div className="overflow-hidden">
                <h2
                  ref={successHeadingRef}
                  className="font-extrabold leading-[1.12] text-white tracking-[-0.8px]"
                  style={{ fontSize: "clamp(26px,7vw,38px)" }}
                >
                  Success Stories<br />That Inspire Us
                </h2>
              </div>
              <button className="shrink-0 text-white font-semibold uppercase transition-colors duration-200 hover:bg-white hover:text-black text-[8px] tracking-[1.8px] px-3 py-[7px] border border-white/30 self-end mb-1">
                Client Stories
              </button>
            </div>
          </div>
        </div>

        <div className="-mt-[180px]">
          <Swiper {...swiperProps} speed={3500}>
            {SLIDES.map((item, i) => (
              <SwiperSlide key={`m-${item.id}-${i}`} style={{ width: "clamp(200px, 62vw, 260px)" }}>
                <TestimonialCard item={item} cardHeight="clamp(300px, 70vw, 380px)" slideWidth="clamp(200px, 62vw, 260px)" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="pb-14" />
      </section>
    );
  }

  // ── DESKTOP ────────────────────────────────────────────────────────
  return (
    <section ref={containerRef} className="w-full bg-white overflow-hidden">
      <div className="bg-[#182F33] pb-[310px]">
        <div className="3xl:pt-64 2xl:pt-52 xl:pt-36 lg:pt-36 pt-20 pb-14 px-3 md:px-10 3xl:px-[26rem] 2xl:px-[10rem] xl:px-[5rem] lg:px-[4rem]">
          <div className="relative">
            <div className="overflow-hidden">
              <h2
                ref={builtHeadingRef}
                className="font-medium leading-[1.2] text-white 3xl:max-w-[1260px] max-w-[760px] 3xl:text-[clamp(52px,10vw,90px)] 2xl:text-[clamp(52px,10vw,80px)] xl:text-[clamp(45px,3.8vw,58px)] lg:text-[clamp(40px,3.8vw,58px)] md:text-[clamp(36px,3.8vw,58px)] tracking-[0.02em]"
              >
                Built to Scale: Solutions
                <br />for Your Evolution
              </h2>
            </div>
            <p className="absolute bottom-0 3xl:top-80 2xl:top-60 xl:top-60 lg:top-48 right-0 text-md 3xl:text-xl text-right leading-relaxed text-[#B2B2B2]">
              A Showcase<br />of Our Latest Completed Works
            </p>
          </div>

          {/* ── Service cards — compact grid ── */}
          <div className="grid grid-cols-3 mt-72 gap-6 3xl:gap-10">
            {SERVICES.map(({ id, icon, title, desc }) => (
              <ServiceCard key={id} icon={icon} title={title} desc={desc} />
            ))}
          </div>
        </div>

        <div className="px-3 md:px-10 3xl:px-[26rem] 2xl:px-[10rem] xl:px-20 lg:px-14">
          <div className="flex items-end justify-between pt-24 border-t border-white/[8%] py-12">
            <div className="overflow-hidden">
              <h2
                ref={successHeadingRef}
                className="font-medium leading-[1.2] text-white 3xl:max-w-[1260px] max-w-[760px] 3xl:text-[clamp(52px,10vw,90px)] 2xl:text-[clamp(52px,10vw,80px)] xl:text-[clamp(45px,3.8vw,58px)] lg:text-[clamp(40px,3.8vw,58px)] md:text-[clamp(36px,3.8vw,58px)] tracking-[0.02em]"
              >
                Success Stories That<br />Inspire Us
              </h2>
            </div>
            <button className="text-white font-semibold uppercase transition-colors duration-200 hover:bg-white hover:text-black shrink-0 self-end mb-1 3xl:text-[15px] 2xl:text-[13px] xl:text-[11px] lg:text-[11px] tracking-[2px] text-[9px] px-6 py-[10px] border border-white/30">
              Client Stories
            </button>
          </div>
        </div>
      </div>

      <div className="-mt-[250px]">
        <Swiper {...swiperProps} speed={4500}>
          {SLIDES.map((item, i) => (
            <SwiperSlide
              key={`d-${item.id}-${i}`}
              className="!w-[240px] sm:!w-[260px] md:!w-[280px] lg:!w-[420px] xl:!w-[500px] 2xl:!w-[340px] 3xl:!w-[600px]"
            >
              <TestimonialCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="2xl:mb-20 xl:mb-14 lg:mb-12" />
    </section>
  );
}