"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "@/components/layout/NavLink";
import { PROJECT_FILTER_EVENT, markScrollToFilters } from "@/lib/project-filter";
import { easeInOutCubic, scrollToElement } from "@/lib/smooth-scroll";

/* Footer menu-r link. Prai shob link NavLink-er moto (page / "/#section" / "/page#section").
   Duto link-er alada behaviour:
   1. "/projects" (Our Work): /projects page-er filter chip + project card section-e (chip row) niye jay. Nav-er "Project" hover menu-r moto ekoi system
      (markScrollToFilters + PROJECT_FILTER_EVENT), tai kon page theke click korleo chip row-e pouchhay ar "Explore All" selected thake.
   2. "/#trusted-by" (Brands): "We collaborate with 300+ company" (TrustedBy) section-e niye jay. Current page-e oi section thakle (home, /projects, /services)
      sekhane-i smooth scroll kore (nav-er moto offset -80), na thakle home-e giye oi section-e khole. */
const TRUSTED_BY_ID = "trusted-by";
export const FOOTER_BRANDS_HREF = `/#${TRUSTED_BY_ID}`;

type FooterLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function FooterLink({ href, children, className }: FooterLinkProps) {
  const pathname = usePathname();

  if (href === "/projects") {
    return (
      <Link
        href={href}
        /* Already /projects-e thakle Next-er "upore jao" off: gallery nijei smooth scroll kore chip row-e jay */
        scroll={pathname !== "/projects"}
        onClick={() => {
          if (pathname === "/projects") {
            window.dispatchEvent(new CustomEvent(PROJECT_FILTER_EVENT, { detail: "Explore All" }));
          } else {
            /* Onno page theke ashchi: notun page-e gallery mount hole chip row-e scroll korte hobe */
            markScrollToFilters();
          }
        }}
        className={className}
      >
        {children}
      </Link>
    );
  }

  if (href === FOOTER_BRANDS_HREF) {
    return (
      <Link
        href={pathname === "/" ? `#${TRUSTED_BY_ID}` : href}
        onClick={(e) => {
          const target = document.getElementById(TRUSTED_BY_ID);
          if (!target) return; // ei page-e nai: Link nijei home-e niye giye oi section-e khole
          e.preventDefault();
          const distance = Math.abs(target.getBoundingClientRect().top - 80);
          scrollToElement(target, {
            offset: -80,
            duration: Math.min(2.2, Math.max(1.1, distance / 1400)),
            easing: easeInOutCubic,
          });
          window.history.replaceState(window.history.state, "", `${pathname}#${TRUSTED_BY_ID}`);
        }}
        className={className}
      >
        {children}
      </Link>
    );
  }

  return (
    <NavLink href={href} className={className}>
      {children}
    </NavLink>
  );
}