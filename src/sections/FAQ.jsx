import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const jobs = [
  { title: "Senior Ui Ux Designer", meta: "Onsite / Full Time / Senior Level" },
  { title: "Marketing Manager", meta: "Onsite / Full Time / Senior Level" },
  { title: "Senior Ui Ux Designer", meta: "Onsite / Full Time / Senior Level" },
];

const faqs = [
  {
    q: "What is the difference between UI and UX design?",
    a: "UX (User Experience) design focuses on the logic, usability, and feel of the product—ensuring the journey is intuitive. UI (User Interface) design focuses on the visual touchpoints—colors, typography, and layouts—that make the product engaging and professional. We provide both to ensure your site works as beautifully as it looks.",
  },
  {
    q: "Do you handle both design and development?",
    a: "Yes. Prographr is a full-service creative agency. We handle everything from brand identity and UI/UX design to full-stack web development and deployment.",
  },
  {
    q: "How long does a typical project take?",
    a: "Project timelines vary based on scope. A landing page typically takes 1–2 weeks, while a full web application can take 4–12 weeks. We'll give you a clear timeline during the discovery call.",
  },
  {
    q: "Can you redesign an existing website?",
    a: "Absolutely. We specialize in redesigns—improving both aesthetics and performance while preserving your brand equity and SEO structure.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const containerRef = useRef(null);
  const careersHeadingRef = useRef(null);
  const faqHeadingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      [careersHeadingRef, faqHeadingRef].forEach((ref) => {
        gsap.fromTo(
          ref.current,
          { y: "110%", skewY: 7, opacity: 0 },
          {
            y: "0%",
            skewY: 0,
            opacity: 1,
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={containerRef} className="bg-[#182F33]">
      {/* ── Careers ── */}
      <div className="md:px-10 3xl:px-[26rem] 2xl:px-[10rem] xl:px-[5rem] lg:px-[4rem] mx-auto px-6 3xl:pt-64 2xl:pt-52 xl:pt-36 lg:pt-36 md:pt-36 pb-16 pt-28 border-b border-[#1f1f1f]">
        {/* overflow-hidden clips the slide-up so it doesn't show below the section */}
        <div className="overflow-hidden">
          <h2
            ref={careersHeadingRef}
            className="font-medium leading-[1.2] text-white 3xl:max-w-[1260px] 2xl:max-w-[1100px] max-w-[860px] 3xl:text-[clamp(52px,10vw,90px)] 2xl:text-[clamp(52px,10vw,72px)] xl:text-[clamp(36px,3.8vw,58px)] lg:text-[clamp(36px,3.8vw,58px)] md:text-[clamp(36px,3.8vw,58px)] text-[clamp(28px,3.8vw,40px)]"
          >
            Become a member of a<br />
            talented team
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-[#1f1f1f] pt-24">
          {jobs.map((job, i) => (
            <div key={i} className="flex items-center justify-between py-5 gap-6">
              <div>
                <p className="text-white font-semibold text-sm 3xl:text-[28px] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] text-[17px] leading-tight mb-1 tracking-[0.02em]">
                  {job.title}
                </p>
                <p className="text-[#C1C1C1] text-xs md:text-md pt-2">{job.meta}</p>
              </div>
              <button className="shrink-0 border border-white text-white 3xl:text-lg 2xl:text-base xl:text-[11px] lg:text-[11px] md:text-[11px] text-[10px] 3xl:px-5 3xl:py-1.5 2xl:px-5 2xl:py-1.5 xl:px-3 xl:py-1.5 lg:px-2.5 lg:py-1.5 md:px-2.5 md:py-1 px-2 py-1 hover:bg-white hover:text-[#0a0a0a] transition-colors duration-200 whitespace-nowrap">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="md:px-10 3xl:px-[26rem] 2xl:px-[10rem] xl:px-20 lg:px-14 mx-auto px-6 pt-16 pb-24">
        <div className="overflow-hidden">
          <h2
            ref={faqHeadingRef}
            className="font-medium leading-[1.2] text-white 3xl:max-w-[1360px] 2xl:max-w-[1100px] max-w-[760px] 3xl:text-[clamp(52px,10vw,90px)] 2xl:text-[clamp(36px,3.8vw,58px)] xl:text-[clamp(36px,3.8vw,58px)] lg:text-[clamp(36px,3.8vw,58px)] md:text-[clamp(36px,3.8vw,58px)] text-[clamp(32px,3.8vw,45px)]"
          >
            Got
            <br />
            Questions?
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-[#1f1f1f] mt-20">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                >
                  <span
                    className={`text-base md:text-base lg:text-lg xl:text-lg 2xl:text-lg 3xl:text-2xl tracking-[0.02em] font-medium transition-colors duration-200 ${
                      isOpen ? "text-white" : "text-white/80 group-hover:text-white"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span className="shrink-0 text-white text-lg leading-none w-5 text-center">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-60 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="text-[#888] 3xl:text-base 2xl:text-base xl:text-sm lg:text-sm md:text-[12px] text-[11px] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}