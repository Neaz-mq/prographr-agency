import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
});

const services = [
  "Website Design",
  "UI/UX",
  "Web Development",
  "Print",
  "App Design",
  "and many more",
];

export default function Hero() {
  return (
    <div
      id="hero"
      style={{ background: "#182F33" }}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden px-6 md:px-10 3xl:py-10 2xl:py-8 xl:py-8 lg:py-8 md:py-8 py-4"
    >
      <div className="flex flex-col items-center justify-center w-full">
        {/* Badge */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <div className="inline-flex items-center gap-2  px-3 py-1.5 md:px-4 md:py-1.5 ">
            <span className="bg-[#73AC56] text-white text-[12px] md:text-[11px] xl:text-[16px]  px-5 py-1 rounded-xl">
              5.00
            </span>
            <span className="text-white text-[11px] md:text-[12px] xl:text-[16px]">
              Our 2026 Design Trends Report is out
            </span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          {...fadeUp(0.1)}
          className="font-medium text-white tracking-wide text-center leading-[1.65] sm:leading-[1.35] md:leading-[1.45] lg:leading-[1.25] text-[1.7rem] sm:text-[2.8rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4.2rem] 2xl:text-[3.7rem] 3xl:text-[6.2rem]"
        >
          Crafting Digital
          <br />
          Experiences That 
          <br />
         Define the Future
        </motion.h1>

        {/* Service tags */}
        <motion.div
          {...fadeUp(0.22)}
          className="flex flex-wrap items-center justify-center gap-4 mt-14"
        >
          {services.map((service, i) => (
            <span
              key={i}
              className="text-white text-[11px] md:text-[12px] xl:text-[13px] font-medium px-6 py-2 tracking-wide bg-[#324549]"
            >
              {service}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}