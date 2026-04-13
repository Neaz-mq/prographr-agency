import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  return (
    <section className="relative h-[100vh] overflow-visible flex flex-col z-0">
      {/* Clipping wrapper */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dzi3u164c/image/upload/v1774762978/BG_dvaipu.webp')",
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center  mx-auto w-full px-6 md:px-10 3xl:-top-10 2xl:-top-5 xl:-top-16 lg:-top-10 md:-top-14 -top-7">
        <motion.div {...fadeUp(0)} className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white/5 3xl:px-6 3xl:py-3 2xl:px-4 2xl:py-1.5 xl:px-4 xl:py-1.5 lg:px-4 lg:py-1.5 md:px-4 md:py-1.5 px-3 py-1.5 backdrop-blur-sm">
            <span className="bg-[#FF7431] text-black 3xl:text-[16px] 2xl:text-[11px] xl:text-[13px] lg:text-[12px] md:text-[13px] text-[12px] font-medium 3xl:px-2.8 3xl:py-0.8 2xl:px-2.5 2xl:py-0.5 xl:px-2.5 xl:py-0.5 lg:px-2.5 lg:py-0.5 md:px-2.5 md:py-0.5 px-2.5 py-0.5 rounded-full">
              5.00
            </span>
            <span className="text-white 3xl:text-[18px] 2xl:text-[12px] xl:text-[13px] lg:text-[13px] md:text-[13px] text-[11px]">
              Our 2026 Design Trends Report is out
            </span>
            <ArrowRight size={16} className="text-[#ccc]" />
          </div>
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          className="font-medium text-white tracking-wide leading-[1.65] sm:leading-[1.35] 3xl:leading-[1.25] 2xl:leading-[1.25] xl:leading-[1.25] lg:leading-[1.25] md:leading-[1.45] text-center text-[1.7rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.5rem] xl:text-[4.2rem] 2xl:text-[3.7rem] 3xl:text-[4.8rem]"
        >
          Crafting Digital
          <br />
          Experiences That Define
          <br />
          the Future
        </motion.h1>
      </div>
    </section>
  );
}
