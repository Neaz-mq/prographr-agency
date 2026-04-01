import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="bg-[#0a0a0a] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}}
          viewport={{once:true}} transition={{duration:0.7,ease:[0.22,1,0.36,1]}}
          className="relative bg-[#111] border border-[#222] rounded-3xl overflow-hidden px-8 md:px-16 py-16 md:py-20 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-[#4F6EF7]/20 blur-3xl pointer-events-none"/>
          <div className="relative z-10">
            <p className="text-xs tracking-widest uppercase text-[#888] mb-5">Let's Collaborate</p>
            <h2 className="font-display font-extrabold text-white leading-tight" style={{fontSize:"clamp(2.2rem,5vw,4.5rem)"}}>
              Ready to Build<br/>Something<br/>
              <span className="text-gradient">Extraordinary?</span>
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/contact"
                className="group inline-flex items-center gap-2 bg-white text-[#0a0a0a] font-display font-semibold text-sm px-8 py-4 rounded-full hover:bg-[#C8FF00] transition-colors duration-300">
                Start a Project <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform"/>
              </Link>
              <Link to="/portfolio"
                className="inline-flex items-center gap-2 text-white font-display font-semibold text-sm px-8 py-4 rounded-full border border-white/20 hover:border-white/40 transition-colors duration-300">
                View Portfolio
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
