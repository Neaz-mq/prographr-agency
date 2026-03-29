import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col justify-center">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/BG.webp')" }}
      />

      {/* Optional dark overlay to deepen contrast */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 flex flex-col items-center text-center pt-28 pb-24">

        {/* Badge */}
        <motion.div {...fadeUp(0)} className="mb-10">
          <div className="inline-flex items-center gap-2.5 bg-[#1a1a1a]/80 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
            <span className="bg-[#E8490F] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
              5.00
            </span>
            <span className="text-[#ccc] text-sm">
              Our 2026 Design Trends Report is out
            </span>
            <ArrowRight size={13} className="text-[#ccc]" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          {...fadeUp(0.1)}
          className="font-extrabold text-white leading-[1.08] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
        >
          Crafting Digital<br />
          Experiences That Define<br />
          the Future
        </motion.h1>

        {/* Sub text */}
        <motion.p
          {...fadeUp(0.2)}
          className="mt-6 text-[#aaa] text-base md:text-lg max-w-lg leading-relaxed"
        >
          We are a creative design agency helping businesses stand out with
          modern, impactful visual solutions.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-2 bg-white text-[#0a0a0a] font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-[#f0f0f0] transition-colors duration-300"
          >
            View Our Work
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-white font-semibold text-sm px-7 py-3.5 rounded-full border border-white/25 hover:border-white/60 transition-colors duration-300"
          >
            Start a Project
          </Link>
        </motion.div>

      </div>
    </section>
  );
}