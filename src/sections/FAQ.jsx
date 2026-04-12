import { useState } from "react";

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

  return (
    <section id="faq" className="bg-[#0a0a0a] ">
      {/* ── Careers ── */}
      <div className="md:px-10 3xl:px-[26rem] 2xl:px-60 xl:px-20 lg:px-14 mx-auto px-6 pt-64 pb-16 border-b border-[#1f1f1f]">
        <h2
          className="font-medium leading-[1.2] text-white  3xl:max-w-[1260px] max-w-[760px] 3xl:text-[clamp(52px,10vw,90px)]  2xl:text-[clamp(36px,3.8vw,58px)]  xl:text-[clamp(36px,3.8vw,58px)]  lg:text-[clamp(36px,3.8vw,58px)]  md:text-[clamp(36px,3.8vw,58px)] tracking-[0.02em"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Become a member of a<br />
          talented team
        </h2>

        <div className="flex flex-col divide-y divide-[#1f1f1f] pt-24">
          {jobs.map((job, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-5 gap-6"
            >
              <div>
                <p className="text-white font-semibold text-sm md:text-[28px] leading-tight mb-1 tracking-[0.02em]">
                  {job.title}
                </p>
                <p className="text-[#C1C1C1] text-xs md:text-md pt-2">{job.meta}</p>
              </div>
              <button className="shrink-0 border border-white text-white text-lg px-5 py-1.5 hover:bg-white hover:text-[#0a0a0a] transition-colors duration-200 whitespace-nowrap">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="md:px-10 3xl:px-[26rem] 2xl:px-60 xl:px-20 lg:px-14 mx-auto px-6  pt-16 pb-24">
        <h2
          className="font-medium leading-[1.2] text-white  3xl:max-w-[1360px] max-w-[760px] 3xl:text-[clamp(52px,10vw,90px)]  2xl:text-[clamp(36px,3.8vw,58px)]  xl:text-[clamp(36px,3.8vw,58px)]  lg:text-[clamp(36px,3.8vw,58px)]  md:text-[clamp(36px,3.8vw,58px)] tracking-[0.02em"
          style={{
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Got
          <br />
          Questions?
        </h2>

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
                    className={`text-sm md:text-lg xl:text-lg 2xl:text-lg 3xl:text-2xl tracking-[0.02em] font-medium transition-colors duration-200 ${
                      isOpen
                        ? "text-white"
                        : "text-white/80 group-hover:text-white"
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {faq.q}
                  </span>
                  <span className="shrink-0 text-white text-lg leading-none w-5 text-center">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-60 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="text-[#888] text-base leading-relaxed">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
