import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = (delay=0) => ({
  initial:{opacity:0,y:40}, whileInView:{opacity:1,y:0},
  viewport:{once:true,margin:"-80px"}, transition:{duration:0.7,delay,ease:[0.22,1,0.36,1]}
});

const highlights = [
  {value:"30+",label:"Years of combined\nexperience"},
  {value:"1K+",label:"Job completed\nwith pride"},
  {value:"100%",label:"Existing client\nsatisfied"},
];

export default function AboutSection() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <motion.p {...fadeUp(0)} className="text-xs tracking-widest uppercase text-gray-400 mb-5">About Us</motion.p>
        <motion.h2 {...fadeUp(0.1)}
          className="font-display font-extrabold text-[#0a0a0a] leading-tight max-w-2xl"
          style={{fontSize:"clamp(2rem,4vw,3.2rem)"}}>
          We Help Businesses Stand Out With Modern, Creative, and{" "}
          <span className="italic text-gray-400">Impactful</span> Design Solutions
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div {...fadeUp(0.15)} className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3]">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80"
                alt="Team" className="w-full h-full object-cover" loading="lazy"/>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-[#0a0a0a] text-white rounded-2xl px-5 py-4 text-xs font-display font-semibold shadow-xl">
              We've done it before
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="lg:col-span-7 flex flex-col justify-between gap-8">
            <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-[16/7]">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
                alt="Studio" className="w-full h-full object-cover" loading="lazy"/>
            </div>
            <p className="text-gray-500 text-base leading-relaxed max-w-lg">
              Prographr is a creative design agency based in Bangladesh, crafting digital experiences for brands worldwide. From graphic design to full-scale web development, we blend strategy with aesthetics.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {highlights.map((h,i) => (
                <div key={i} className="bg-[#F5F5F5] rounded-xl p-4">
                  <span className="font-display font-extrabold text-[#0a0a0a] text-2xl md:text-3xl">{h.value}</span>
                  <p className="text-gray-500 text-xs mt-1 leading-snug whitespace-pre-line">{h.label}</p>
                </div>
              ))}
            </div>
            <Link to="/about"
              className="inline-flex items-center gap-2 text-[#0a0a0a] font-display font-semibold text-sm group w-fit border-b border-[#0a0a0a] pb-0.5 hover:gap-4 transition-all duration-300">
              Learn more about us <ArrowRight size={14}/>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
