import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LEFT_INDENT = "max(40px, calc((100vw - 80rem) / 2 + 2.5rem))";

export default function AboutSection() {
  const wrapperRef   = useRef(null);
  const sectionRef   = useRef(null);
  const cardsWrapRef = useRef(null);
  const spacerRef    = useRef(null);

  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
  );

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const wrapper   = wrapperRef.current;
    const section   = sectionRef.current;
    const cardsWrap = cardsWrapRef.current;
    const spacer    = spacerRef.current;
    if (!wrapper || !section || !cardsWrap || !spacer) return;

    const getScrollAmount = () =>
      -(cardsWrap.scrollWidth - cardsWrap.parentElement.clientWidth);

    const updateSpacer = () => {
      const dist = Math.abs(getScrollAmount());
      spacer.style.height = `${dist}px`;
    };

    const ctx = gsap.context(() => {
      gsap.to(cardsWrap, {
        x: () => getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: section,
          pinSpacing: false,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          scrub: 1.2,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onRefresh: (self) => {
            gsap.set(cardsWrap, { x: 0 });
            updateSpacer();
            self.update();
          },
        },
      });
    }, wrapper);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh(true);
      updateSpacer();
    }, 300);

    const handleResize = () => {
      gsap.set(cardsWrap, { x: 0 });
      ScrollTrigger.refresh(true);
      updateSpacer();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDesktop]);

  // ── MOBILE / TABLET (< 1024px) ────────────────────────────────────────
  if (!isDesktop) {
    return (
      <section className="bg-white w-full">
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
        <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full py-8 flex flex-col gap-8">
          <div className="w-full overflow-hidden" style={{ height: "clamp(260px, 42vw, 480px)" }}>
            <img src="https://res.cloudinary.com/dzi3u164c/image/upload/v1774865116/Asset_1_qgly6y.webp" alt="About Prographr" className="w-full h-full object-cover object-center" />
          </div>
          <div className="flex flex-col gap-3 max-w-[560px]">
            <p className="text-[13px] leading-[1.6] text-[#666]">In today's fast-moving digital world, strong and meaningful design plays a vital role in building a successful brand.</p>
            <p className="text-[13px] leading-[1.6] text-[#666]">Our agency specializes in design services that help brands stand out in a competitive market.</p>
          </div>
          <div className="w-full overflow-hidden px-0">
            <div className="relative" style={{ height: "clamp(220px, 52vw, 340px)" }}>
              <div className="w-full h-full overflow-hidden">
                <img src="https://res.cloudinary.com/dzi3u164c/image/upload/v1774967188/photo-1556761175-b413da4baf72_iqjccn.avif" alt="We have an expert team" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-8 left-0 flex items-center whitespace-nowrap">
                <div className="bg-[#000000] py-3 pl-5 sm:pl-8">
                  <span className="text-white text-[13px] sm:text-[15px] font-normal tracking-wide">We have an ex</span>
                </div>
                <div className="py-3">
                  <span className="text-white text-[13px] sm:text-[15px] font-normal tracking-wide">pert team</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h3 className="text-[clamp(24px,5.5vw,36px)] font-bold text-[#0a0a0a] leading-[1.25]">What makes our agency different</h3>
            <div className="flex items-stretch gap-3 sm:gap-5 mt-2">
              <div className="flex flex-col justify-center gap-1 flex-1">
                <div className="text-[clamp(32px,8vw,44px)] font-semibold leading-none tracking-[-1px] text-[#0a0a0a]">30+</div>
                <div className="text-[11px] leading-[1.5] text-[#555]">Company with Work Experiences</div>
              </div>
              <div className="flex-[2] bg-[#0a0a0a] px-4 sm:px-8 py-6 flex gap-5 sm:gap-24 items-center justify-center">
                <div>
                  <div className="text-[clamp(26px,7vw,40px)] font-semibold leading-none mb-1 tracking-[-1px] text-white">1K+</div>
                  <div className="text-[11px] leading-[1.5] text-white">Job Completed</div>
                </div>
                <div>
                  <div className="text-[clamp(26px,7vw,40px)] font-semibold leading-none mb-1 tracking-[-1px] text-white">100%</div>
                  <div className="text-[11px] leading-[1.5] text-white">Satisfied Client</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full overflow-hidden relative border border-[#efefef]" style={{ height: "clamp(240px, 55vw, 320px)" }}>
            <img src="https://res.cloudinary.com/dzi3u164c/image/upload/v1774931324/Asset_3_raki8b.webp" alt="lightning" className="absolute inset-0 w-full h-full object-cover object-right" />
            <div className="relative z-10 flex flex-col justify-between h-full p-7 sm:p-10">
              <h3 className="text-[clamp(22px,5.5vw,34px)] font-extrabold text-white leading-[1.15] tracking-[-0.5px] max-w-[65%]">Scroll and enjoy a new experience</h3>
              <button className="self-start inline-flex items-center gap-2 px-5 py-[9px] bg-transparent border border-white/30 rounded-full text-white/70 text-[11px] cursor-pointer transition-all hover:bg-white/10 hover:text-white">Again let's go →</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── DESKTOP (≥ 1024px) ────────────────────────────────────────────────
  //
  // KEY FIX: Section height is now content-driven (h-auto) instead of h-screen.
  // The body row has an explicit height of 370px — just enough for the tallest
  // card (355px) plus a small top pad. Heading is tightened too.
  // This eliminates the ~300px dead whitespace that was pushing Portfolio far down.
  //
  return (
    <div ref={wrapperRef}>
      <section
        ref={sectionRef}
        className="bg-white w-full overflow-hidden flex flex-col"
        /* No h-screen — height is now sum of heading + body row */
      >
        {/* ── Heading ─────────────────────────────────────────────────── */}
        {/* Tightened: pt-12→pt-8, pb-8→pb-5, mb-6→mb-4  (saves ~24px) */}
        <div className="w-full shrink-0">
          <div
            className="pt-8 pb-5 border-b border-[#efefef]"
            style={{ paddingLeft: LEFT_INDENT, paddingRight: LEFT_INDENT }}
          >
            <span className="inline-block text-[13px] bg-[#F2F2F2] text-black uppercase font-bold px-3 py-1 mb-4">
              About Us
            </span>
            <h2 className="text-[clamp(36px,2.2vw,32px)] font-extrabold leading-[1.4] text-[#0a0a0a] max-w-[700px]">
              We Help Businesses Stand Out With Modern, Creative, and{" "}
              <span className="text-[#c0c0c0]">
                Impactful <br /> Design Solutions
              </span>
            </h2>
          </div>
        </div>

        {/* ── Body row — fixed height drives section height ────────────── */}
        {/* 370px = card-3 height (355px) + top pad (15px). No wasted space. */}
        <div
          className="flex items-stretch w-full shrink-0"
          style={{ height: "370px" }}
        >
          {/* LEFT PANEL */}
          <div
            className="shrink-0 flex flex-col border-r border-[#efefef] pr-10 pt-2 pb-5 gap-4 overflow-hidden 2xl:w-[52vw] xl:w-[47vw] lg:w-[47vw] md:w-[60vw]"
            style={{ paddingLeft: LEFT_INDENT }}
          >
            {/* Image height reduced from 220px → 175px to fit the shorter body */}
            <div className="shrink-0 overflow-hidden flex-1 min-h-0">
              <img
                src="https://res.cloudinary.com/dzi3u164c/image/upload/v1774865116/Asset_1_qgly6y.webp"
                alt="About Prographr"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="shrink-0 flex flex-col gap-3">
              <p className="text-[13px] leading-[1.6] text-[#666]">
                In today's fast-moving digital world, strong and meaningful
                design plays a vital role in building a successful brand.
              </p>
              <p className="text-[13px] leading-[1.6] text-[#666]">
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
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src="https://res.cloudinary.com/dzi3u164c/image/upload/v1774967188/photo-1556761175-b413da4baf72_iqjccn.avif"
                      alt="We have a expert team"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-8 left-0 flex items-center whitespace-nowrap">
                    <div className="bg-[#000000] py-2 pl-10">
                      <span className="text-white text-[15px] font-normal tracking-wide">We have an ex</span>
                    </div>
                    <div className="py-2">
                      <span className="text-white text-[15px] font-normal tracking-wide">pert team</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 — Stats */}
              <div
                className="shrink-0 self-stretch flex flex-col justify-start px-10 border-r border-[#efefef] pt-2  2xl:w-[35vw] xl:w-[45vw] lg:w-[55vw]"
                
              >
                <h3 className="2xl:text-[42px] xl:text-[40px] lg:text-[36px] font-bold text-[#0a0a0a] 2xl:leading-[1.4] xl:leading-[1.33] lg:leading-[1.4] mb-8 -mt-2">
                  What makes
                  <br />
                  <span className="2xl:whitespace-nowrap">our agency different</span>
                </h3>
                <div className="flex items-start gap-4 2xl:pt-10 xl:pt-20 lg:pt-24">
                  <div className="flex-1">
                    <div className="2xl:text-[40px] xl:text-[30px] lg:text-[28px] font-semibold leading-none mb-2 tracking-[-1px] 2xl:pt-10 xl:pt-6 lg:pt-10 text-[#0a0a0a]">30+</div>
                    <div className="2xl:text-[12px] xl:text-[12px] lg:text-[9px] leading-[1.5] text-[#090909]">Company with Work Experiences</div>
                  </div>
                  <div className="flex-[2] bg-[#0a0a0a] 2xl:px-7 2xl:py-12 xl:px-4 xl:py-10 lg:px-2 lg:py-10 flex 2xl:gap-20 xl:gap-14 lg:gap-6 items-center justify-center">
                    <div className="2xl:px-0 xl:px-0 lg:px-2">
                      <div className="2xl:text-[40px] xl:text-[36px] lg:text-[28px] font-semibold leading-none mb-2 tracking-[-1px] text-white">1K+</div>
                      <div className="2xl:text-[12px] xl:text-[10px] lg:text-[10px] leading-[1.5] text-white whitespace-nowrap">Job Completed</div>
                    </div>
                    <div className="2xl:px-0 xl:px-0 lg:px-0">
                      <div className="2xl:text-[40px] xl:text-[36px] lg:text-[28px] font-semibold leading-none mb-2 tracking-[-1px] text-white">100%</div>
                      <div className="2xl:text-[12px] xl:text-[10px] lg:text-[10px] leading-[1.5] text-white whitespace-nowrap">Satisfied Client</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 — Dark CTA */}
              <div className="shrink-0 overflow-hidden flex flex-col justify-between 2xl:w-[26vw] xl:w-[45vw] lg:w-[55vw] border border-[#efefef] mx-6 2xl:h-[355px] xl:h-[360px] lg:h-[360px] relative -top-0.5">
                <img
                  src="https://res.cloudinary.com/dzi3u164c/image/upload/v1774931324/Asset_3_raki8b.webp"
                  alt="lightning"
                  className="absolute inset-0 w-full h-full object-cover object-right"
                />
                <div className="relative z-10 flex flex-col justify-between h-full p-12">
                  <h3 className="text-[36px] font-extrabold text-white leading-[1.2] tracking-[-0.5px] max-w-[60%]">
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

      {/* Manual spacer — height set by JS to equal the horizontal scroll distance. */}
      <div ref={spacerRef} aria-hidden="true" />
    </div>
  );
}