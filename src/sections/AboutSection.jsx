import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Pure CSS formula that always matches max-w-7xl (80rem=1280px) + px-10 (2.5rem=40px)
// On screens wider than 1280px: (100vw - 1280px) / 2 + 40px
// On narrower screens: falls back to 40px minimum
const LEFT_INDENT = "max(40px, calc((100vw - 80rem) / 2 + 2.5rem))";

export default function AboutSection() {
  const wrapperRef = useRef(null);
  const sectionRef = useRef(null);
  const cardsWrapRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
  );

  // Track breakpoint
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // GSAP only on desktop
  useEffect(() => {
    if (!isDesktop) return;
    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    const cardsWrap = cardsWrapRef.current;
    if (!wrapper || !section || !cardsWrap) return;

    const getScrollAmount = () =>
      -(cardsWrap.scrollWidth - cardsWrap.parentElement.clientWidth);

    const ctx = gsap.context(() => {
      gsap.to(cardsWrap, {
        x: () => getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: section,
          pinSpacing: true,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          scrub: 1.2,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onRefresh: (self) => {
            gsap.set(cardsWrap, { x: 0 });
            self.update();
          },
        },
      });
    }, wrapper);

    const timer = setTimeout(() => ScrollTrigger.refresh(true), 300);

    const handleResize = () => {
      gsap.set(cardsWrap, { x: 0 });
      ScrollTrigger.refresh(true);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDesktop]);

  // ── MOBILE / TABLET layout (< 1024px) ────────────────────────────────
  if (!isDesktop) {
    return (
      <section className="bg-white w-full">
        {/* Heading */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
          <div className="pt-10 pb-8 border-b border-[#efefef]">
            <span className="inline-block text-[9px] bg-[#F2F2F2] text-black uppercase font-bold px-3 py-1 mb-5">
              About Us
            </span>
            <h2 className="text-[clamp(22px,5.5vw,32px)] font-extrabold leading-[1.4] text-[#0a0a0a] max-w-[560px]">
              We Help Businesses Stand Out With Modern, Creative, and{" "}
              <span className="text-[#c0c0c0]">Impactful Design Solutions</span>
            </h2>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full py-8 flex flex-col gap-8 md:-mt-6 -mt-28">
          {/* Hero image */}
          <div
            className="w-full overflow-hidden"
            style={{ height: "clamp(400px, 48vw, 300px)" }}
          >
            <img
              src="https://res.cloudinary.com/dzi3u164c/image/upload/v1774865116/Asset_1_qgly6y.webp"
              alt="About Prographr"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Body text */}
          <div className="flex flex-col gap-3 max-w-[560px] md:-mt-6 -mt-24">
            <p className="text-[13px] leading-[1.6] text-[#666]">
              In today's fast-moving digital world, strong and meaningful design
              plays a vital role in building a successful brand.
            </p>
            <p className="text-[13px] leading-[1.6] text-[#666]">
              Our agency specializes in design services that help brands stand
              out in a competitive market.
            </p>
          </div>

          {/* B&W team image */}
          <div
            className="w-full overflow-hidden"
            style={{ height: "clamp(220px, 52vw, 340px)" }}
          >
            <img
              src="https://res.cloudinary.com/dzi3u164c/image/upload/v1774865534/Asset_2_g5eqsn.webp"
              alt="We have an expert team"
              className="w-full h-full object-cover object-bottom"
            />
          </div>

          {/* Stats block */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[clamp(24px,5.5vw,36px)] font-bold text-[#0a0a0a] leading-[1.25]">
              What makes our agency different
            </h3>
            <div className="flex items-stretch gap-3 sm:gap-5 mt-2">
              <div className="flex flex-col justify-center gap-1 flex-1">
                <div className="text-[clamp(32px,8vw,44px)] font-semibold leading-none tracking-[-1px] text-[#0a0a0a]">
                  30+
                </div>
                <div className="text-[11px] leading-[1.5] text-[#555]">
                  Company with Work Experiences
                </div>
              </div>
              <div className="flex-[2] bg-[#0a0a0a] px-4 sm:px-8 py-6 flex gap-5 sm:gap-24 items-center justify-center">
                <div>
                  <div className="text-[clamp(26px,7vw,40px)] font-semibold leading-none mb-1 tracking-[-1px] text-white">
                    1K+
                  </div>
                  <div className="text-[11px] leading-[1.5] text-white">
                    Job Completed
                  </div>
                </div>
                <div>
                  <div className="text-[clamp(26px,7vw,40px)] font-semibold leading-none mb-1 tracking-[-1px] text-white">
                    100%
                  </div>
                  <div className="text-[11px] leading-[1.5] text-white">
                    Satisfied Client
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dark CTA card */}
          <div
            className="w-full overflow-hidden relative border border-[#efefef]"
            style={{ height: "clamp(240px, 55vw, 320px)" }}
          >
            <img
              src="https://res.cloudinary.com/dzi3u164c/image/upload/v1774931324/Asset_3_raki8b.webp"
              alt="lightning"
              className="absolute inset-0 w-full h-full object-cover object-right"
            />
            <div className="relative z-10 flex flex-col justify-between h-full p-7 sm:p-10">
              <h3 className="text-[clamp(22px,5.5vw,34px)] font-extrabold text-white leading-[1.15] tracking-[-0.5px] max-w-[65%]">
                Scroll and enjoy a new experience
              </h3>
              <button className="self-start inline-flex items-center gap-2 px-5 py-[9px] bg-transparent border border-white/30 rounded-full text-white/70 text-[11px] cursor-pointer transition-all hover:bg-white/10 hover:text-white">
                Again let's go →
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── DESKTOP layout (≥ 1024px) ─────────────────────────────────────────
  return (
    <div ref={wrapperRef}>
      <section
        ref={sectionRef}
        className="bg-white w-full overflow-hidden h-screen flex flex-col"
      >
        {/* Heading — uses same LEFT_INDENT as left panel for perfect alignment */}
        <div className="w-full shrink-0">
          <div
            className="pt-12 pb-8 border-b border-[#efefef]"
            style={{ paddingLeft: LEFT_INDENT, paddingRight: LEFT_INDENT }}
          >
            <span className="inline-block text-[9px] bg-[#F2F2F2] text-black uppercase font-bold px-3 py-1 mb-6">
              About Us
            </span>
            <h2 className="text-[clamp(20px,2.2vw,32px)] font-extrabold leading-[1.4] text-[#0a0a0a] max-w-[600px]">
              We Help Businesses Stand Out With Modern, Creative, and{" "}
              <span className="text-[#c0c0c0]">
                Impactful <br /> Design Solutions
              </span>
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="flex items-stretch w-full flex-1 min-h-0 pt-4">
          {/* LEFT PANEL — paddingLeft uses same CSS formula as heading */}
          <div className="shrink-0 flex flex-col border-r border-[#efefef] pr-10 pt-2 pb-8 gap-5 overflow-hidden 2xl:w-[47vw] xl:w-[47vw] lg:w-[47vw] md:w-[60vw] pl-[max(40px,calc((100vw-80rem)/2+2.5rem))]">
            <div
              className="shrink-0 overflow-hidden"
              style={{ height: "220px" }}
            >
              <img
                src="https://res.cloudinary.com/dzi3u164c/image/upload/v1774865116/Asset_1_qgly6y.webp"
                alt="About Prographr"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="shrink-0 flex flex-col gap-3">
              <p className="text-[13px] leading-[1.5] text-[#666]">
                In today's fast-moving digital world, strong and meaningful
                design plays a vital role in building a successful brand.
              </p>
              <p className="text-[13px] leading-[1.5] text-[#666]">
                Our agency specializes in design services that help brands stand
                out in a competitive market.
              </p>
            </div>
          </div>

          {/* RIGHT — scrolling cards */}
          <div className="flex-1 overflow-hidden relative min-h-0">
            <div
              ref={cardsWrapRef}
              className="flex items-stretch h-full will-change-transform"
              style={{ width: "max-content" }}
            >
              {/* Card 1 — B&W image */}
              <div className="shrink-0 self-start border-r border-l border-[#efefef] pr-8 pl-8 pt-2 2xl:w-[35vw] xl:w-[45vw] lg:w-[55vw]">
                <div className="relative" style={{ height: "350px" }}>
                  {/* Image Container */}
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src="https://res.cloudinary.com/dzi3u164c/image/upload/v1774967188/photo-1556761175-b413da4baf72_iqjccn.avif"
                      alt="We have a expert team"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text overlay — "ex" is inside the black box, "pert team" is outside */}
                  <div className="absolute bottom-8 left-0 flex items-center whitespace-nowrap">
                    {/* Black box part containing the first part of the word */}
                    <div className="bg-[#000000] py-3 pl-10">
                      <span className="text-white text-[15px] font-normal tracking-wide">
                        We have an ex
                      </span>
                    </div>
                    {/* Overhanging part containing the rest of the word */}
                    <div className="py-3">
                      <span className="text-white text-[15px] font-normal tracking-wide">
                        pert team
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card 2 — Stats */}
              <div
                className="shrink-0 self-stretch flex flex-col justify-start px-10 border-r border-[#efefef] pt-2"
                style={{ width: "30vw" }}
              >
                <h3 className="2xl:text-[42px] xl:text-[40px] lg:text-[32px] font-bold text-[#0a0a0a] 2xl:leading-[1.4] xl:leading-[1.33] lg:leading-[1.33] mb-10 -mt-2">
                  What makes
                  <br />
                  our agency different
                </h3>
                <div className="flex items-start gap-4 2xl:pt-8 xl:pt-8 lg:pt-24">
                  <div className="flex-1">
                    <div className="2xl:text-[40px] xl:text-[30px] lg:text-[20px] font-semibold leading-none mb-2 tracking-[-1px] 2xl:pt-8 xl:pt-2 lg:pt-1 text-[#0a0a0a]">
                      30+
                    </div>
                    <div className="2xl:text-[12px] xl:text-[12px] lg:text-[9px] leading-[1.5] text-[#090909]">
                      Company with Work Experiences
                    </div>
                  </div>
                  <div className="flex-[2] bg-[#0a0a0a] 2xl:px-10 2xl:py-10 xl:px-6 xl:py-6 lg:px-3 lg:py-4 flex 2xl:gap-20 xl:gap-14 lg:gap-8 items-center justify-center">
                    <div>
                      <div className="2xl:text-[40px] xl:text-[36px] lg:text-[20px] font-semibold leading-none mb-2 tracking-[-1px] text-white">
                        1K+
                      </div>
                      <div className="2xl:text-[12px] xl:text-[10px] lg:text-[10px] leading-[1.5] text-white whitespace-nowrap">
                        Job Completed
                      </div>
                    </div>
                    <div>
                      <div className="2xl:text-[40px] xl:text-[36px] lg:text-[20px] font-semibold leading-none mb-2 tracking-[-1px] text-white">
                        100%
                      </div>
                      <div className="2xl:text-[12px] xl:text-[10px] lg:text-[10px] leading-[1.5] text-white whitespace-nowrap">
                        Satisfied Client
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 — Dark CTA */}
              <div
                className="shrink-0 overflow-hidden flex flex-col justify-between w-[500px] border border-[#efefef] mx-6"
                style={{ height: "355px", position: "relative", top: "-16px" }}
              >
                <img
                  src="https://res.cloudinary.com/dzi3u164c/image/upload/v1774931324/Asset_3_raki8b.webp"
                  alt="lightning"
                  className="absolute inset-0 w-full h-full object-cover object-right"
                />
                <div className="relative z-10 flex flex-col justify-between h-full p-12">
                  <h3 className="text-[36px] font-extrabold text-white leading-[1.15] tracking-[-0.5px] max-w-[55%]">
                    Scroll and enjoy a new experience
                  </h3>
                  <button className="self-start inline-flex items-center gap-2 px-5 py-[9px] bg-transparent border border-white/30 rounded-full text-white/70 text-[11px] cursor-pointer transition-all hover:bg-white/10 hover:text-white">
                    Again let's go →
                  </button>
                </div>
              </div>

              <div className="shrink-0 w-12" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}