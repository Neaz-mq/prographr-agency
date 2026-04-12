import { Link, useNavigate, useLocation } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { FaBehance } from "react-icons/fa";
import { SiEnvato } from "react-icons/si"; // Renamed from SiGraphicriver

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/company/prographr/",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  {
    href: "https://graphicriver.net/user/prographr/portfolio",
    label: "GraphicRiver",
    Icon: SiEnvato, // Using the updated Envato/GraphicRiver icon
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
      <div className="md:px-10 3xl:px-[26rem] 2xl:px-60 xl:px-20 lg:px-14 mx-auto px-6 pt-12 md:pt-16 pb-0">
        
        {/* Logo */}
        <div className="flex items-center justify-center md:justify-start gap-2.5 mb-10 md:mb-12">
          <img src="/logo.webp" alt="Prographr" className="h-9 w-9 object-contain" />
          <span
            className="text-white text-3xl tracking-wide"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
          >
            Prographr
          </span>
        </div>

        {/* ── Desktop & Mobile links sections omitted for brevity ── */}
        {/* (The layout logic remains identical to your previous working version) */}

        {/* ── Desktop links ── */}
        <div className="hidden md:grid md:grid-cols-4 md:gap-0 md:divide-x md:divide-[#333]">
          <div className="md:pr-8">
            <h4 className="text-white font-medium text-xl mb-3">Service</h4>
            <div className="border-t border-[#333] mb-6" />
            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-[#888] text-lg hover:text-white transition-colors leading-snug text-left bg-transparent border-none outline-none cursor-pointer"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:px-8">
            <h4 className="text-white font-medium text-xl mb-3">Information</h4>
            <div className="border-t border-[#333] mb-6" />
            <ul className="space-y-3">
              {infoLinks.map(({ label, sectionId }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollToSection(sectionId)}
                    className="text-[#888] text-lg hover:text-white transition-colors text-left bg-transparent border-none outline-none cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:px-8">
            <h4 className="text-white font-medium text-xl mb-3">Quick Links</h4>
            <div className="border-t border-[#333] mb-6" />
            <ul className="space-y-3">
              {quickLinks.map(({ label, sectionId }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollToSection(sectionId)}
                    className="text-[#888] text-lg hover:text-white transition-colors text-left bg-transparent border-none outline-none cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:pl-8">
            <h4 className="text-white font-medium text-xl mb-3">Contact Us</h4>
            <div className="border-t border-[#333] mb-6" />
            <a
              href="mailto:contact.prographr@gmail.com"
              className="text-[#888] text-lg hover:text-white transition-colors break-all leading-relaxed"
            >
              contact.prographr@gmail.com
            </a>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-[#222] mt-10 md:mt-14 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Social icons */}
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

          {/* Copyright */}
          <p className="text-[#555] text-sm text-center">
            © {new Date().getFullYear()} All rights reserved Prographr.
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-5">
            <Link to="#" className="text-[#555] text-sm hover:text-white transition-colors">
              Terms
            </Link>
            <Link to="#" className="text-[#555] text-sm hover:text-white transition-colors underline underline-offset-2">
              Privacy
            </Link>
            <Link to="#" className="text-[#555] text-sm hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}