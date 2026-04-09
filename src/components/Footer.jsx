import { Link, useNavigate, useLocation } from "react-router-dom";
import { Instagram, Linkedin, Twitter } from "lucide-react";

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

  const serviceLinks = ["Graphic Design", "Brand Design", "Web Development", "Web Design", "PowerPoint Design"];
  const quickLinks = [
    { label: "About Us",   sectionId: "about"    },
    { label: "Portfolio",  sectionId: "portfolio" },
    { label: "FAQ",        sectionId: "faq"       },
    { label: "Contact Us", sectionId: "contact"   },
  ];
  const infoLinks = [
    { label: "FAQ",     sectionId: "faq"     },
    { label: "Support", sectionId: "contact" },
  ];

  return (
    <footer className="bg-[#0a0a0a]">

      <div className="md:px-10 3xl:px-60 2xl:px-60 xl:px-20 lg:px-14 mx-auto px-6  pt-12 md:pt-16 pb-10 md:pb-12">

        {/* Logo */}
        <div className="flex items-center justify-center md:justify-start gap-2.5 mb-10 md:mb-12">
          <img src="/logo.webp" alt="Prographr" className="h-5 w-5 object-contain" />
          <span className="text-white text-lg tracking-wide" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}>
            Prographr
          </span>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col divide-y divide-[#222]">
          <div className="py-6">
            <h4 className="text-[#666] text-[10px] uppercase tracking-[0.2em] mb-4">Service</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <button onClick={() => scrollToSection("services")} className="text-white text-sm hover:text-[#888] transition-colors text-left bg-transparent border-none outline-none cursor-pointer">
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="py-6 grid grid-cols-2 gap-x-6">
            <div>
              <h4 className="text-[#666] text-[10px] uppercase tracking-[0.2em] mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map(({ label, sectionId }) => (
                  <li key={label}>
                    <button onClick={() => scrollToSection(sectionId)} className="text-white text-sm hover:text-[#888] transition-colors text-left bg-transparent border-none outline-none cursor-pointer">
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[#666] text-[10px] uppercase tracking-[0.2em] mb-4">Information</h4>
              <ul className="space-y-3">
                {infoLinks.map(({ label, sectionId }) => (
                  <li key={label}>
                    <button onClick={() => scrollToSection(sectionId)} className="text-white text-sm hover:text-[#888] transition-colors text-left bg-transparent border-none outline-none cursor-pointer">
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="py-6">
            <h4 className="text-[#666] text-[10px] uppercase tracking-[0.2em] mb-4">Contact Us</h4>
            <a href="mailto:contact.prographr@gmail.com" className="text-white text-sm hover:text-[#888] transition-colors">
              contact.prographr@gmail.com
            </a>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-4 md:gap-0 md:divide-x md:divide-[#333]">
          <div className="md:pr-8">
            <h4 className="text-white font-semibold text-base mb-3">Service</h4>
            <div className="border-t border-[#333] mb-6" />
            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <button onClick={() => scrollToSection("services")} className="text-[#888] text-sm hover:text-white transition-colors leading-snug text-left bg-transparent border-none outline-none cursor-pointer">
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:px-8">
            <h4 className="text-white font-semibold text-base mb-3">Information</h4>
            <div className="border-t border-[#333] mb-6" />
            <ul className="space-y-3">
              {infoLinks.map(({ label, sectionId }) => (
                <li key={label}>
                  <button onClick={() => scrollToSection(sectionId)} className="text-[#888] text-sm hover:text-white transition-colors text-left bg-transparent border-none outline-none cursor-pointer">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:px-8">
            <h4 className="text-white font-semibold text-base mb-3">Quick Links</h4>
            <div className="border-t border-[#333] mb-6" />
            <ul className="space-y-3">
              {quickLinks.map(({ label, sectionId }) => (
                <li key={label}>
                  <button onClick={() => scrollToSection(sectionId)} className="text-[#888] text-sm hover:text-white transition-colors text-left bg-transparent border-none outline-none cursor-pointer">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:pl-8">
            <h4 className="text-white font-semibold text-base mb-3">Contact Us</h4>
            <div className="border-t border-[#333] mb-6" />
            <a href="mailto:contact.prographr@gmail.com" className="text-[#888] text-sm hover:text-white transition-colors break-all leading-relaxed">
              contact.prographr@gmail.com
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-white">
        <div className="md:px-10 3xl:px-60 2xl:px-60 xl:px-20 lg:px-14 mx-auto px-6  py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {[Instagram, Linkedin, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 border border-[#333] rounded-full flex items-center justify-center hover:bg-[#f0f0f0] transition-colors">
                <Icon size={14} className="text-[#0a0a0a]" />
              </a>
            ))}
          </div>
          <p className="text-[#0a0a0a] text-sm text-center">
            © {new Date().getFullYear()} All rights reserved Prographr.
          </p>
          <div className="flex items-center gap-5">
            <Link to="#" className="text-[#0a0a0a] text-sm hover:underline">Terms</Link>
            <Link to="#" className="text-[#0a0a0a] text-sm underline underline-offset-2">Privacy</Link>
            <Link to="#" className="text-[#0a0a0a] text-sm hover:underline">Cookies</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}