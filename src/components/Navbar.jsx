import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Process", to: "/process" },
  { label: "Pricing", to: "/pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 pt-10">
      {/* Floating Nav Container */}
      <div
        className={`max-w-7xl mx-auto transition-all duration-500 ${
          scrolled
            ? "bg-white/5 backdrop-blur-md shadow-lg shadow-black/40"
            : "bg-white/5 backdrop-blur-sm"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-8 h-[68px]">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo.webp"
              alt="Prographr"
              className="h-10 w-10 object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-white underline underline-offset-[5px] decoration-white/60"
                      : "text-white/80 hover:text-white"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}

          <Link
            to="/contact"
            className="hidden md:inline-flex items-center px-6 py-2.5 text-sm font-semibold text-[#0a0a0a] bg-white hover:bg-[#e8e8e8] transition-colors duration-200"
          >
            Let's Talk
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-1"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto mt-1 rounded-xl bg-[#111]/95 backdrop-blur-md overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/70 hover:text-white text-base font-medium transition-colors"
                >
                  {l.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-5 py-2.5 text-sm font-semibold text-[#0a0a0a] bg-white rounded-lg text-center hover:bg-[#e8e8e8] transition-colors"
              >
                Let's Talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
