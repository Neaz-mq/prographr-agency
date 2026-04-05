import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

const LEFT_INDENT = "max(36px, calc((100vw - 80rem) / 2 + 2.5rem))";

const ITEMS = [
  {
    id: 1,
    label: "Trading Guide",
    image:
      "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775284370/photo-1611974789855-9c2a0a7236a3_wlenof.avif",
  },
  {
    id: 2,
    label: "Project Consultation",
    image:
      "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775284412/photo-1552664730-d307ca884978_ky9tnk.avif",
  },
  {
    id: 3,
    label: "Project layout ready",
    image:
      "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775284446/photo-1561070791-2526d30994b5_nf8hth.avif",
  },
  {
    id: 4,
    label: "Final Touch",
    image:
      "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775284522/photo-1586281380349-632531db7ed4_qfatkj.avif",
  },
];

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IMG_W = 280;
const IMG_H = 160;

function ValueItem({ item, setImgRef, setMobileImgRef, setArrowRef, onEnter, onLeave }) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative flex items-center justify-between gap-8 py-3 lg:py-10 cursor-pointer border-b border-black/10 last:border-b-0"
    >
      <span
        className="text-black transition-colors duration-300 group-hover:text-black/50 select-none shrink-0 flex-1 min-w-0"
        style={{ fontSize: "clamp(16px, 2.4vw, 22px)" }}
      >
        {item.label}
      </span>
      <div
        ref={setImgRef}
        className="absolute pointer-events-none overflow-hidden z-10 hidden lg:block"
        style={{ width: `${IMG_W}px`, height: `${IMG_H}px`, right: "clamp(60px, 10vw, 160px)", top: "50%", transform: "translateY(-50%)" }}
      >
        <img src={item.image} alt={item.label} className="w-full h-full object-cover object-center" loading="lazy" />
      </div>
      <div
        ref={setMobileImgRef}
        className="mobile-thumb shrink-0 overflow-hidden lg:hidden"
        style={{ width: "120px", height: "80px", opacity: 0, transform: "translateY(6px)" }}
      >
        <img src={item.image} alt={item.label} className="w-full h-full object-cover object-center" loading="lazy" />
      </div>
      <span ref={setArrowRef} className="text-black/30 group-hover:text-black transition-colors duration-300 shrink-0">
        <ArrowIcon />
      </span>
    </div>
  );
}

export default function ValueSection() {
  const headingRef = useRef(null);
  const listRef = useRef(null);
  const imgNodes = useRef([]);
  const mobileImgNodes = useRef([]);
  const arrowNodes = useRef([]);
  const activeIdx = useRef(0);
  const tls = useRef([]);

  const showImage = useCallback((idx) => {
    if (tls.current[idx]) tls.current[idx].kill();
    tls.current[idx] = gsap.to(imgNodes.current[idx], { clipPath: "inset(0% 0% 0% 0%)", scale: 1, opacity: 1, duration: 0.55, ease: "power3.out" });
  }, []);

  const hideImage = useCallback((idx) => {
    if (tls.current[idx]) tls.current[idx].kill();
    tls.current[idx] = gsap.to(imgNodes.current[idx], { clipPath: "inset(100% 0% 0% 0%)", scale: 1.08, opacity: 0, duration: 0.4, ease: "power3.in" });
  }, []);

  const nudgeArrow = useCallback((idx, enter) => {
    gsap.to(arrowNodes.current[idx], { x: enter ? 4 : 0, y: enter ? -4 : 0, duration: enter ? 0.25 : 0.2, ease: enter ? "power2.out" : "power2.in" });
  }, []);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    ITEMS.forEach((_, i) => {
      if (isDesktop) {
        gsap.set(imgNodes.current[i], {
          clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
          scale: i === 0 ? 1 : 1.08,
          opacity: i === 0 ? 1 : 0,
        });
      }
      gsap.set(arrowNodes.current[i], { x: 0, y: 0 });
    });

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, { y: 40, opacity: 0, duration: 1, ease: "power3.out", delay: 0.1 });
      gsap.from(listRef.current.children, { y: 24, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.12, delay: 0.35 });
      if (!isDesktop) {
        gsap.to(mobileImgNodes.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1, delay: 0.55 });
      }
    });
    return () => ctx.revert();
  }, []);

  const handleEnter = useCallback((idx) => {
    if (window.innerWidth < 1024) return;
    const prev = activeIdx.current;
    if (prev === idx) return;
    hideImage(prev); nudgeArrow(prev, false);
    showImage(idx);  nudgeArrow(idx, true);
    activeIdx.current = idx;
  }, [hideImage, showImage, nudgeArrow]);

  const handleLeave = useCallback((idx) => {
    if (window.innerWidth < 1024) return;
    nudgeArrow(idx, false);
  }, [nudgeArrow]);

  const handleListLeave = useCallback(() => {
    if (window.innerWidth < 1024) return;
    const prev = activeIdx.current;
    if (prev !== 0) { hideImage(prev); nudgeArrow(prev, false); showImage(0); activeIdx.current = 0; }
  }, [hideImage, showImage, nudgeArrow]);

  return (
    // ✅ position:relative is all that's needed — later DOM sibling
    // naturally paints above TechnologySection's sticky cards
    <section className="w-full bg-white" style={{ position: "relative" }}>
      <div className="py-14 lg:py-16" style={{ paddingLeft: LEFT_INDENT, paddingRight: LEFT_INDENT }}>
        <h2
          ref={headingRef}
          className="font-extrabold text-black leading-[1.2] tracking-[-2px] mb-10 lg:mb-20 text-[48px] md:text-[64px] lg:text-[70px] xl:text-[70px] 2xl:text-[64px]"
        >
          What value
          <br />are you
          <br />getting
          <br />from us?
        </h2>
        <div ref={listRef} className="border-t border-black/10" onMouseLeave={handleListLeave}>
          {ITEMS.map((item, i) => (
            <ValueItem
              key={item.id}
              item={item}
              index={i}
              setImgRef={(el) => { imgNodes.current[i] = el; }}
              setMobileImgRef={(el) => { mobileImgNodes.current[i] = el; }}
              setArrowRef={(el) => { arrowNodes.current[i] = el; }}
              onEnter={() => handleEnter(i)}
              onLeave={() => handleLeave(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}