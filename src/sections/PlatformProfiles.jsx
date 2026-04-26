import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PLATFORMS = [
  {
    id: 1,
    src: "/Upwork.svg",
    alt: "Upwork",
    label: "Freelance & Agency Work",
    tag: "Top Rated Plus",
    url: "https://www.upwork.com/agencies/YOUR_PROFILE",
    accent: "#6FDA44",
  },
  {
    id: 2,
    src: "/Dribbble.svg",
    alt: "Dribbble",
    label: "Design Portfolio",
    tag: "UI/UX & Visual Design",
    url: "https://dribbble.com/YOUR_PROFILE",
    accent: "#EA4C89",
  },
  {
    id: 3,
    src: "/Envato.svg",
    alt: "Envato",
    label: "Premium Templates",
    tag: "Elite Author",
    url: "https://themeforest.net/user/YOUR_PROFILE",
    accent: "#82B541",
  },
  {
    id: 4,
    src: "/Fiverr.svg",
    alt: "Fiverr",
    label: "On-Demand Services",
    tag: "Level 2 Seller",
    url: "https://www.fiverr.com/YOUR_PROFILE",
    accent: "#1DBF73",
  },
  {
    id: 5,
    src: "/Freelancer.svg",
    alt: "Freelancer",
    label: "Project Collaboration",
    tag: "Preferred Freelancer",
    url: "https://www.freelancer.com/u/YOUR_PROFILE",
    accent: "#29B2FE",
  },
  {
    id: 6,
    src: "/fr.svg",
    alt: "Freepik",
    label: "Creative Assets",
    tag: "Verified Author",
    url: "https://www.freepik.com/author/YOUR_PROFILE",
    accent: "#1273EB",
  },
];

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M7 17L17 7M17 7H7M17 7V17"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function PlatformCard({ platform }) {
  const cardRef = useRef(null);
  const dotRef = useRef(null);
  const arrowRef = useRef(null);

  const handleEnter = () => {
    gsap.to(cardRef.current, {
      y: -6,
      borderColor: platform.accent + "55",
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(dotRef.current, {
      backgroundColor: platform.accent,
      scale: 1.3,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(arrowRef.current, {
      x: 3,
      y: -3,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      borderColor: "rgba(255,255,255,0.07)",
      duration: 0.4,
      ease: "power3.out",
    });
    gsap.to(dotRef.current, {
      backgroundColor: "rgba(255,255,255,0.2)",
      scale: 1,
      duration: 0.3,
    });
    gsap.to(arrowRef.current, { x: 0, y: 0, duration: 0.25 });
  };

  return (
    <a
      ref={cardRef}
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="platform-card flex flex-col justify-between p-6 xl:p-8 3xl:p-12 bg-[#1E3539] cursor-pointer no-underline"
      style={{
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "border-color 0.35s ease",
        willChange: "transform",
      }}
    >
      {/* Top row — logo + arrow */}
      <div className="flex items-start justify-between mb-8 xl:mb-12">
        <img
          src={platform.src}
          alt={platform.alt}
          className="h-8 xl:h-10 3xl:h-14 w-auto object-contain"
          style={{ filter: "grayscale(1) brightness(0) invert(1)" }}
        />
        <span ref={arrowRef} className="text-white/40 mt-0.5">
          <ArrowIcon />
        </span>
      </div>

      {/* Bottom — label + tag + dot */}
      <div>
        <p className="text-white/40 text-[10px] xl:text-[11px] 3xl:text-[15px] uppercase tracking-[0.18em] font-medium mb-2">
          {platform.label}
        </p>
        <div className="flex items-center justify-between gap-3">
          <p className="text-white font-medium text-[13px] xl:text-[15px] 3xl:text-[20px] leading-snug tracking-[0.01em]">
            {platform.alt}
          </p>
          <div className="flex items-center gap-1.5 shrink-0">
            <div
              ref={dotRef}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            />
            <span className="text-white/30 text-[9px] xl:text-[10px] 3xl:text-[13px] tracking-[0.1em] whitespace-nowrap">
              {platform.tag}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function PlatformProfiles() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
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

      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: subRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );

      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#182F33]"
      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="px-6 md:px-10 3xl:px-[26rem] 2xl:px-[10rem] xl:px-[5rem] lg:px-[4rem] 3xl:pt-40 2xl:pt-32 xl:pt-28 lg:pt-24 pt-20 3xl:pb-40 2xl:pb-32 xl:pb-28 lg:pb-24 pb-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 xl:mb-20">
          <div className="overflow-hidden">
            <h2
              ref={headingRef}
              className="font-medium leading-[1.15] text-white tracking-[0.02em] text-[clamp(32px,4vw,58px)] 3xl:text-[clamp(52px,10vw,90px)]"
            >
              Find us where
              <br />
              the work happens
            </h2>
          </div>
          <p
            ref={subRef}
            className="text-white/40 text-[12px] xl:text-[13px] 3xl:text-[17px] leading-[1.8] lg:text-right max-w-[260px] lg:max-w-[200px] xl:max-w-[240px]"
          >
            Browse our profiles,
            <br />
            explore our work and
            <br />
            connect directly.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 xl:gap-4 3xl:gap-6"
        >
          {PLATFORMS.map((platform) => (
            <PlatformCard key={platform.id} platform={platform} />
          ))}
        </div>
      </div>
    </section>
  );
}