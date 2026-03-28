import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Services",  to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "About",     to: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-md" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-[70px]">

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <span className="font-display font-bold text-[#0a0a0a] text-sm">P</span>
            </div>
            <span className="font-display font-bold text-white text-base tracking-wide">Prographr</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <NavLink key={l.to} to={l.to}
                className={({ isActive }) =>
                  `text-sm transition-colors duration-200 ${isActive ? "text-white" : "text-[#888] hover:text-white"}`
                }>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/contact"
            className="hidden md:inline-flex px-5 py-2 text-sm font-semibold text-white border border-[#4F6EF7] rounded-full hover:bg-[#4F6EF7] transition-colors duration-300">
            Get a Quote
          </Link>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white p-1">
            {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }}
            exit={{ opacity:0, height:0 }} transition={{ duration:0.3 }}
            className="md:hidden bg-[#111] border-t border-[#222] overflow-hidden">
            <div className="px-5 py-6 flex flex-col gap-5">
              {navLinks.map(l => (
                <NavLink key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
                  className="text-[#888] hover:text-white text-base transition-colors">{l.label}</NavLink>
              ))}
              <Link to="/contact" onClick={() => setMobileOpen(false)}
                className="mt-2 px-5 py-2.5 text-sm font-semibold text-white border border-[#4F6EF7] rounded-full text-center hover:bg-[#4F6EF7] transition-colors">
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
