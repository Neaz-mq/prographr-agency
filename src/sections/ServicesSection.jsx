import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  HOW THE CUT-OFF WORKS:
  - Hero is h-[100vh] with overflow-visible (so cards can enter its space)
    but its background is clipped by an inner div with overflow-hidden.
  - ServicesSection uses -mt-[half-card-height] to pull cards up so their
    top halves sit inside the hero's visual bounds.
  - The hero's inner overflow-hidden bg clips those card tops — creating
    the "cut off at the hero edge" look from the reference image.
*/

const CARD_HEIGHT = 270; // visual card height
const SHOW_AMOUNT = 130; // how many px of card peek INTO the hero (adjust this)

const cards = [
  /* 0 — Graphic Design — lime */
  {
    id: "c0",
    cx: -155, cy: 10, w: 190, h: CARD_HEIGHT, rotate: -22, zIndex: 2,
    from: { x: -100, y: 120, rotate: -45 },
    render: () => (
      <CardShell className="bg-[#C8FF00]">
        <DotGrid color="#b8ef00" spacing={10} />
        <div className="absolute inset-0 p-5">
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-black/40 mb-2">Service 01</p>
          <p className="text-[28px] font-black leading-tight tracking-tight text-black">
            Graphic<br />Design
          </p>
        </div>
      </CardShell>
    ),
  },

  /* 1 — Web Development — dark */
  {
    id: "c1",
    cx: -55, cy: -15, w: 205, h: CARD_HEIGHT + 20, rotate: -8, zIndex: 4,
    from: { x: -40, y: -130, rotate: -18 },
    render: () => (
      <CardShell className="bg-[#0d0d0d] shadow-[0_24px_64px_rgba(0,0,0,0.4)]">
        <DotGrid color="#1e1e1e" spacing={13} />
        <div className="absolute inset-0 p-5">
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2">Service 02</p>
          <p className="text-[28px] font-black leading-tight tracking-tight text-white">
            Web<br />Development
          </p>
          <div className="absolute top-[46%] left-5 right-5 flex flex-col gap-[7px]">
            {[
              { w: "68%", bg: "#FF6B6B" },
              { w: "48%", bg: "rgba(255,255,255,0.08)" },
              { w: "82%", bg: "rgba(255,255,255,0.08)" },
              { w: "38%", bg: "#C8FF00" },
              { w: "58%", bg: "rgba(255,255,255,0.08)" },
            ].map((l, i) => (
              <div key={i} style={{ width: l.w, height: 2, background: l.bg, borderRadius: 2 }} />
            ))}
          </div>
        </div>
      </CardShell>
    ),
  },

  /* 2 — Web Design — white */
  {
    id: "c2",
    cx: 60, cy: -15, w: 205, h: CARD_HEIGHT + 20, rotate: 6, zIndex: 3,
    from: { x: 40, y: -130, rotate: 16 },
    render: () => (
      <CardShell className="bg-[#f8f8f8] shadow-[0_20px_56px_rgba(0,0,0,0.13)]">
        <div className="absolute inset-0 p-5">
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-black/25 mb-2">Service 03</p>
          <p className="text-[28px] font-black leading-tight tracking-tight text-black">
            Web<br />Design
          </p>
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

  /* 3 — PowerPoint Design — pink-purple gradient */
  {
    id: "c3",
    cx: 165, cy: 10, w: 190, h: CARD_HEIGHT, rotate: 20, zIndex: 2,
    from: { x: 100, y: 110, rotate: 44 },
    render: () => (
      <CardShell
        className="shadow-[0_16px_48px_rgba(168,85,247,0.35)]"
        style={{ background: "linear-gradient(145deg,#a855f7,#ec4899)" }}
      >
        <LinePattern color="rgba(255,255,255,0.1)" />
        <div className="absolute inset-0 p-5">
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/50 mb-2">Service 04</p>
          <p className="text-[28px] font-black leading-tight tracking-tight text-white">
            PowerPoint<br />Design
          </p>
          <div className="absolute top-[46%] left-5 right-5 flex flex-col gap-2">
            {[88, 62, 78, 44, 68].map((w, i) => (
              <div
                key={i}
                className="rounded-full"
                style={{ width: `${w}%`, height: 5, background: i === 0 ? "#fff" : "rgba(255,255,255,0.25)" }}
              />
            ))}
          </div>
        </div>
      </CardShell>
    ),
  },
];

/* ── card shell ─────────────────────────────────────────────── */
function CardShell({ className = "", style = {}, children }) {
  return (
    <div
      className={`w-full h-full rounded-xl overflow-hidden relative shadow-[0_12px_40px_rgba(0,0,0,0.15)] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

/* ── pattern helpers ────────────────────────────────────────── */
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

/* ── main section ───────────────────────────────────────────── */
export default function ServicesSection() {
  const clusterRef = useRef(null);
  const cardRefs   = useRef([]);

  useEffect(() => {
    const els = cardRefs.current.filter(Boolean);

    els.forEach((el, i) => {
      const c = cards[i];
      gsap.set(el, { x: c.from.x, y: c.from.y, rotation: c.from.rotate, opacity: 0 });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: clusterRef.current,
        start: "top 95%",
        toggleActions: "play none none none",
      },
    });

    els.forEach((el, i) => {
      const c = cards[i];
      tl.to(el, { x: 0, y: 0, rotation: c.rotate, opacity: 1, duration: 1.1, ease: "expo.out" }, i * 0.09);
    });

    return () => tl.kill();
  }, []);

  return (
    /*
      Negative margin = CARD_HEIGHT - SHOW_AMOUNT
      This pulls the section up so only SHOW_AMOUNT px of each card
      sits below the hero edge — the rest is clipped by the hero's
      inner overflow-hidden background wrapper.
    */
    <section
      className="relative z-10 bg-transparent"
      style={{ marginTop: -(CARD_HEIGHT - SHOW_AMOUNT) }}
    >
      {/* fan cluster */}
      <div
        ref={clusterRef}
        className="relative w-full flex items-end justify-center overflow-visible z-10"
        style={{ height: CARD_HEIGHT }}
      >
        {cards.map((card, i) => (
          <div
            key={card.id}
            ref={el => (cardRefs.current[i] = el)}
            className="absolute bottom-0"
            style={{
              left: "50%",
              marginLeft: card.cx - card.w / 2,
              marginBottom: card.cy,
              width: card.w,
              height: card.h,
              zIndex: card.zIndex,
              willChange: "transform",
              transformOrigin: "50% 100%",
            }}
          >
            {card.render()}
          </div>
        ))}
      </div>
    </section>
  );
}