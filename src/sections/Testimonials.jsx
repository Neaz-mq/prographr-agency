import { motion } from "framer-motion";
import { Play, Star } from "lucide-react";

const fadeUp = (delay=0) => ({
  initial:{opacity:0,y:40}, whileInView:{opacity:1,y:0},
  viewport:{once:true,margin:"-60px"}, transition:{duration:0.7,delay,ease:[0.22,1,0.36,1]}
});

const testimonials = [
  {name:"Sarah Jenkins",role:"Growing Studio",quote:"Prographr designed our entire brand campaign with such precision and creativity. The results exceeded our expectations.",image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80"},
  {name:"Elena Rodriguez",role:"Tech Company",quote:"Our website redesign was flawless. The team understood our vision and delivered a stunning digital experience.",image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80"},
  {name:"Jessica Wu",role:"E-commerce Brand",quote:"The PowerPoint templates Prographr made for us are used in every investor meeting. Absolutely world class.",image:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80"},
  {name:"David Harrison",role:"Startup Founder",quote:"Working with Prographr felt effortless. They transformed our brand identity in just two weeks.",image:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80"},
];

export default function Testimonials() {
  return (
    <section className="bg-[#0a0a0a] py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <motion.div {...fadeUp(0)}>
            <p className="text-xs tracking-widest uppercase text-[#888] mb-4">Client Stories</p>
            <h2 className="font-display font-extrabold text-white leading-tight" style={{fontSize:"clamp(2rem,4vw,3rem)"}}>
              Success Stories That<br/>Inspire Us
            </h2>
          </motion.div>
        </div>

        <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-5 px-5 md:-mx-0 md:px-0">
          {testimonials.map((t,i) => (
            <motion.div key={i}
              initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}}
              viewport={{once:true}} transition={{duration:0.5,delay:i*0.08}}
              className="group flex-shrink-0 w-[280px] md:w-[300px] bg-[#161616] border border-[#222] rounded-2xl overflow-hidden">
              <div className="relative aspect-[4/3] bg-gray-800 overflow-hidden">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" loading="lazy"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"/>
                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Play size={16} className="text-white fill-white ml-0.5"/>
                </button>
              </div>
              <div className="p-5">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_,j) => <Star key={j} size={11} className="text-[#C8FF00] fill-[#C8FF00]"/>)}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4">"{t.quote}"</p>
                <p className="text-white font-display font-semibold text-sm">{t.name}</p>
                <p className="text-[#888] text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
