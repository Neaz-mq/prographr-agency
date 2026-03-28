import { motion } from "framer-motion";
import { Palette, Code2, TrendingUp, Presentation, Globe, Layers } from "lucide-react";

const fadeUp = (delay=0) => ({
  initial:{opacity:0,y:40}, whileInView:{opacity:1,y:0},
  viewport:{once:true,margin:"-60px"}, transition:{duration:0.7,delay,ease:[0.22,1,0.36,1]}
});

const services = [
  {icon:Palette,title:"UI/UX Design Services",desc:"Pixel-perfect interfaces that delight users and convert visitors into loyal customers.",count:"01"},
  {icon:Code2,title:"Development Solution",desc:"Fast, scalable websites and web apps built with modern technologies.",count:"02"},
  {icon:TrendingUp,title:"Marketing and Automation",desc:"Strategic marketing solutions that grow your brand and automate your workflows.",count:"03"},
  {icon:Presentation,title:"PowerPoint Design",desc:"Stunning presentations that communicate your brand story with clarity and impact.",count:"04"},
  {icon:Globe,title:"Graphic Design",desc:"From logos to full brand identities — visuals that make your brand unforgettable.",count:"05"},
  {icon:Layers,title:"Brand Strategy",desc:"Strategic brand foundations that guide every design decision you make.",count:"06"},
];

export default function ServicesSection() {
  return (
    <section className="bg-[#111] py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#4F6EF7]/10 blur-3xl pointer-events-none"/>
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div {...fadeUp(0)}>
            <p className="text-xs tracking-widest uppercase text-[#888] mb-4">What We Do</p>
            <h2 className="font-display font-extrabold text-white leading-tight" style={{fontSize:"clamp(2rem,4vw,3.2rem)"}}>
              Built to Scale: Solutions<br/>for Your Evolution
            </h2>
          </motion.div>
          <motion.p {...fadeUp(0.1)} className="text-[#888] text-sm max-w-xs leading-relaxed">
            A showcase of our latest completed works. We deliver quality at every stage.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#222] rounded-2xl overflow-hidden border border-[#222]">
          {services.map((s,i) => {
            const Icon = s.icon;
            return (
              <motion.div key={i} {...fadeUp(i*0.07)}
                className="bg-[#111] p-8 group hover:bg-[#161616] transition-colors duration-300 cursor-pointer">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#C8FF00]/10 group-hover:border-[#C8FF00]/20 transition-colors duration-300">
                    <Icon size={18} className="text-[#888] group-hover:text-[#C8FF00] transition-colors"/>
                  </div>
                  <span className="font-display font-bold text-white/10 text-3xl">{s.count}</span>
                </div>
                <h3 className="font-display font-bold text-white text-base mb-3 leading-snug">{s.title}</h3>
                <p className="text-[#888] text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
