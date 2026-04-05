import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CARD_HEIGHT = 270;
const SHOW_AMOUNT = 130;

// ── shared helpers ───────────────────────────────────────────
function CardShell({ className = "", style = {}, children }) {
  return (
    <div className={`w-full h-full rounded-xl overflow-hidden relative shadow-[0_12px_40px_rgba(0,0,0,0.15)] ${className}`} style={style}>
      {children}
    </div>
  );
}

function DotGrid({ color = "#fff", spacing = 14 }) {
  const id = `dg-${color.replace(/[^a-z0-9]/gi, "")}${spacing}`;
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <pattern id={id} x="0" y="0" width={spacing} height={spacing} patternUnits="userSpaceOnUse">
          <circle cx={spacing / 2} cy={spacing / 2} r="1.4" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

function LinePattern({ color = "rgba(255,255,255,0.15)" }) {
  const id = `lp-${color.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <pattern id={id} x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
          <line x1="0" y1="7" x2="14" y2="7" stroke={color} strokeWidth="1.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

// ── desktop fan cards ────────────────────────────────────────
const desktopCards = [
  {
    id: "c0", cx: -155, cy: 10, w: 190, h: CARD_HEIGHT, rotate: -22, zIndex: 2,
    from: { x: -100, y: 120, rotate: -45 },
    render: () => (
      <CardShell className="bg-[#C8FF00]">
        <DotGrid color="#b8ef00" spacing={10} />
        <div className="absolute inset-0 p-5">
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-black/40 mb-2">Service 01</p>
          <p className="text-[28px] font-black leading-tight tracking-tight text-black">Graphic<br />Design</p>
        </div>
      </CardShell>
    ),
  },
  {
    id: "c1", cx: -55, cy: -15, w: 205, h: CARD_HEIGHT + 20, rotate: -8, zIndex: 4,
    from: { x: -40, y: -130, rotate: -18 },
    render: () => (
      <CardShell className="bg-[#0d0d0d] shadow-[0_24px_64px_rgba(0,0,0,0.4)]">
        <DotGrid color="#1e1e1e" spacing={13} />
        <div className="absolute inset-0 p-5">
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2">Service 02</p>
          <p className="text-[28px] font-black leading-tight tracking-tight text-white">Web<br />Development</p>
          <div className="absolute top-[46%] left-5 right-5 flex flex-col gap-[7px]">
            {[{ w: "68%", bg: "#FF6B6B" }, { w: "48%", bg: "rgba(255,255,255,0.08)" }, { w: "82%", bg: "rgba(255,255,255,0.08)" }, { w: "38%", bg: "#C8FF00" }, { w: "58%", bg: "rgba(255,255,255,0.08)" }].map((l, i) => (
              <div key={i} style={{ width: l.w, height: 2, background: l.bg, borderRadius: 2 }} />
            ))}
          </div>
        </div>
      </CardShell>
    ),
  },
  {
    id: "c2", cx: 60, cy: -15, w: 205, h: CARD_HEIGHT + 20, rotate: 6, zIndex: 3,
    from: { x: 40, y: -130, rotate: 16 },
    render: () => (
      <CardShell className="bg-[#f8f8f8] shadow-[0_20px_56px_rgba(0,0,0,0.13)]">
        <div className="absolute inset-0 p-5">
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-black/25 mb-2">Service 03</p>
          <p className="text-[28px] font-black leading-tight tracking-tight text-black">Web<br />Design</p>
          <div className="absolute top-[44%] left-5 right-5">
            <div className="w-full h-[26px] bg-[#eeeeee] rounded-md mb-2.5 flex items-center pl-2 gap-1.5">
              {["#FF6B6B", "#C8FF00", "rgba(0,0,0,0.1)"].map((c, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
              ))}
            </div>
            {[100, 72, 88, 52].map((w, i) => (
              <div key={i} className="h-1 rounded-full bg-black/[0.05] mb-[7px]" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      </CardShell>
    ),
  },
  {
    id: "c3", cx: 165, cy: 10, w: 190, h: CARD_HEIGHT, rotate: 20, zIndex: 2,
    from: { x: 100, y: 110, rotate: 44 },
    render: () => (
      <CardShell className="shadow-[0_16px_48px_rgba(168,85,247,0.35)]" style={{ background: "linear-gradient(145deg,#a855f7,#ec4899)" }}>
        <LinePattern color="rgba(255,255,255,0.1)" />
        <div className="absolute inset-0 p-5">
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/50 mb-2">Service 04</p>
          <p className="text-[28px] font-black leading-tight tracking-tight text-white">PowerPoint<br />Design</p>
          <div className="absolute top-[46%] left-5 right-5 flex flex-col gap-2">
            {[88, 62, 78, 44, 68].map((w, i) => (
              <div key={i} className="rounded-full" style={{ width: `${w}%`, height: 5, background: i === 0 ? "#fff" : "rgba(255,255,255,0.25)" }} />
            ))}
          </div>
        </div>
      </CardShell>
    ),
  },
];

// ── mobile carousel cards ────────────────────────────────────
const mobileCards = [
  {
    id: "m0", label: "Service 01", title: "Graphic\nDesign",
    className: "bg-[#C8FF00]", textColor: "text-black", labelColor: "text-black/40",
    pattern: "dots", patternColor: "#b8ef00",
  },
  {
    id: "m1", label: "Service 02", title: "Web\nDevelopment",
    className: "bg-[#0d0d0d]", textColor: "text-white", labelColor: "text-white/30",
    pattern: "dots", patternColor: "#1e1e1e",
    extra: (
      <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-[6px]">
        {[{ w: "68%", bg: "#FF6B6B" }, { w: "48%", bg: "rgba(255,255,255,0.08)" }, { w: "82%", bg: "rgba(255,255,255,0.08)" }, { w: "38%", bg: "#C8FF00" }].map((l, i) => (
          <div key={i} style={{ width: l.w, height: 2, background: l.bg, borderRadius: 2 }} />
        ))}
      </div>
    ),
  },
  {
    id: "m2", label: "Service 03", title: "Web\nDesign",
    className: "bg-[#f8f8f8]", textColor: "text-black", labelColor: "text-black/25",
    pattern: "none",
    extra: (
      <div className="absolute bottom-6 left-6 right-6">
        <div className="w-full h-[22px] bg-[#eeeeee] rounded-md mb-2 flex items-center pl-2 gap-1.5">
          {["#FF6B6B", "#C8FF00", "rgba(0,0,0,0.1)"].map((c, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
        {[100, 72, 88].map((w, i) => (
          <div key={i} className="h-1 rounded-full bg-black/[0.05] mb-[6px]" style={{ width: `${w}%` }} />
        ))}
      </div>
    ),
  },
  {
    id: "m3", label: "Service 04", title: "PowerPoint\nDesign",
    className: "", textColor: "text-white", labelColor: "text-white/50",
    style: { background: "linear-gradient(145deg,#a855f7,#ec4899)" },
    pattern: "lines",
    extra: (
      <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
        {[88, 62, 78, 44].map((w, i) => (
          <div key={i} className="rounded-full" style={{ width: `${w}%`, height: 4, background: i === 0 ? "#fff" : "rgba(255,255,255,0.25)" }} />
        ))}
      </div>
    ),
  },
];

// ── mobile component ─────────────────────────────────────────
function MobileCarousel() {
  const [current, setCurrent] = useState(0);
  const c = mobileCards[current];

  return (
    <div className="-mt-32 pb-10 px-10">
      {/* overflow-hidden prevents x animation from causing scrollbar */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full h-56 top-4 overflow-hidden  ${c.className}`}
            style={c.style || {}}
          >
            {c.pattern === "dots" && <DotGrid color={c.patternColor} spacing={10} />}
            {c.pattern === "lines" && <LinePattern color="rgba(255,255,255,0.1)" />}
            <div className="absolute inset-0 p-8">
              <p className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-3 ${c.labelColor}`}>{c.label}</p>
              <p className={`text-[30px] font-black leading-tight tracking-tight ${c.textColor}`} style={{ whiteSpace: "pre-line" }}>{c.title}</p>
            </div>
            {c.extra}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-5 mt-6">
        <button
          onClick={() => setCurrent(i => (i - 1 + mobileCards.length) % mobileCards.length)}
          className="w-9 h-9 rounded-full border border-[#ddd] flex items-center justify-center text-[#666] hover:bg-[#0a0a0a] hover:text-white hover:border-[#0a0a0a] transition-all duration-300"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-2">
          {mobileCards.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{ width: i === current ? 20 : 8, backgroundColor: i === current ? "#0a0a0a" : "#ddd" }}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrent(i => (i + 1) % mobileCards.length)}
          className="w-9 h-9 rounded-full border border-[#ddd] flex items-center justify-center text-[#666] hover:bg-[#0a0a0a] hover:text-white hover:border-[#0a0a0a] transition-all duration-300"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ── desktop fan component ────────────────────────────────────
function DesktopFan() {
  const clusterRef = useRef(null);
  const cardRefs   = useRef([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const setScale = () => {
      if (!wrapperRef.current) return;
      const scale = Math.min(1, (window.innerWidth - 16) / 430);
      wrapperRef.current.style.transform = `scale(${scale})`;
      wrapperRef.current.style.transformOrigin = "bottom center";
    };
    setScale();
    window.addEventListener("resize", setScale);
    return () => window.removeEventListener("resize", setScale);
  }, []);

  useEffect(() => {
    const els = cardRefs.current.filter(Boolean);
    els.forEach((el, i) => {
      const c = desktopCards[i];
      gsap.set(el, { x: c.from.x, y: c.from.y, rotation: c.from.rotate, opacity: 0 });
    });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: clusterRef.current, start: "top 95%", toggleActions: "play none none none" },
    });
    els.forEach((el, i) => {
      const c = desktopCards[i];
      tl.to(el, { x: 0, y: 0, rotation: c.rotate, opacity: 1, duration: 1.1, ease: "expo.out" }, i * 0.09);
    });
    return () => tl.kill();
  }, []);

  return (
    <div ref={clusterRef} className="relative w-full flex items-end justify-center" style={{ height: CARD_HEIGHT }}>
      <div ref={wrapperRef} style={{ position: "absolute", bottom: 0, width: 430, height: CARD_HEIGHT + 60 }}>
        {desktopCards.map((card, i) => (
          <div
            key={card.id}
            ref={el => (cardRefs.current[i] = el)}
            style={{
              position: "absolute", bottom: 0, left: "50%",
              marginLeft: card.cx - card.w / 2,
              marginBottom: card.cy,
              width: card.w, height: card.h,
              zIndex: card.zIndex,
              willChange: "transform",
              transformOrigin: "50% 100%",
            }}
          >
            {card.render()}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── main export ──────────────────────────────────────────────
export default function ServicesSection() {
  return (
    <>
      {/* Mobile & Tablet */}
      <div className="lg:hidden bg-white">
        <MobileCarousel />
      </div>

      {/* Desktop */}
      <div
        className="hidden lg:block relative z-10 bg-transparent"
        style={{ marginTop: -(CARD_HEIGHT - SHOW_AMOUNT) }}
      >
        <DesktopFan />
      </div>
    </>
  );
}