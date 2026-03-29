import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  return (
    /*
      The section itself is overflow-visible so ServicesSection cards
      can visually overlap upward into this space.
      The bg image + overlay use a sibling clipping wrapper so they
      stay clipped to the hero bounds while cards pass through.
    */
    <section className="relative h-[100vh] overflow-visible flex flex-col z-0 -mt-10">

      {/* Clipping wrapper — clips only the bg, not the cards */}
      <div className="absolute inset-0 overflow-hidden rounded-none pointer-events-none">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://res.cloudinary.com/dzi3u164c/image/upload/v1774762978/BG_dvaipu.webp')" }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-7xl mx-auto w-full px-6 md:px-10">
        {/* Badge */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
            <span className="bg-[#FF7431] text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              5.00
            </span>
            <span className="text-white text-[12px]">
              Our 2026 Design Trends Report is out
            </span>
            <ArrowRight size={13} className="text-[#ccc]" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          {...fadeUp(0.1)}
          className="font-bold text-white leading-[1.25] text-center"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
        >
          Crafting Digital<br />
          Experiences That Define<br />
          the Future
        </motion.h1>
      </div>
    </section>
  );
}