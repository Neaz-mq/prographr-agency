import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: 1,
    title: "UI/UX\nDesign Solution",
    description:
      "We craft intuitive digital experiences that prioritize the user journey. By blending aesthetic elegance with seamless functionality, we transform complex ideas into engaging, high-performing interfaces.",
    tags: ["UI UX Design", "UX Research", "Wireframing", "Prototyping"],
    image:
      "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775296357/Untitled-1_vqxzaf.webp",
  },
  {
    id: 2,
    title: "Brand\nDesign Solution",
    description:
      "We build visual identities that resonate and endure. From logo creation to full brand guidelines, we ensure your business tells a compelling story that connects deeply with your target audience.",
    tags: ["Logo Design", "Visual Identity", "Typography", "Brand Strategy"],
    image:
      "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775296495/2_hukfxw.webp",
  },
  {
    id: 3,
    title: "Web\nDevelopment",
    description:
      "We engineer robust, scalable websites tailored to your business goals. Utilizing the latest frameworks, we deliver fast, secure, and responsive web solutions that perform flawlessly across all devices.",
    tags: ["Frontend", "Backend", "MERN", "E-Commerce"],
    image:
      "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775296526/3_dugife.webp",
  },
  {
    id: 4,
    title: "Software\nDevelopment",
    description:
      "We develop custom software designed to solve your most critical operational challenges. Our agile approach ensures high-quality code, seamless integrations, and tools that grow alongside your enterprise.",
    tags: ["Custom CRM", "API Integration", "SaaS", "Cloud Solutions"],
    image:
      "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775296564/4_ff0soq.webp",
  },
];

const CARD_GAP = 20;
const CARD_HEIGHT_PX = 600;

function CardInner({ service }) {
  return (
    <div className="relative w-full h-full">
      <img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover object-center"
        draggable="false"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(5,5,5,0.97) 0%, rgba(5,5,5,0.90) 25%, rgba(5,5,5,0.60) 52%, rgba(5,5,5,0.12) 78%, rgba(5,5,5,0.00) 100%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col px-10 py-8 lg:px-12 lg:py-32">
        {/* ✅ mt-auto on this wrapper pushes the whole group to the bottom */}
        <div className="mt-auto flex flex-col gap-5">
          <p className="text-white leading-relaxed 3xl:text-[clamp(20px,4vw,22px)] text-[clamp(11px,1.05vw,14px)] opacity-85">
            {service.description}
          </p>
          <div
            className="w-full"
            style={{ height: "1px", background: "rgba(255,255,255,0.22)" }}
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <h3 className="text-white font-medium leading-[1.2] tracking-[0.02em] whitespace-pre-line text-[clamp(17px,1.9vw,27px)] 3xl:text-[clamp(28px,3vw,30px)]">
              {service.title}
            </h3>
            <div className="flex flex-wrap gap-[20px] sm:justify-end">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white text-black font-bold px-[13px] py-[8px] text-[clamp(9px,0.82vw,12px)] 3xl:text-[clamp(12px,2vw,16px)] "
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TechnologySection() {
  const headingRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        {
          y: "110%",
          skewY: 7,
          opacity: 0,
        },
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
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-white relative 3xl:pb-32 2xl:pb-32 xl:pb-6">
      {/* HEADING SECTION */}
      <div className="md:px-10 3xl:px-[26rem] 2xl:px-[10rem] xl:px-[5rem] lg:px-14 mx-auto px-6 pt-8 lg:pt-4 pb-10 lg:pb-14 overflow-hidden relative z-10 bg-white">
        <div className="overflow-hidden">
          <h2
            ref={headingRef}
            className="3xl:text-[clamp(52px,10vw,100px)] 2xl:text-[clamp(52px,10vw,80px)] xl:text-[clamp(45px,3.8vw,58px)] lg:text-[clamp(40px,3.8vw,58px)] md:text-[clamp(36px,3.8vw,58px)] font-semibold leading-[1.1] text-[#0a0a0a] tracking-[0.02em]"
          >
            Technology
            <br />
            We Use
          </h2>
        </div>
      </div>

      {/* DESKTOP STACK */}
      <div className="hidden lg:block w-full">
        <div className="md:px-10 3xl:px-[26rem] 2xl:px-[10rem] xl:px-[5rem] lg:px-[4rem] mx-auto px-10">
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              style={{
                position: "sticky",
                top: "20px",
                zIndex: i + 1,
                marginBottom: i < SERVICES.length - 1 ? `${CARD_GAP}px` : 0,
              }}
            >
              <div className="relative w-full overflow-hidden h-[40vh] sm:h-[45vh] md:h-[30vh] lg:h-[55vh] xl:h-[65vh] 2xl:h-[70vh] 3xl:h-[80vh] rounded-none">
                <CardInner service={service} />
              </div>
            </div>
          ))}
        </div>
      </div>

    {/* MOBILE LIST */}
<div className="lg:hidden max-w-7xl mx-auto sm:px-9 px-5 flex flex-col gap-3">
  {SERVICES.map((service) => (
    <div
      key={service.id}
      className="relative w-full overflow-hidden"
      style={{ borderRadius: "0px" }}
    >
      {/* Change height here ↓ */}
      <div className="h-[600px] md:h-[420px] relative w-full overflow-hidden">
        <CardInner service={service} />
      </div>
    </div>
  ))}
</div>

      <div className="pb-16 lg:pb-28" />
    </section>
  );
}
