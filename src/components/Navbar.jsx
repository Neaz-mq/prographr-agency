import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Services",  sectionId: "services"  },
  { label: "Portfolio", sectionId: "portfolio" },
  { label: "About",     sectionId: "about"     },
  { label: "FAQ",       sectionId: "faq"       },
];

// Always route through Lenis when available, fallback to native
function lenisScrollTo(sectionId) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  if (window.lenis) {
    window.lenis.scrollTo(el, { offset: 0, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  /* ── scroll shadow ── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── active section via IntersectionObserver ── */
  useEffect(() => {
    if (location.pathname !== "/") return;

    const observers = navLinks.map(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(sectionId); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, [location.pathname]);

  /* ── scroll helper ── */
  const scrollToSection = useCallback(
    (sectionId) => {
      setMobileOpen(false);

      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: sectionId } });
      } else {
        // Small timeout lets mobile menu AnimatePresence finish closing
        // before Lenis scrolls — prevents scroll being blocked by overlay
        setTimeout(() => lenisScrollTo(sectionId), 50);
      }
    },
    [location.pathname, navigate]
  );

  /* ── handle cross-page scroll (arriving from another route) ── */
  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      const timer = setTimeout(() => {
        lenisScrollTo(id);
        navigate("/", { replace: true, state: {} });
      }, 400); // wait for page + lenis to initialise
      return () => clearTimeout(timer);
    }
  }, [location.state, navigate]);

  const isHome = location.pathname === "/";

  return (
   <header className="absolute top-0 left-0 right-0 z-50 px-3 md:px-16 lg:px-60 pt-[60px]">

      {/* ── Floating Bar ── */}
      <div
        className={`mx-auto transition-all duration-500 ${
          scrolled
            ? "bg-white/5 backdrop-blur-md shadow-lg shadow-black/40"
            : "bg-white/5 backdrop-blur-sm"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-8 h-[85px]">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo.webp" alt="Prographr" className="h-12 w-12 object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center lg:gap-20 md:gap-12 gap-6">
            {navLinks.map(({ label, sectionId }) => (
              <button
                key={sectionId}
                onClick={() => scrollToSection(sectionId)}
                className={`text-[25px] font-light transition-colors duration-200 cursor-pointer bg-transparent border-none outline-none ${
                  isHome && activeSection === sectionId
                    ? "text-white underline underline-offset-[5px] decoration-white/60"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Let's Talk */}
          <button
            onClick={() => scrollToSection("contact")}
            className="hidden md:inline-flex items-center px-5 py-2 text-sm font-semibold text-[#0a0a0a] bg-white hover:bg-[#e8e8e8] transition-colors duration-200"
          >
            Let's Talk
          </button>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-1"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="max-w-6xl mx-auto mt-1 bg-[#111]/95 backdrop-blur-md overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map(({ label, sectionId }) => (
                <button
                  key={sectionId}
                  onClick={() => scrollToSection(sectionId)}
                  className={`text-left bg-transparent border-none outline-none text-base font-medium transition-colors cursor-pointer ${
                    isHome && activeSection === sectionId
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}

              {/* Let's Talk */}
              <button
                onClick={() => scrollToSection("contact")}
                className="mt-2 px-5 py-2.5 text-sm font-semibold text-[#0a0a0a] bg-white text-center hover:bg-[#e8e8e8] transition-colors"
              >
                Let's Talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}