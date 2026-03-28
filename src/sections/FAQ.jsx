import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const fadeUp = (delay=0) => ({
  initial:{opacity:0,y:40}, whileInView:{opacity:1,y:0},
  viewport:{once:true,margin:"-60px"}, transition:{duration:0.7,delay,ease:[0.22,1,0.36,1]}
});

const faqs = [
  {q:"Trading Guide",a:"Our design process starts with a deep discovery session. We learn your brand, your audience, and your goals — then craft a visual strategy tailored specifically for you.",hasPreview:true},
  {q:"Project Consultation",a:"Every project begins with a free consultation call where we align on scope, timeline, and deliverables."},
  {q:"Project Layout Ready",a:"Once the brief is finalized, we provide a detailed project layout including milestones, deliverables, and revision rounds."},
  {q:"Final Touch",a:"Before delivery, every project goes through our internal quality review. We obsess over every pixel, ensuring the final output exceeds client expectations."},
];

function FaqItem({item,index,isOpen,toggle}) {
  return (
    <motion.div {...fadeUp(index*0.07)} className="border-b border-gray-200 last:border-0">
      <button onClick={toggle} className="w-full flex items-center justify-between py-5 text-left group">
        <div className="flex items-center gap-4">
          {item.hasPreview && <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex-shrink-0"/>}
          <span className="font-display font-semibold text-[#0a0a0a] text-base group-hover:text-gray-600 transition-colors">{item.q}</span>
        </div>
        {isOpen ? <Minus size={16} className="text-[#0a0a0a] flex-shrink-0 ml-4"/> : <Plus size={16} className="text-gray-400 flex-shrink-0 ml-4"/>}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}}
            exit={{height:0,opacity:0}} transition={{duration:0.3,ease:"easeInOut"}} className="overflow-hidden">
            <p className="pb-5 text-gray-500 text-sm leading-relaxed max-w-2xl">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex,setOpenIndex] = useState(0);
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div {...fadeUp(0)}>
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">FAQ</p>
            <h2 className="font-display font-extrabold text-[#0a0a0a] leading-tight" style={{fontSize:"clamp(2.2rem,4.5vw,3.8rem)"}}>
              What value<br/>are you<br/>getting from<br/>us?
            </h2>
            <p className="mt-6 text-gray-500 text-sm leading-relaxed max-w-xs">We believe in transparency. Here's exactly what you get when you work with Prographr.</p>
            <motion.div {...fadeUp(0.2)} className="mt-10 bg-[#0a0a0a] rounded-2xl p-6 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#161616] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="font-display font-bold text-white text-sm">P</span>
              </div>
              <div>
                <p className="text-white font-display font-semibold text-sm">Premium Print Templates</p>
                <p className="text-[#888] text-xs mt-0.5">for Growing Brands</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div {...fadeUp(0.15)}>
            <div className="divide-y divide-gray-200 border-t border-gray-200">
              {faqs.map((item,i) => (
                <FaqItem key={i} item={item} index={i} isOpen={openIndex===i} toggle={()=>setOpenIndex(openIndex===i?null:i)}/>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
