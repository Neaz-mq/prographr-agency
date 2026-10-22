"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { easeInOutCubic, scrollToElement } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  /** "/projects" = alada page. "/#services" = home-er section (onno page theke holeo kaj kore) */
  href: string;
  children: React.ReactNode;
  className?: string;
  /** current page-er link hole ei class jog hoy (aria-current="page"-o boshe) */
  activeClassName?: string;
  onClick?: () => void;
};

/* Nav link: home-er section link ("/#services") home-e thakle "#services" hoye jay, tai Lenis-er smooth anchor scroll kaj kore.
   Onno page-e (jemon /projects) thakle "/#services"-i thake, tai click korle home-e giye sei section-e jay. */
export function NavLink({ href, children, className, activeClassName, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href === pathname;
  const resolved = pathname === "/" && href.startsWith("/#") ? href.slice(1) : href;

  /* "/services#ui-ux-design" jatiyo link (page + section). Already oi page-e thakle Next-er hash jump (jhotka dey) off kore
     Lenis diye oi section-e smooth kore jai (nav-er Services menu-r moto, offset -80). Onno page theke ashle Link nijei page-e niye giye section-e khole. */
  const pageHash = /^(\/[^#?]+)#([\w-]+)$/.exec(href);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    if (!pageHash || pathname !== pageHash[1]) return;
    const target = document.getElementById(pageHash[2]);
    if (!target) return;
    e.preventDefault();
    const distance = Math.abs(target.getBoundingClientRect().top - 80);
    scrollToElement(target, {
      offset: -80,
      duration: Math.min(2.2, Math.max(1.1, distance / 1400)),
      easing: easeInOutCubic,
    });
    window.history.replaceState(window.history.state, "", href);
  };

  return (
    <Link
      href={resolved}
      onClick={handleClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(className, isActive && activeClassName)}
    >
      {children}
    </Link>
  );
}