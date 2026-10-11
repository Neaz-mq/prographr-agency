import Image from "next/image";
import Link from "next/link";
import { BackToTop } from "./BackToTop";
import { MobileMenu } from "./MobileMenu";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function FloatingNav() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;
  const menuLinks = [{ label: "Home", href: "/" }, ...siteConfig.navLinks];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 md:bottom-[3.73rem]">
      <Container className="flex items-center justify-center md:justify-between">
        {/* Back to top: shudhu tablet/desktop-e */}
        <div className="hidden md:block">
          <BackToTop />
        </div>

        <nav aria-label="Quick navigation" className="pointer-events-auto flex items-center gap-2 rounded-xl bg-black p-1.5">
          {/* Mobile: menu button | Tablet+: logo */}
          <MobileMenu links={menuLinks} />
          <Link href="/" aria-label="Home" className="hidden size-10 place-items-center rounded-lg bg-[#222222] md:grid">
            <Image src="/icons/logo-mark.svg" alt="" width={18} height={18} className="size-[1.125rem] brightness-0 invert" />
          </Link>

          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "h-10 items-center justify-center rounded-lg border-[0.5px] border-white/10 px-3 text-base leading-none text-white transition-colors duration-300 hover:bg-white/10",
                link.mobile ? "flex" : "hidden md:flex"
              )}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="#contact"
            className="flex h-10 items-center justify-center rounded-lg bg-white px-4 text-base font-medium leading-none text-black transition-transform duration-300 hover:scale-[1.03]"
          >
            Let&rsquo;s talk
          </Link>
        </nav>

        {/* WhatsApp: mobile-e pill-er upore dane, tablet+ e design-er moto dane */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="pointer-events-auto absolute bottom-full right-4 mb-3 grid size-11 place-items-center rounded-full bg-black transition-transform duration-300 hover:-translate-y-1 md:relative md:bottom-auto md:right-auto md:mb-0 md:size-[3.25rem]"
        >
          <Image src="/icons/logo-mark.svg" alt="" width={20} height={20} className="size-5 brightness-0 invert" />
          <span className="absolute right-0 top-0 size-3 rounded-full border border-white bg-[#22C55E]" />
        </a>
      </Container>
    </div>
  );
}