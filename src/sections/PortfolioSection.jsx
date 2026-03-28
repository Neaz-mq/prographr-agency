import { motion } from "framer-motion";
import { ArrowRight, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = (delay=0) => ({
  initial:{opacity:0,y:40}, whileInView:{opacity:1,y:0},
  viewport:{once:true,margin:"-60px"}, transition:{duration:0.7,delay,ease:[0.22,1,0.36,1]}
});

const projects = [
  {title:"Unlimited Design for Solid Startups",category:"Branding",tags:["Logo Design","Brand Identity","Strategy"],image:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",badge:"Update 2.0"},
  {title:"Industrial Photography Campaign",category:"Photography",tags:["Photo Direction","Editing","Print"],image:"https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80"},
  {title:"Modern SaaS Dashboard UI",category:"Web Design",tags:["UI/UX","Figma","Design System"],image:"https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80"},
  {title:"Luxury Brand Identity",category:"Branding",tags:["Identity","Packaging","Print"],image:"https://images.unsplash.com/photo-1636622433525-127afdf3662d?w=600&q=80"},
  {title:"Stationery & Print Design",category:"Print",tags:["Business Cards","Letterhead","Print"],image:"https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&q=80"},
];

export default function PortfolioSection() {
  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.div {...fadeUp(0)}>
            <h2 className="font-display font-extrabold text-[#0a0a0a] leading-tight" style={{fontSize:"clamp(2.4rem,5vw,4rem)"}}>
              Our Previous<br/>Work <Pencil size={28} className="inline mb-2 ml-1 text-gray-400"/>
            </h2>
            <p className="text-gray-400 text-sm mt-2">A showcase of our latest completed works</p>
          </motion.div>
          <motion.div {...fadeUp(0.1)}>
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-[#0a0a0a] font-display font-semibold text-sm border-b border-[#0a0a0a] pb-0.5 hover:gap-4 transition-all duration-300 group">
              View All <ArrowRight size={14}/>
            </Link>
          </motion.div>
        </div>

        <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-5 px-5 md:-mx-0 md:px-0">
          {projects.map((p,i) => (
            <motion.div key={i}
              initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}}
              viewport={{once:true}} transition={{duration:0.5,delay:i*0.08}}
              className="group flex-shrink-0 w-[280px] md:w-[320px] cursor-pointer">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy"/>
                {p.badge && <span className="absolute top-3 right-3 bg-[#C8FF00] text-[#0a0a0a] text-xs font-display font-bold px-2.5 py-1 rounded-full">{p.badge}</span>}
              </div>
              <div className="mt-4">
                <p className="text-[#888] text-xs mb-1">{p.category}</p>
                <h3 className="font-display font-bold text-[#0a0a0a] text-sm leading-snug">{p.title}</h3>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {p.tags.map((t,j) => <span key={j} className="text-[10px] text-gray-400 border border-gray-200 rounded-full px-2 py-0.5">{t}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
