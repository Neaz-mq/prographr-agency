import { useNavigate, useLocation } from "react-router-dom";
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

  const informationLinks = [
    { label: "FAQ", sectionId: "faq" },
    { label: "Support", sectionId: "contact" },
    { label: "Contact Us", sectionId: "contact" },
  ];

  return (
    <footer className="bg-[#182F33]">
      <div className="mx-auto px-6 md:px-10 lg:px-[4rem] xl:px-[5rem] 2xl:px-[10rem] 3xl:px-[26rem] pt-12 md:pt-16 pb-0">
        
        {/* ── Mobile (below md): logo top, then 2 cols ── */}
        <div className="md:hidden">
          <div className="flex items-center gap-2 mb-10">
            <img src="/logo.webp" alt="Prographr" className="h-7 w-7 object-contain" />
            <span className="text-white text-base tracking-wide">Prographr</span>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-10">
            <div>
              <h4 className="text-white font-medium text-sm mb-4">Service</h4>
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

            <div>
              <h4 className="text-white font-medium text-sm mb-4">Information</h4>
              <ul className="space-y-3">
                {informationLinks.map(({ label, sectionId }) => (
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

        {/* ── md and above: 4 flat equal columns [logo | blank | service | information] ── */}
        <div
          className="hidden md:grid"
          style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
        >
          {/* Col 1 — Logo */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-10">
              <img
                src="/logo.webp"
                alt="Prographr"
                className="h-6 w-6 lg:h-7 lg:w-7 3xl:h-9 3xl:w-9 object-contain"
              />
            </div>
          </div>

          {/* Col 2 — Blank spacer */}
          <div />

          {/* Col 3 — Service: block pushed to right edge, text left-aligned from heading */}
          <div className="flex flex-col">
            <div className="ml-auto">
              <h4 className="text-white font-medium text-[13px] lg:text-base 2xl:text-lg 3xl:text-xl mb-10">
                Service
              </h4>
              <ul className="space-y-3">
                {serviceLinks.map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => scrollToSection("services")}
                      className="text-[#888] text-[12px] lg:text-sm 2xl:text-sm 3xl:text-lg hover:text-white transition-colors leading-snug text-left bg-transparent border-none outline-none cursor-pointer"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 4 — Information: block pushed to right edge, text left-aligned from heading */}
          <div className="flex flex-col">
            <div className="ml-auto">
              <h4 className="text-white font-medium text-[13px] lg:text-base 2xl:text-lg 3xl:text-xl mb-10">
                Information
              </h4>
              <ul className="space-y-3">
                {informationLinks.map(({ label, sectionId }) => (
                  <li key={label}>
                    <button
                      onClick={() => scrollToSection(sectionId)}
                      className="text-[#888] text-[12px] lg:text-sm 2xl:text-sm 3xl:text-lg hover:text-white transition-colors text-left bg-transparent border-none outline-none cursor-pointer"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/[8%] mt-10 md:mt-14 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
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

          <p className="text-[#888] text-xs md:text-[11px] lg:text-sm text-center">
            © {new Date().getFullYear()} All rights reserved Prographr.
          </p>

          <p className="text-[#888] text-xs md:text-[11px] lg:text-sm">
            Developed by{" "}
            <span className="text-white hover:text-[#FF7431] transition-colors cursor-default">
              Prographr
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}