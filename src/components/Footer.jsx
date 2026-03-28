import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#222]">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                <span className="font-display font-bold text-[#0a0a0a] text-sm">P</span>
              </div>
              <span className="font-display font-bold text-white text-base">Prographr</span>
            </div>
            <p className="text-[#888] text-sm leading-relaxed max-w-xs">
              Crafting digital experiences that define the future. We help businesses stand out with modern, creative design solutions.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Services</h4>
            <ul className="space-y-2.5">
              {["Graphic Design","Web Design","Web Development","PowerPoint Design"].map(s => (
                <li key={s}><Link to="/services" className="text-[#888] text-sm hover:text-white transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[["About","/about"],["Portfolio","/portfolio"],["Contact","/contact"]].map(([l,h]) => (
                <li key={l}><Link to={h} className="text-[#888] text-sm hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-[#222] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#888] text-xs">© {new Date().getFullYear()} Prographr. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
