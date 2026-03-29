import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    number: "01",
    title: "Graphic Design",
    description:
      "Logos, brand identities, and visual assets crafted to make your brand impossible to ignore.",
    tags: ["Branding", "Logo", "Print", "Social"],
  },
  {
    number: "02",
    title: "Web Development",
    description:
      "Fast, modern websites and web apps built with clean code and pixel-perfect attention to detail.",
    tags: ["React", "MERN", "UI/UX", "SEO"],
  },
  {
    number: "03",
    title: "PowerPoint Design",
    description:
      "Pitch decks and presentations that command the room — structured, visual, and unforgettable.",
    tags: ["Pitch Deck", "Reports", "Slides", "Data Viz"],
  },
];

export default function ServicesSection() {
  return (
    <section className="relative z-10 -mt-32 pb-10 ">
      <div className="max-w-7xl mx-auto px-6 md:px-10 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {services.map((s, i) => (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group bg-[#F7F7F7] min-h-[220px] p-8 flex flex-col justify-between hover:bg-[#fafafa] transition-colors duration-300 cursor-pointer"
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-6">
                <span className="text-[11px] font-semibold tracking-[0.15em] text-[#999] uppercase">
                  {s.number}
                </span>
                <Link
                  to="/services"
                  className="w-8 h-8 rounded-full border border-[#ddd] flex items-center justify-center group-hover:bg-[#0a0a0a] group-hover:border-[#0a0a0a] transition-all duration-300"
                >
                  <ArrowUpRight
                    size={14}
                    className="text-[#999] group-hover:text-white transition-colors duration-300"
                  />
                </Link>
              </div>

              {/* Title */}
              <h3 className="font-bold text-[#0a0a0a] text-xl leading-tight mb-3">
                {s.title}
              </h3>

              {/* Description */}
              <p className="text-[#666] text-sm leading-relaxed mb-6 flex-1">
                {s.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 bg-[#ececec] text-[#555]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
