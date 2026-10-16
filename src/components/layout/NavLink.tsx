"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <Link
      href={resolved}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(className, isActive && activeClassName)}
    >
      {children}
    </Link>
  );
}
