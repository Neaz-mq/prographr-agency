import { Link, useNavigate, useLocation } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { FaBehance } from "react-icons/fa";
import { SiEnvato } from "react-icons/si";

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/company/prographr/",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  {
    href: "https://graphicriver.net/user/prographr/portfolio",
    label: "GraphicRiver",
    Icon: SiEnvato,
  },
  {
    href: "https://www.behance.net/prographr/",
    label: "Behance",
    Icon: FaBehance,
  },
];

function useSectionScroll() {
  const navigate = useNavigate();
  const location = useLocation();

  return (sectionId) => {
    const doScroll = () => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: 0, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      setTimeout(doScroll, 50);
    }
  };
}

export default function Footer() {
  const scrollToSection = useSectionScroll();

  const serviceLinks = [
    "Graphic Design",
    "Brand Design",
    "Web Development",
    "Web Design",
    "PowerPoint Design",
  ];
  const quickLinks = [
    { label: "About Us", sectionId: "about" },
    { label: "Portfolio", sectionId: "portfolio" },
    { label: "FAQ", sectionId: "faq" },
    { label: "Contact Us", sectionId: "contact" },
  ];
  const infoLinks = [
    { label: "FAQ", sectionId: "faq" },
    { label: "Support", sectionId: "contact" },
  ];

  return (
    <footer className="bg-[#0a0a0a]">
      <div className="mx-auto px-6 md:px-10 lg:px-[4rem] xl:px-[5rem] 2xl:px-[10rem] 3xl:px-[26rem] pt-12 md:pt-14 pb-0">

        {/* Logo */}
        <div className="flex items-center justify-center md:justify-start gap-2 mb-10 md:mb-10">
          <img
            src="/logo.webp"
            alt="Prographr"
            className="h-7 w-7 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-7 xl:w-7 2xl:h-7 2xl:w-7 3xl:h-9 3xl:w-9 object-contain"
          />
          <span
            className="text-white text-base md:text-sm lg:text-lg xl:text-lg 2xl:text-xl 3xl:text-3xl tracking-wide"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
          >
            Prographr
          </span>
        </div>

        {/* ── Mobile links (below md) ── */}
        <div className="md:hidden grid grid-cols-2 gap-8 mb-10">
          <div>
            <h4 className="text-white font-medium text-sm mb-3">Service</h4>
            <div className="border-t border-[#333] mb-4" />
            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-[#888] text-xs hover:text-white transition-colors text-left bg-transparent border-none outline-none cursor-pointer"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-8">
            <div>
              <h4 className="text-white font-medium text-sm mb-3">Information</h4>
              <div className="border-t border-[#333] mb-4" />
              <ul className="space-y-3">
                {infoLinks.map(({ label, sectionId }) => (
                  <li key={label}>
                    <button
                      onClick={() => scrollToSection(sectionId)}
                      className="text-[#888] text-xs hover:text-white transition-colors text-left bg-transparent border-none outline-none cursor-pointer"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium text-sm mb-3">Quick Links</h4>
              <div className="border-t border-[#333] mb-4" />
              <ul className="space-y-3">
                {quickLinks.map(({ label, sectionId }) => (
                  <li key={label}>
                    <button
                      onClick={() => scrollToSection(sectionId)}
                      className="text-[#888] text-xs hover:text-white transition-colors text-left bg-transparent border-none outline-none cursor-pointer"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── md only: 3-col grid ── */}
        <div className="hidden md:grid lg:hidden grid-cols-3 gap-x-10 gap-y-10">
          <div>
            <h4 className="text-white font-medium text-[13px] mb-3">Service</h4>
            <div className="border-t border-[#333] mb-5" />
            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-[#888] text-[12px] hover:text-white transition-colors leading-snug text-left bg-transparent border-none outline-none cursor-pointer"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium text-[13px] mb-3">Information</h4>
            <div className="border-t border-[#333] mb-5" />
            <ul className="space-y-3">
              {infoLinks.map(({ label, sectionId }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollToSection(sectionId)}
                    className="text-[#888] text-[12px] hover:text-white transition-colors text-left bg-transparent border-none outline-none cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium text-[13px] mb-3">Quick Links</h4>
            <div className="border-t border-[#333] mb-5" />
            <ul className="space-y-3">
              {quickLinks.map(({ label, sectionId }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollToSection(sectionId)}
                    className="text-[#888] text-[12px] hover:text-white transition-colors text-left bg-transparent border-none outline-none cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── lg and above: 3-col layout ── */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-[#333]">
          <div className="lg:pr-8">
            <h4 className="text-white font-medium 3xl:text-xl 2xl:text-lg xl:text-lg lg:text-base mb-3">Service</h4>
            <div className="border-t border-[#333] mb-6" />
            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-[#888] 3xl:text-lg 2xl:text-sm xl:text-sm lg:text-sm hover:text-white transition-colors leading-snug text-left bg-transparent border-none outline-none cursor-pointer"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:px-8">
            <h4 className="text-white font-medium 3xl:text-xl 2xl:text-lg xl:text-lg lg:text-base mb-3">Information</h4>
            <div className="border-t border-[#333] mb-6" />
            <ul className="space-y-3">
              {infoLinks.map(({ label, sectionId }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollToSection(sectionId)}
                    className="text-[#888] 3xl:text-lg 2xl:text-sm xl:text-sm lg:text-sm hover:text-white transition-colors text-left bg-transparent border-none outline-none cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pl-8">
            <h4 className="text-white font-medium 3xl:text-xl 2xl:text-lg xl:text-lg lg:text-base mb-3">Quick Links</h4>
            <div className="border-t border-[#333] mb-6" />
            <ul className="space-y-3">
              {quickLinks.map(({ label, sectionId }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollToSection(sectionId)}
                    className="text-[#888] 3xl:text-lg 2xl:text-sm xl:text-sm lg:text-sm hover:text-white transition-colors text-left bg-transparent border-none outline-none cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-[#222] mt-10 md:mt-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a 
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 border border-[#333] rounded-full flex items-center justify-center text-[#888] hover:text-white hover:border-[#555] transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

          <p className="text-[#555] text-xs md:text-[11px] lg:text-sm text-center">
            © {new Date().getFullYear()} All rights reserved Prographr.
          </p>

          <div className="flex items-center gap-4 md:gap-3 lg:gap-5">
            <Link to="#" className="text-[#555] text-xs md:text-[11px] lg:text-sm hover:text-white transition-colors">
              Terms
            </Link>
            <Link to="#" className="text-[#555] text-xs md:text-[11px] lg:text-sm hover:text-white transition-colors underline underline-offset-2">
              Privacy
            </Link>
            <Link to="#" className="text-[#555] text-xs md:text-[11px] lg:text-sm hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}