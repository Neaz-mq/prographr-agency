import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Services", sectionId: "hero" },
  { label: "Portfolio", sectionId: "portfolio" },
  { label: "About Us", sectionId: "about" },
  { label: "FAQ", sectionId: "faq" },
];

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
  const [hireExpanded, setHireExpanded] = useState(false);
  const [mobileHireExpanded, setMobileHireExpanded] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return;
    const observers = navLinks.map(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(sectionId);
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [location.pathname]);

  // Closes mobile menu + resets hire expanded — used in multiple places
  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    setMobileHireExpanded(false);
  }, []);

  const scrollToSection = useCallback(
    (sectionId) => {
      setMobileOpen(false);
      setMobileHireExpanded(false);
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: sectionId } });
      } else {
        setTimeout(() => lenisScrollTo(sectionId), 50);
      }
    },
    [location.pathname, navigate],
  );

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

  const overlayVariants = {
    closed: {
      clipPath: "inset(0 0 100% 0)",
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
    },
    open: {
      clipPath: "inset(0 0 0% 0)",
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const linkVariants = {
    closed: { y: 60, opacity: 0 },
    open: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.15 + i * 0.07,
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
      },
    }),
  };

  const footerVariants = {
    closed: { opacity: 0, y: 20 },
    open: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.5, duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 px-3 md:px-[1rem] 3xl:px-[25rem] 2xl:px-[9rem] xl:px-[5rem] lg:px-[4rem] 3xl:pt-[10px] 2xl:pt-[10px] xl:pt-[10px] lg:pt-[10px] md:pt-[10px] pt-[10px]">
        <div
          className={`mx-auto transition-all duration-500 ${scrolled ? "" : ""}`}
        >
          <div className="flex items-center justify-between px-6 md:px-8 h-[65px] 3xl:h-[85px] 2xl:h-[70px] xl:h-[60px] lg:h-[55px] md:h-[55px]">
            {/* Logo */}
            <Link to="/" className="flex items-center z-[60] relative">
              <img
                src="/logo.webp"
                alt="Prographr"
                className="h-6 w-6 3xl:h-9 3xl:w-9 2xl:h-7 2xl:w-7 xl:h-6 xl:w-6 lg:h-7 lg:w-7 md:h-6 md:w-6 object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center justify-between flex-1 ml-10 lg:ml-36">
              {/* Nav links — left side, near logo */}
              <nav className="flex items-center gap-7 lg:gap-10">
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

              {/* Hire Us — right side */}
              <div className="relative flex items-center">
                <AnimatePresence mode="wait">
                  {!hireExpanded ? (
                    <motion.button
                      key="collapsed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setHireExpanded(true)}
                      className="inline-flex items-center gap-2 border border-white/50 rounded-xl 3xl:px-5 3xl:py-1.5 2xl:px-4 2xl:py-1 xl:px-4 xl:py-1 lg:px-3 lg:py-1 md:px-3 md:py-1 px-4 py-1.5 text-[14px] 3xl:text-[16px] 2xl:text-[13px] xl:text-[13px] lg:text-[14px] md:text-[14px] text-white font-medium bg-transparent hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                    >
                      Hire Us <span className="text-white/70">→</span>
                    </motion.button>
                  ) : (
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
                      className="inline-flex items-center border border-white/50 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => setHireExpanded(false)}
                        className="3xl:px-5 3xl:py-1.5 2xl:px-4 2xl:py-1 xl:px-4 xl:py-1 lg:px-3 lg:py-1 md:px-3 md:py-1 px-4 py-1.5 text-[14px] 3xl:text-[16px] 2xl:text-[13px] xl:text-[13px] lg:text-[14px] md:text-[14px] text-white font-medium bg-transparent hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                      >
                        Hire Us
                      </button>
                      <a
                        href="https://www.upwork.com/your-profile"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setHireExpanded(false)}
                        className="3xl:px-5 3xl:py-1.5 2xl:px-4 2xl:py-1 xl:px-4 xl:py-1 lg:px-3 lg:py-1 md:px-3 md:py-1 px-4 py-1.5 text-[14px] 3xl:text-[16px] 2xl:text-[13px] xl:text-[13px] lg:text-[14px] md:text-[14px] text-white font-semibold bg-[#73AC56] hover:bg-[#62994a] transition-colors duration-200 no-underline rounded-xl my-1 mr-1"
                      >
                        Upwork
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => {
                const opening = !mobileOpen;
                setMobileOpen(opening);
                if (!opening) setMobileHireExpanded(false);
              }}
              className="md:hidden z-[60] relative flex flex-col justify-center items-center w-6 h-6 gap-[6px] bg-transparent border-none outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={
                  mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="block w-6 h-[1.5px] bg-white origin-center"
              />
              <motion.span
                animate={
                  mobileOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.2 }}
                className="block w-6 h-[1.5px] bg-white"
              />
              <motion.span
                animate={
                  mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="block w-6 h-[1.5px] bg-white origin-center"
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-screen Mobile Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[55] bg-[#182F33] flex flex-col px-8 pt-28 pb-10 md:hidden"
          >
            {/* Close (X) button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { delay: 0.3, duration: 0.3 },
              }}
              exit={{ opacity: 0, scale: 0.7 }}
              onClick={closeMobileMenu}
              className="absolute top-5 right-6 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm cursor-pointer"
              aria-label="Close menu"
            >
              <span className="absolute block w-4 h-[1.5px] bg-white rotate-45" />
              <span className="absolute block w-4 h-[1.5px] bg-white -rotate-45" />
            </motion.button>

            <nav className="flex flex-col gap-1 flex-1">
              {navLinks.map(({ label, sectionId }, i) => (
                <div
                  key={sectionId}
                  className="overflow-hidden border-b border-white/[8%] py-4"
                >
                  <motion.button
                    custom={i}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    onClick={() => scrollToSection(sectionId)}
                    className="w-full text-left bg-transparent border-none outline-none cursor-pointer flex items-center justify-between group mt-6"
                  >
                    <span
                      className={`text-[clamp(36px,10vw,36px)] font-semibold tracking-[-1px] leading-none transition-colors duration-200 ${
                        isHome && activeSection === sectionId
                          ? "text-[#73AC56]"
                          : "text-white group-hover:text-[#73AC56]"
                      }`}
                    >
                      {label}
                    </span>
                    <span className="text-white/30 text-2xl group-hover:text-[#73AC56] transition-colors duration-200">
                      ↗
                    </span>
                  </motion.button>
                </div>
              ))}
            </nav>

            {/* ── Mobile Footer: Hire Us with same expand logic ── */}
            <motion.div
              variants={footerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex items-center justify-between pt-8"
            >
              <div className="flex flex-col gap-1 mt-2">
                <span className="text-white/40 text-[10px] uppercase tracking-[0.15em]">
                  Ready to start?
                </span>
              </div>

              <AnimatePresence mode="wait">
                {!mobileHireExpanded ? (
                  <motion.button
                    key="mobile-collapsed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setMobileHireExpanded(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0a0a0a] text-[13px] font-semibold rounded-xl hover:bg-[#e8e8e8] transition-colors duration-200 cursor-pointer border-none outline-none"
                  >
                    Hire Us <span className="opacity-60">→</span>
                  </motion.button>
                ) : (
                  <motion.div
                    key="mobile-expanded"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
                    className="inline-flex items-center border border-white/30 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setMobileHireExpanded(false)}
                      className="px-4 py-2.5 text-[13px] text-white font-semibold bg-transparent hover:bg-white/10 transition-colors duration-200 cursor-pointer border-none outline-none"
                    >
                      Hire Us
                    </button>
                    <a
                      href="https://www.upwork.com/your-profile"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobileMenu}
                      className="px-4 py-2 text-[13px] text-white font-semibold bg-[#73AC56] hover:bg-[#62994a] transition-colors duration-200 no-underline rounded-xl my-1 mr-1"
                    >
                      Upwork
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}