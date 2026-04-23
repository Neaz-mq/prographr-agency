import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Services",  sectionId: "services"  },
  { label: "Portfolio", sectionId: "portfolio" },
  { label: "About Us",     sectionId: "about"     },
  { label: "Contact Us",       sectionId: "faq"       },
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  /* ── scroll shadow ── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── active section ── */
  useEffect(() => {
    if (location.pathname !== "/") return;

    const observers = navLinks.map(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (!el) return null;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(sectionId);
        },
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
        setTimeout(() => lenisScrollTo(sectionId), 50);
      }
    },
    [location.pathname, navigate]
  );

  /* ── cross-page scroll ── */
  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      const timer = setTimeout(() => {
        lenisScrollTo(id);
        navigate("/", { replace: true, state: {} });
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [location.state, navigate]);

  const isHome = location.pathname === "/";

  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-3 md:px-[1rem] 3xl:px-[25rem] 2xl:px-[9rem] xl:px-[5rem] lg:px-[4rem] pt-[40px] 3xl:pt-[20px] 2xl:pt-[40px] xl:pt-[36px] lg:pt-[38px]">

      {/* Floating Bar */}
      <div
        className={`mx-auto transition-all duration-500 ${
          scrolled ? "backdrop-blur-md shadow-lg" : "backdrop-blur-sm"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-8 h-[65px] 3xl:h-[85px] 2xl:h-[70px] xl:h-[60px] lg:h-[55px] md:h-[55px]">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo.webp"
              alt="Prographr"
              className="h-8 w-8 3xl:h-9 3xl:w-9 2xl:h-7 2xl:w-7 xl:h-6 xl:w-6 lg:h-7 lg:w-7 md:h-6 md:w-6 object-contain"
            />
          </Link>

          {/* Desktop Right Side (Nav + Button grouped) */}
        <div className="hidden md:flex items-center gap-10 lg:gap-14">

            {/* Nav Links */}
          <nav className="flex items-center gap-7 lg:gap-14">
              {navLinks.map(({ label, sectionId }) => (
                <button
                  key={sectionId}
                  onClick={() => scrollToSection(sectionId)}
                  className={`text-[14px] 3xl:text-[16px] 2xl:text-[13px] xl:text-[13px] lg:text-[14px] md:text-[13px] font-light transition-colors duration-200 cursor-pointer bg-transparent border-none outline-none ${
                    isHome && activeSection === sectionId
                      ? "text-white underline underline-offset-[5px] decoration-white/60"
                      : "text-white hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* Let's Talk Button */}
            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center rounded-xl 3xl:px-5 3xl:py-1.5 2xl:px-4 2xl:py-1 xl:px-3 xl:py-0.5 lg:px-3 lg:py-0.5 md:px-3 md:py-0.5 text-[14px] 3xl:text-[16px] 2xl:text-[13px] xl:text-[13px] lg:text-[14px] md:text-[14px] text-[#0a0a0a] bg-white hover:bg-[#e8e8e8] transition-colors duration-200 font-medium"
            >
              Let's Talk
            </button>
          </div>

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