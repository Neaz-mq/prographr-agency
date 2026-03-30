import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "30+", label: "Company with Work Experiences" },
  { value: "1K+", label: "Job Completed" },
  { value: "100%", label: "Satisfied Clients" },
];

export default function AboutSection() {
  const wrapperRef   = useRef(null);
  const sectionRef   = useRef(null);
  const cardsWrapRef = useRef(null);
  const headingRef   = useRef(null);
  const [leftOffset, setLeftOffset] = useState(48);

  useEffect(() => {
    const measure = () => {
      if (headingRef.current) {
        setLeftOffset(headingRef.current.getBoundingClientRect().left);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const wrapper   = wrapperRef.current;
    const section   = sectionRef.current;
    const cardsWrap = cardsWrapRef.current;
    if (!wrapper || !section || !cardsWrap) return;

    const getScrollAmount = () =>
      -(cardsWrap.scrollWidth - cardsWrap.parentElement.clientWidth);

    const ctx = gsap.context(() => {
      gsap.to(cardsWrap, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: section,
          pinSpacing: true,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, wrapper);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => {
      ctx.revert();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* Height below the heading bar */
  const bodyHeight = "calc(100vh - 168px)";

  return (
    <div ref={wrapperRef}>
      <section
        ref={sectionRef}
        className="bg-white w-full overflow-hidden h-screen"
      >
        {/* ── Heading ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div ref={headingRef} className="h-0" />
          <div className="pt-12 pb-8 border-b border-[#efefef]">
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

        {/* ── Body row ── */}
        <div className="flex items-start w-full" style={{ height: bodyHeight }}>

          {/* ── LEFT PANEL — image card + text ── */}
          <div
            className="shrink-0 flex flex-col border-r border-[#efefef] pr-10 pt-10 pb-8 gap-5"
            style={{ width: "38vw", paddingLeft: leftOffset, height: "100%" }}
          >
            {/* image — proportional height */}
            <div className="shrink-0 overflow-hidden rounded-[10px]" style={{ height: "260px" }}>
              <img
                src="https://res.cloudinary.com/dzi3u164c/image/upload/v1774865116/Asset_1_qgly6y.webp"
                alt="About Prographr"
                className="w-full h-full object-cover"
              />
            </div>

            {/* text below image */}
            <div className="shrink-0 flex flex-col gap-3 pt-2">
              <p className="text-[13px] leading-[1.85] text-[#666]">
                In today's fast-moving digital world, strong and meaningful
                design plays a vital role in building a successful brand. Our
                design agency was created with one clear goal — to help businesses.
              </p>
              <p className="text-[13px] leading-[1.85] text-[#666]">
                Our agency specializes in a wide range of design services that
                help brands stand out in a competitive market. From flyer
                design to full digital experiences.
              </p>
            </div>
          </div>

          {/* ── RIGHT — horizontally scrolling cards ── */}
          <div className="flex-1 overflow-hidden relative">
            <div
              ref={cardsWrapRef}
              className="flex items-stretch h-full will-change-transform pl-6"
              style={{ width: "max-content" }}
            >

              {/* Card 1 — full height image only, no text */}
              <div
                className="shrink-0 relative border-r border-[#efefef] pr-8 pl-2 pt-10 pb-8"
                style={{ width: "380px", height: "100%" }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-[10px]">
                  <img
                    src="https://res.cloudinary.com/dzi3u164c/image/upload/v1774865534/Asset_2_g5eqsn.webp"
                    alt="We have an expert team"
                    className="w-full h-full object-cover"
                  />
                  {/* caption overlay */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white text-[12px] font-medium">We have a expert team</p>
                  </div>
                </div>
              </div>

              {/* Stats card */}
              <div className="shrink-0 flex flex-col justify-center w-[400px] px-10 border-r border-[#efefef]">
                <h3 className="text-[21px] font-bold text-[#0a0a0a] leading-[1.3] mb-10">
                  What makes our agency different
                </h3>
                <div className="flex items-start gap-3">
                  {stats.map((s, i) => (
                    <div
                      key={i}
                      className={`flex-1 ${
                        i === 1
                          ? "bg-[#0a0a0a] rounded-xl px-[18px] py-[22px]"
                          : ""
                      }`}
                    >
                      <div
                        className={`text-[36px] font-black leading-none mb-2 tracking-[-1px] ${
                          i === 1 ? "text-white" : "text-[#0a0a0a]"
                        }`}
                      >
                        {s.value}
                      </div>
                      <div
                        className={`text-[12px] leading-[1.5] ${
                          i === 1 ? "text-white/50" : "text-[#aaa]"
                        }`}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dark CTA card */}
              <div className="shrink-0 relative overflow-hidden flex flex-col justify-between w-[360px] bg-[#0a0a0a] rounded-[14px] mx-6 my-6 p-10">
                <div className="absolute -top-[60px] -right-[60px] w-[220px] h-[220px] rounded-full border border-white/[0.06]" />
                <div className="absolute -top-[30px] -right-[30px] w-[150px] h-[150px] rounded-full border border-white/[0.09]" />
                <div
                  className="absolute inset-0 rounded-[14px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                  }}
                />
                <p className="relative z-10 text-[9px] tracking-[0.2em] text-white/[0.28] uppercase font-semibold">
                  Experience
                </p>
                <div className="relative z-10">
                  <h3 className="text-[clamp(22px,2vw,28px)] font-extrabold text-white leading-[1.18] mb-6 tracking-[-0.5px]">
                    Scroll and enjoy a new experience
                  </h3>
                  <button className="inline-flex items-center gap-2 px-6 py-[11px] bg-transparent border border-white/[0.18] rounded-full text-white/60 text-[12px] cursor-pointer transition-all hover:bg-white/[0.08] hover:text-white hover:border-white/35">
                    Again let's go →
                  </button>
                </div>
              </div>

              {/* Trailing spacer */}
              <div className="shrink-0 w-12" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}