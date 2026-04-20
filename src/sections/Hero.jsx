import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const outerRef = useRef(null);
  const stickyRef = useRef(null);
  const logoRef = useRef(null);
  const contentRef = useRef(null);
  const squareRef = useRef(null);
  const revealTextRef = useRef(null);

  const bgRef = useRef(null);
  const overlayRef = useRef(null);
  const scanLineRef = useRef(null);
  const gridRef = useRef(null);
  const glowRingRef = useRef(null);
  const cornerTLRef = useRef(null);
  const cornerTRRef = useRef(null);
  const cornerBLRef = useRef(null);
  const cornerBRRef = useRef(null);
  const chromaRedRef = useRef(null);
  const chromaBlueRef = useRef(null);
  const noiseFlashRef = useRef(null);
  const labelTopRef = useRef(null);
  const labelBottomRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const logo = logoRef.current;
    const content = contentRef.current;
    const square = squareRef.current;
    const revealText = revealTextRef.current;
    const bg = bgRef.current;
    const overlay = overlayRef.current;
    const scanLine = scanLineRef.current;
    const grid = gridRef.current;
    const glowRing = glowRingRef.current;
    const cornerTL = cornerTLRef.current;
    const cornerTR = cornerTRRef.current;
    const cornerBL = cornerBLRef.current;
    const cornerBR = cornerBRRef.current;
    const chromaRed = chromaRedRef.current;
    const chromaBlue = chromaBlueRef.current;
    const noiseFlash = noiseFlashRef.current;
    const labelTop = labelTopRef.current;
    const labelBottom = labelBottomRef.current;

    if (!outer || !logo || !square || !revealText) return;

    // Set all initial states immediately (no timeout) to prevent flash
    gsap.set(square, { opacity: 0 });
    gsap.set(revealText, { opacity: 0, y: 40 });
    gsap.set(scanLine, { scaleX: 0, opacity: 0, top: "0%" });
    gsap.set(grid, { opacity: 0 });
    gsap.set(glowRing, { scale: 0.2, opacity: 0 });
    gsap.set([cornerTL, cornerTR, cornerBL, cornerBR], { opacity: 0, scale: 0 });
    gsap.set([chromaRed, chromaBlue], { opacity: 0, x: 0 });
    gsap.set(noiseFlash, { opacity: 0 });
    gsap.set(labelTop, { opacity: 0, y: -20 });
    gsap.set(labelBottom, { opacity: 0, y: 20 });

    const timer = setTimeout(() => {
      const logoRect = logo.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const phase1Scale = Math.min(
        (vw * 0.55) / logoRect.width,
        (vh * 0.55) / logoRect.height
      );
      const phase2Scale = Math.max(
        (vw / logoRect.width) * 1.4,
        (vh / logoRect.height) * 1.4
      );

      const logoCX = logoRect.left + logoRect.width / 2;
      const logoCY = logoRect.top + logoRect.height / 2;
      const tx = vw / 2 - logoCX;
      const ty = vh / 2 - logoCY;

      gsap.set(logo, {
        transformOrigin: "center center",
        x: 0, y: 0, scale: 1, opacity: 1,
      });
      gsap.set(square, {
        opacity: 0,
        width: logoRect.width,
        height: logoRect.height,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      tl
        // Phase 0 (0–0.08): hero text fades out, grid appears
        .to(content, { opacity: 0, y: -60, ease: "power2.in" }, 0)
        .to(grid, { opacity: 1, ease: "none" }, 0)

        // Phase 1 (0.02–0.25): logo moves to center + chromatic split
        .to(logo, { scale: phase1Scale, x: tx, y: ty, ease: "power2.out" }, 0.02)
        .to(chromaRed, { opacity: 0.6, x: -18, ease: "power2.out" }, 0.04)
        .to(chromaBlue, { opacity: 0.6, x: 18, ease: "power2.out" }, 0.04)

        // Phase 1.5 (0.18–0.30): scan line sweeps
        .to(scanLine, { opacity: 1, scaleX: 1, ease: "power3.out", duration: 0.06 }, 0.18)
        .to(scanLine, { top: "100%", ease: "none", duration: 0.10 }, 0.20)
        .to(scanLine, { opacity: 0, duration: 0.03 }, 0.30)

        // Phase 2 (0.25–0.35): chroma snaps back, glow ring erupts
        .to([chromaRed, chromaBlue], { opacity: 0, x: 0, ease: "power4.in" }, 0.25)
        .to(glowRing, { scale: 3.5, opacity: 0.6, ease: "power2.out" }, 0.26)
        .to(glowRing, { scale: 8, opacity: 0, ease: "power1.in" }, 0.33)

        // Phase 2.5 (0.32–0.47): logo blasts to fill + noise flash
        .to(logo, { scale: phase2Scale, opacity: 0, ease: "power3.in" }, 0.32)
        .to(bg, { scale: 1.08, ease: "power2.out" }, 0.32)
        .to(overlay, { background: "rgba(0,0,0,0.80)", ease: "none" }, 0.38)
        .to(noiseFlash, { opacity: 0.08, ease: "none", duration: 0.03 }, 0.44)
        .to(noiseFlash, { opacity: 0, ease: "none", duration: 0.03 }, 0.47)

        // Phase 3 (0.50–0.65): card expands
        .to(square, { opacity: 1, ease: "none", duration: 0.01 }, 0.50)
        .to(square, {
          width: "min(84vw, 860px)",
          height: "min(74vh, 540px)",
          ease: "power4.out",
          duration: 0.15,
        }, 0.51)

        // Phase 3.5 (0.60–0.66): viewport corner brackets snap in
        .to(cornerTL, { opacity: 1, scale: 1, ease: "back.out(2)" }, 0.60)
        .to(cornerTR, { opacity: 1, scale: 1, ease: "back.out(2)" }, 0.62)
        .to(cornerBL, { opacity: 1, scale: 1, ease: "back.out(2)" }, 0.64)
        .to(cornerBR, { opacity: 1, scale: 1, ease: "back.out(2)" }, 0.66)

        // Phase 4 (0.68–0.78): HUD labels + card content
        .to(labelTop, { opacity: 1, y: 0, ease: "power3.out" }, 0.68)
        .to(labelBottom, { opacity: 1, y: 0, ease: "power3.out" }, 0.70)
        .to(revealText, { opacity: 1, y: 0, ease: "power3.out" }, 0.78);

    }, 150);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={outerRef} style={{ height: "300vh" }}>
      <div
        ref={stickyRef}
        id="hero"
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
      >
        {/* ── Background ── */}
        <div
          ref={bgRef}
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dzi3u164c/image/upload/v1774762978/BG_dvaipu.webp')",
            position: "absolute", inset: 0, zIndex: 0,
            backgroundSize: "cover", backgroundPosition: "center",
            transformOrigin: "center center",
          }}
        />
        <div
          ref={overlayRef}
          style={{
            position: "absolute", inset: 0,
            background: "rgba(0,0,0,0.30)",
            zIndex: 1,
          }}
        />

        {/* ── Cinematic grid — hidden until scroll ── */}
        <div
          ref={gridRef}
          style={{
            position: "absolute", inset: 0, zIndex: 2,
            pointerEvents: "none",
            opacity: 0,                             // ← hidden on load
            backgroundImage: `
              linear-gradient(rgba(255,116,49,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,116,49,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* ── Noise flash — hidden until scroll ── */}
        <div
          ref={noiseFlashRef}
          style={{
            position: "absolute", inset: 0, zIndex: 3,
            pointerEvents: "none",
            opacity: 0,                             // ← hidden on load
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "150px 150px",
          }}
        />

        {/* ── Glow ring — hidden until scroll ── */}
        <div
          ref={glowRingRef}
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%) scale(0.2)",
            width: 80, height: 80,
            borderRadius: "50%",
            border: "1.5px solid rgba(255,116,49,0.8)",
            boxShadow: "0 0 40px rgba(255,116,49,0.4), inset 0 0 40px rgba(255,116,49,0.1)",
            zIndex: 6, pointerEvents: "none",
            transformOrigin: "center center",
            opacity: 0,                             // ← hidden on load
          }}
        />

        {/* ── Scan line — hidden until scroll ── */}
        <div
          ref={scanLineRef}
          style={{
            position: "absolute", left: 0, right: 0,
            height: 2, top: "0%",
            background: "linear-gradient(90deg, transparent, #FF7431 20%, #fff 50%, #FF7431 80%, transparent)",
            boxShadow: "0 0 20px rgba(255,116,49,0.9), 0 0 60px rgba(255,116,49,0.3)",
            zIndex: 7, pointerEvents: "none",
            transformOrigin: "left center",
            opacity: 0,                             // ← hidden on load
            transform: "scaleX(0)",                 // ← collapsed on load
          }}
        />

        {/* ── Viewport corner brackets — hidden until scroll ── */}
        <div ref={cornerTLRef} style={{
          position: "absolute", top: 24, left: 24, zIndex: 8,
          pointerEvents: "none", transformOrigin: "top left",
          opacity: 0,                               // ← hidden on load
        }}>
          <div style={{ width: 32, height: 32, borderTop: "1.5px solid #FF7431", borderLeft: "1.5px solid #FF7431" }} />
        </div>

        <div ref={cornerTRRef} style={{
          position: "absolute", top: 24, right: 24, zIndex: 8,
          pointerEvents: "none", transformOrigin: "top right",
          opacity: 0,                               // ← hidden on load
        }}>
          <div style={{ width: 32, height: 32, borderTop: "1.5px solid #FF7431", borderRight: "1.5px solid #FF7431" }} />
        </div>

        <div ref={cornerBLRef} style={{
          position: "absolute", bottom: 24, left: 24, zIndex: 8,
          pointerEvents: "none", transformOrigin: "bottom left",
          opacity: 0,                               // ← hidden on load
        }}>
          <div style={{ width: 32, height: 32, borderBottom: "1.5px solid #FF7431", borderLeft: "1.5px solid #FF7431" }} />
        </div>

        <div ref={cornerBRRef} style={{
          position: "absolute", bottom: 24, right: 24, zIndex: 8,
          pointerEvents: "none", transformOrigin: "bottom right",
          opacity: 0,                               // ← hidden on load
        }}>
          <div style={{ width: 32, height: 32, borderBottom: "1.5px solid #FF7431", borderRight: "1.5px solid #FF7431" }} />
        </div>

        {/* ── HUD labels — hidden until scroll ── */}
        <div ref={labelTopRef} style={{
          position: "absolute", top: 28, left: "50%",
          transform: "translateX(-50%) translateY(-20px)",
          zIndex: 8, pointerEvents: "none",
          fontSize: 9, fontWeight: 700, letterSpacing: "0.3em",
          textTransform: "uppercase", color: "rgba(255,116,49,0.5)",
          whiteSpace: "nowrap",
          opacity: 0,                               // ← hidden on load
        }}>
          PROGRAPHR · SYSTEM BOOT · 2026
        </div>

        <div ref={labelBottomRef} style={{
          position: "absolute", bottom: 28, left: "50%",
          transform: "translateX(-50%) translateY(20px)",
          zIndex: 8, pointerEvents: "none",
          fontSize: 9, fontWeight: 700, letterSpacing: "0.3em",
          textTransform: "uppercase", color: "rgba(255,116,49,0.5)",
          whiteSpace: "nowrap",
          opacity: 0,                               // ← hidden on load
        }}>
          EST. 2020 · DIGITAL AGENCY · 00:00
        </div>

        {/* ── Chromatic aberration layers — hidden until scroll ── */}
        <div
          ref={chromaRedRef}
          style={{
            position: "fixed",
            bottom: "2.5rem", right: "2.5rem",
            height: "clamp(40px, 5vw, 64px)",
            zIndex: 19, pointerEvents: "none",
            mixBlendMode: "screen",
            opacity: 0,                             // ← hidden on load
          }}
        >
          <img
            src="/logo.webp"
            alt=""
            style={{
              height: "clamp(40px, 5vw, 64px)", width: "auto",
              filter: "sepia(1) saturate(10) hue-rotate(-40deg) brightness(1.5)",
              display: "block",
            }}
          />
        </div>

        <div
          ref={chromaBlueRef}
          style={{
            position: "fixed",
            bottom: "2.5rem", right: "2.5rem",
            height: "clamp(40px, 5vw, 64px)",
            zIndex: 19, pointerEvents: "none",
            mixBlendMode: "screen",
            opacity: 0,                             // ← hidden on load
          }}
        >
          <img
            src="/logo.webp"
            alt=""
            style={{
              height: "clamp(40px, 5vw, 64px)", width: "auto",
              filter: "sepia(1) saturate(10) hue-rotate(200deg) brightness(1.5)",
              display: "block",
            }}
          />
        </div>

        {/* ── PREMIUM REVEAL CARD — hidden until scroll ── */}
        <div
          ref={squareRef}
          style={{
            position: "absolute",
            zIndex: 15,
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "stretch",
            overflow: "hidden",
            willChange: "width, height, opacity",
            opacity: 0,                             // ← hidden on load
            boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 32px 80px rgba(0,0,0,0.7), 0 0 120px rgba(255,116,49,0.08)",
          }}
        >
          {/* Noise texture */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
            pointerEvents: "none",
          }} />

          {/* Grid lines */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }} />

          {/* Corner accent top-left */}
          <div style={{
            position: "absolute", top: 0, left: 0, zIndex: 5,
            width: 60, height: 60,
            borderTop: "1px solid rgba(255,116,49,0.5)",
            borderLeft: "1px solid rgba(255,116,49,0.5)",
          }} />

          {/* Corner accent bottom-right */}
          <div style={{
            position: "absolute", bottom: 0, right: 0, zIndex: 5,
            width: 60, height: 60,
            borderBottom: "1px solid rgba(255,116,49,0.5)",
            borderRight: "1px solid rgba(255,116,49,0.5)",
          }} />

          {/* Orange top bar */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: 2, zIndex: 5,
            background: "linear-gradient(90deg, transparent, #FF7431 30%, #FF7431 70%, transparent)",
            opacity: 0.7,
          }} />

          {/* Card content */}
          <div
            ref={revealTextRef}
            style={{
              position: "relative", zIndex: 10,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-between",
              padding: "clamp(2rem, 5vw, 3.5rem)",
              willChange: "opacity, transform",
              opacity: 0,                           // ← hidden on load
              background: "linear-gradient(135deg, #0a0a0a 0%, #111116 50%, #0d0d12 100%)",
            }}
          >
            {/* Top row */}
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between",
              width: "100%", marginBottom: "auto",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#FF7431",
                  boxShadow: "0 0 8px rgba(255,116,49,0.8)",
                }} />
                <span style={{
                  fontSize: "clamp(9px, 1vw, 11px)",
                  fontWeight: 700, letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                }}>
                  Est. 2020 · Digital Agency
                </span>
              </div>
              <span style={{
                fontSize: "clamp(9px, 1vw, 11px)",
                fontWeight: 700, letterSpacing: "0.15em",
                color: "rgba(255,255,255,0.2)",
              }}>
                ©&nbsp;2026
              </span>
            </div>

            {/* Center headline */}
            <div style={{
              flex: 1, display: "flex",
              alignItems: "center", justifyContent: "center",
              width: "100%",
              padding: "clamp(1.5rem, 4vh, 3rem) 0",
            }}>
              <h2 style={{
                color: "#ffffff",
                fontSize: "clamp(1.8rem, 4.2vw, 3.6rem)",
                fontWeight: 700, lineHeight: 1.08,
                margin: 0, letterSpacing: "-0.04em",
                textAlign: "left", maxWidth: "100%",
              }}>
                <span style={{ display: "block", color: "rgba(255,255,255,0.92)" }}>
                  Crafting Digital
                </span>
                <span style={{ display: "block", color: "rgba(255,255,255,0.92)" }}>
                  Experiences That
                </span>
                <span style={{
                  display: "inline-flex", alignItems: "center",
                  gap: "0.4em", color: "rgba(255,255,255,0.92)",
                }}>
                  Define the{" "}
                  <span style={{ color: "#FF7431", fontStyle: "italic", fontWeight: 800 }}>
                    Future
                  </span>
                </span>
              </h2>
            </div>

            {/* Bottom row */}
            <div style={{
              display: "flex", alignItems: "flex-end",
              justifyContent: "space-between",
              width: "100%", gap: "2rem",
            }}>
              <p style={{
                fontSize: "clamp(10px, 1.1vw, 13px)",
                color: "rgba(255,255,255,0.35)",
                lineHeight: 1.6, maxWidth: 280,
                margin: 0, letterSpacing: "0.01em",
              }}>
                We design, build and launch digital products that move people — and businesses forward.
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.15)" }} />
                  <span style={{
                    fontSize: 8, fontWeight: 700, letterSpacing: "0.2em",
                    textTransform: "uppercase", color: "rgba(255,255,255,0.2)",
                    writingMode: "vertical-rl",
                  }}>scroll</span>
                </div>
                <button style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "10px 22px",
                  background: "#FF7431", border: "none",
                  color: "#000",
                  fontSize: "clamp(10px, 1vw, 12px)",
                  fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", cursor: "pointer",
                  transition: "background 0.2s",
                }}>
                  Let's Talk
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Logo — fixed position, drives scroll animation ── */}
        <img
          ref={logoRef}
          src="/logo.webp"
          alt=""
          style={{
            position: "fixed",
            bottom: "2.5rem", right: "2.5rem",
            height: "clamp(40px, 5vw, 64px)",
            width: "auto", objectFit: "contain",
            zIndex: 20, willChange: "transform, opacity",
            display: "block", pointerEvents: "none",
          }}
        />

        {/* ── Initial hero content ── */}
        <div
          ref={contentRef}
          style={{ position: "relative", zIndex: 10, willChange: "opacity, transform" }}
          className="flex flex-col items-center justify-center w-full h-full px-6 md:px-10"
        >
          <motion.div {...fadeUp(0)} className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1.5 md:px-4 md:py-1.5 backdrop-blur-sm">
              <span className="bg-[#FF7431] text-black text-[12px] md:text-[11px] xl:text-[13px] font-medium px-2.5 py-0.5 rounded-full">
                5.00
              </span>
              <span className="text-white text-[11px] md:text-[12px] xl:text-[13px]">
                Our 2026 Design Trends Report is out
              </span>
              <ArrowRight size={16} className="text-[#ccc]" />
            </div>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-medium text-white tracking-wide text-center leading-[1.65] sm:leading-[1.35] md:leading-[1.45] lg:leading-[1.25] text-[1.7rem] sm:text-[2.8rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4.2rem] 2xl:text-[3.7rem] 3xl:text-[4.8rem]"
          >
            Crafting Digital
            <br />
            Experiences That Define
            <br />
            the Future
          </motion.h1>
        </div>
      </div>
    </div>
  );
}