import { Link } from "react-router-dom";
import { Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-12 md:pt-16 pb-10 md:pb-12">

        {/* Logo */}
        <div className="flex items-center justify-center md:justify-start gap-2.5 mb-10 md:mb-12">
          <img src="/logo.webp" alt="Prographr" className="h-5 w-5 object-contain" />
          <span className="text-white text-lg tracking-wide" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}>
            Prographr
          </span>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col divide-y divide-[#222]">

          {/* Service */}
          <div className="py-6">
            <h4 className="text-[#666] text-[10px] uppercase tracking-[0.2em] mb-4">Service</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {["Design", "Brand Design", "Web Development", "Mobile App Design", "Software Development"].map(s => (
                <li key={s}>
                  <Link to="/services" className="text-white text-sm hover:text-[#888] transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links + Information side by side */}
          <div className="py-6 grid grid-cols-2 gap-x-6">
            <div>
              <h4 className="text-[#666] text-[10px] uppercase tracking-[0.2em] mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {[["About Us", "/about"], ["Portfolio", "/portfolio"], ["Career", "/contact"], ["Contact us", "/contact"]].map(([l, h]) => (
                  <li key={l}>
                    <Link to={h} className="text-white text-sm hover:text-[#888] transition-colors">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[#666] text-[10px] uppercase tracking-[0.2em] mb-4">Information</h4>
              <ul className="space-y-3">
                {[["FAQ", "/contact"], ["Support", "/contact"]].map(([l, h]) => (
                  <li key={l}>
                    <Link to={h} className="text-white text-sm hover:text-[#888] transition-colors">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="py-6">
            <h4 className="text-[#666] text-[10px] uppercase tracking-[0.2em] mb-4">Contact Us</h4>
            <a href="mailto:contact.prographr@gmail.com" className="text-white text-sm hover:text-[#888] transition-colors">
              contact.prographr@gmail.com
            </a>
          </div>

        </div>

        {/* Desktop Layout — unchanged */}
        <div className="hidden md:grid md:grid-cols-4 md:gap-0 md:divide-x md:divide-[#333]">

          {/* Service */}
          <div className="md:pr-8">
            <h4 className="text-white font-semibold text-base mb-3">Service</h4>
            <div className="border-t border-[#333] mb-6" />
            <ul className="space-y-3">
              {["Design", "Brand Design", "Web Development", "Mobile App Design", "Software Development"].map(s => (
                <li key={s}>
                  <Link to="/services" className="text-[#888] text-sm hover:text-white transition-colors leading-snug">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div className="md:px-8">
            <h4 className="text-white font-semibold text-base mb-3">Information</h4>
            <div className="border-t border-[#333] mb-6" />
            <ul className="space-y-3">
              {[["FAQ", "/contact"], ["Support", "/contact"]].map(([l, h]) => (
                <li key={l}>
                  <Link to={h} className="text-[#888] text-sm hover:text-white transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="md:px-8">
            <h4 className="text-white font-semibold text-base mb-3">Quick Links</h4>
            <div className="border-t border-[#333] mb-6" />
            <ul className="space-y-3">
              {[["About Us", "/about"], ["Portfolio", "/portfolio"], ["Career", "/contact"], ["Contact us", "/contact"]].map(([l, h]) => (
                <li key={l}>
                  <Link to={h} className="text-[#888] text-sm hover:text-white transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
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
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {[Instagram, Linkedin, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 border border-[#333] rounded-full flex items-center justify-center hover:bg-[#f0f0f0] transition-colors">
                <Icon size={14} className="text-[#0a0a0a]" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[#0a0a0a] text-sm text-center">
            © {new Date().getFullYear()} All rights reserved Prographr.
          </p>

          {/* Legal Links */}
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