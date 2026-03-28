import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = (delay=0) => ({
  initial:{opacity:0,y:40}, whileInView:{opacity:1,y:0},
  viewport:{once:true}, transition:{duration:0.7,delay,ease:[0.22,1,0.36,1]}
});

const stats = [
  {value:"30+",label:"Years Experience"},
  {value:"1K+",label:"Projects Completed"},
  {value:"100%",label:"Client Satisfaction"},
  {value:"50+",label:"Team Members"},
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0a0a0a] overflow-hidden flex flex-col justify-center pt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[#4F6EF7]/20 blur-3xl"/>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8FF00]/5 rounded-full blur-3xl"/>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{backgroundImage:`linear-gradient(rgba(255,255,255,.5)1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5)1px,transparent 1px)`,backgroundSize:"60px 60px"}}/>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10 py-20 md:py-28">
        <motion.div {...fadeUp(0)} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <Sparkles size={12} className="text-[#C8FF00]"/>
            <span className="text-xs text-[#888] tracking-widest uppercase">Crafting Digital Experiences For Tomorrow</span>
          </div>
        </motion.div>

        <motion.h1 {...fadeUp(0.1)}
          className="font-display font-extrabold text-center text-white leading-[1.05] tracking-tight"
          style={{fontSize:"clamp(2.8rem,7vw,6.5rem)"}}>
          Crafting Digital<br/>
          <span className="text-gradient">Experiences That</span><br/>
          Define the Future
        </motion.h1>

        <motion.p {...fadeUp(0.2)}
          className="mt-6 text-center text-[#888] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          We are a creative design agency helping businesses stand out with modern, impactful visual solutions.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/portfolio"
            className="group inline-flex items-center gap-2 bg-white text-[#0a0a0a] font-display font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-[#C8FF00] transition-colors duration-300">
            View Our Work <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform"/>
          </Link>
          <Link to="/contact"
            className="inline-flex items-center gap-2 text-white font-display font-semibold text-sm px-7 py-3.5 rounded-full border border-white/20 hover:border-white/50 transition-colors duration-300">
            Start a Project
          </Link>
        </motion.div>

        <motion.div {...fadeUp(0.4)}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-[#222] rounded-2xl overflow-hidden border border-[#222]">
          {stats.map((s,i) => (
            <div key={i} className="bg-[#111] px-6 py-6 flex flex-col items-center text-center hover:bg-[#161616] transition-colors duration-300">
              <span className="font-display font-extrabold text-white text-3xl md:text-4xl">{s.value}</span>
              <span className="text-[#888] text-xs mt-1.5">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
