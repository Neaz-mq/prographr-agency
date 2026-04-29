import { useState, useEffect, useCallback, useRef } from "react";
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

function UpworkIcon({ size = 42 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 66 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="33" cy="33" r="33" fill="#73AC56" />
      <g transform="translate(14.87, 21.76) scale(1.6)">
        <path
          d="M0,.29h2.31c0,1,0,2.01,0,3.01,0,1.31-.22,2.88.51,4.03.5.78,1.36,1.17,2.28,1.07,1.46-.16,2.07-1.47,2.15-2.8V.29s4.02,0,4.02,0c.31,1.21.63,2.43,1.22,3.54.46-1.93,1.93-3.37,3.89-3.73,3.74-.69,6.79,2.31,6.19,6.06-.61,3.83-4.95,5.51-8.12,3.39l-.67-.47-.81,4.98h-2.34c.39-2.35.82-4.69,1.23-7.04-1.05-1.52-1.82-3.25-2.29-5.04-.03,0-.02.04-.02.06-.09,2.36.44,4.79-1.14,6.78-1.14,1.43-3.01,1.94-4.77,1.54C1.45,9.84.1,7.84.02,5.64l-.02-.04V.29ZM17.32,2.07c-2.3.12-2.86,2.54-3.12,4.42.82,1.32,2.52,2.26,4.09,1.81,3.12-.9,2.62-6.41-.97-6.23Z"
          fill="white"
        />
      </g>
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hireExpanded, setHireExpanded] = useState(false);
  const [mobileHireExpanded, setMobileHireExpanded] = useState(false);

  const mobileHireTimerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    return () => {
      if (mobileHireTimerRef.current) clearTimeout(mobileHireTimerRef.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
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
        ([entry]) => { if (entry.isIntersecting) setActiveSection(sectionId); },
        { rootMargin: "-40% 0px -55% 0px" },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [location.pathname]);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    setMobileHireExpanded(false);
    if (mobileHireTimerRef.current) clearTimeout(mobileHireTimerRef.current);
  }, []);

  const handleHireHover = useCallback(() => setHireExpanded(true), []);
  const handleHireLeave = useCallback(() => setHireExpanded(false), []);

  const handleMobileHireTap = useCallback(() => {
    if (mobileHireTimerRef.current) clearTimeout(mobileHireTimerRef.current);
    setMobileHireExpanded((prev) => {
      if (!prev) {
        mobileHireTimerRef.current = setTimeout(() => {
          setMobileHireExpanded(false);
        }, 5000);
      }
      return !prev;
    });
  }, []);

  const scrollToSection = useCallback(
    (sectionId) => {
      setMobileOpen(false);
      setMobileHireExpanded(false);
      if (mobileHireTimerRef.current) clearTimeout(mobileHireTimerRef.current);
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

  // ── Shared pill animation config ──
  const PILL_WIDTH = 110;
  const CIRCLE_SIZE = 42;

  const pillTransition = (expanded) => ({
    width: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      mass: 1,
      delay: expanded ? 0.1 : 0.05,
    },
  });

  const textAnimate = {
    initial: { opacity: 0, scale: 0.8, filter: "blur(6px)" },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 300, damping: 28, delay: 0.18 },
    },
    exit: {
      opacity: 0,
      scale: 0.75,
      filter: "blur(8px)",
      transition: { duration: 0.14, ease: [0.55, 0, 1, 0.45] },
    },
  };

  const iconAnimate = {
    initial: { opacity: 0, scale: 0.3, filter: "blur(10px)" },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 350, damping: 22, delay: 0.32 },
    },
    exit: {
      opacity: 0,
      scale: 0.3,
      filter: "blur(10px)",
      transition: { duration: 0.14, ease: [0.55, 0, 1, 0.45] },
    },
  };

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 px-3 md:px-[1rem] 3xl:px-[25rem] 2xl:px-[9rem] xl:px-[5rem] lg:px-[4rem] 3xl:pt-[10px] 2xl:pt-[10px] xl:pt-[10px] lg:pt-[10px] md:pt-[10px] pt-[10px]">
        <div className="mx-auto transition-all duration-500">
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

              {/* Desktop Hire Us */}
              <div style={{ width: PILL_WIDTH, display: "flex", justifyContent: "center" }}>
                <motion.div
                  className="relative overflow-hidden cursor-pointer flex items-center justify-center"
                  onMouseEnter={handleHireHover}
                  onMouseLeave={handleHireLeave}
                  animate={{ width: hireExpanded ? CIRCLE_SIZE : PILL_WIDTH }}
                  transition={pillTransition(hireExpanded)}
                  style={{ height: CIRCLE_SIZE, background: "#73AC56", flexShrink: 0, borderRadius: 999 }}
                >
                  <AnimatePresence mode="wait">
                    {!hireExpanded ? (
                      <motion.span
                        key="hire-text"
                        {...textAnimate}
                        style={{ position: "relative", zIndex: 1, color: "#ffffff" }}
                        className="text-[15px] select-none whitespace-nowrap"
                      >
                        Hire Us
                      </motion.span>
                    ) : (
                      <motion.a
                        key="upwork-icon"
                        href="https://www.upwork.com/your-profile"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...iconAnimate}
                        onClick={() => setHireExpanded(false)}
                        className="flex items-center justify-center no-underline"
                        style={{ position: "relative", zIndex: 1 }}
                      >
                        <UpworkIcon size={CIRCLE_SIZE} />
                      </motion.a>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => {
                const opening = !mobileOpen;
                setMobileOpen(opening);
                if (!opening) {
                  setMobileHireExpanded(false);
                  if (mobileHireTimerRef.current) clearTimeout(mobileHireTimerRef.current);
                }
              }}
              className="md:hidden z-[60] relative flex flex-col justify-center items-center w-6 h-6 gap-[6px] bg-transparent border-none outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="block w-6 h-[1.5px] bg-white origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-6 h-[1.5px] bg-white"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="block w-6 h-[1.5px] bg-white origin-center"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[55] bg-[#182F33] flex flex-col px-8 pt-28 pb-10 md:hidden"
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.3 } }}
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
                <div key={sectionId} className="overflow-hidden border-b border-white/[8%] py-4">
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

            {/* Mobile Footer */}
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

              {/* Mobile Hire Us — same spring pill animation */}
              <div style={{ width: PILL_WIDTH, display: "flex", justifyContent: "center" }}>
                <motion.div
                  className="relative overflow-hidden cursor-pointer flex items-center justify-center"
                  onClick={handleMobileHireTap}
                  animate={{ width: mobileHireExpanded ? CIRCLE_SIZE : PILL_WIDTH }}
                  transition={pillTransition(mobileHireExpanded)}
                  style={{ height: CIRCLE_SIZE, background: "#6FDA44", flexShrink: 0, borderRadius: 999 }}
                >
                  <AnimatePresence mode="wait">
                    {!mobileHireExpanded ? (
                      <motion.span
                        key="mobile-hire-text"
                        {...textAnimate}
                        style={{ position: "relative", zIndex: 1, color: "#ffffff" }}
                        className="text-[15px] select-none whitespace-nowrap"
                      >
                        Hire Us
                      </motion.span>
                    ) : (
                      <motion.a
                        key="mobile-upwork-icon"
                        href="https://www.upwork.com/your-profile"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...iconAnimate}
                        onClick={closeMobileMenu}
                        className="flex items-center justify-center no-underline"
                        style={{ position: "relative", zIndex: 1 }}
                      >
                        <UpworkIcon size={CIRCLE_SIZE} />
                      </motion.a>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}