"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CloudImage } from "@/components/ui/CloudImage";
import { images } from "@/lib/images";
import { resetBackdropMotion, setBackdropMotion } from "@/lib/menu-backdrop";
import { PROJECT_FILTER_EVENT, markScrollToFilters, projectFilterHref, type ProjectFilter } from "@/lib/project-filter";
import { easeInOutCubic, scrollToElement } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";
import { NavLink } from "./NavLink";

/* Figma: "Frame 2147237442" - floating nav-er "Project" button-e hover korle button-er upore ei panel ashe.
   Panel 840 x 512, bg white, padding 30, gap 24, radius 30, shadow 0 0 80px rgba(0,0,0,.1).
   Bam e: 405 wide list (4 ta card, protita 104 high, bg #FAFAFA, radius 16, padding 16, gap 6; card-gulor majhe gap 12).
   Dan e: 351 x 452 collage (bg #F0F0F0, radius 20), 3 row image, protita row-er gap 11.02, panel-er bairer dike ektu kata. */

/* Figma-r copy hubohu (Mobile App / Dashboard-er text-er mil nai, kintu designer-er deya text-i rakha hoyeche) */
const menuItems: { title: ProjectFilter; description: string }[] = [
  {
    title: "Most Recent",
    description:
      "We design intuitive, engaging digital experiences that make products easier to use and more enjoyable every user.",
  },
  {
    title: "Web Design",
    description: "We build distinctive brand identities that communicate your values, strengthen recognition",
  },
  {
    title: "Mobile App",
    description:
      "We build fast, scalable, and high-performing websites that deliver seamless experiences across every device.",
  },
  {
    title: "Dashboard",
    description:
      "We turn ideas into powerful mobile applications that are intuitive, reliable, and built for real-world use.",
  },
];

/* Services hover menu: Figma "Frame 2147237442" (Project menu-r hubohu ekoi layout, ekoi collage). Text = Services page-er section-er copy.
   Protita card click korle /services page-er oi section-e (#id) jay (ServicesShowcase-er id-r shathe mile) */
const serviceMenuItems: { title: string; description: string; href: string }[] = [
  {
    title: "UI/UX Design",
    description:
      "We design intuitive, engaging digital experiences that make products easier to use and more enjoyable every user.",
    href: "/services#ui-ux-design",
  },
  {
    title: "Brand Identity Design",
    description: "We build distinctive brand identities that communicate your values, strengthen recognition.",
    href: "/services#brand-identity-design",
  },
  {
    title: "Web development",
    description:
      "We build fast, scalable, and high-performing websites that deliver seamless experiences across every device.",
    href: "/services#web-development",
  },
  {
    title: "Mobile App Development",
    description:
      "We turn ideas into powerful mobile applications that are intuitive, reliable, and built for real-world use.",
    href: "/services#mobile-app-development",
  },
];

/* Protita card click korle /projects page-e oi filter (title = /projects-er chip-er naam) selected obosthay khole */

/* Collage: Figma-r moto 351 x 452 box-e 3 ta row (tile height 135, gap 11.02, prothom 3 ta view Figma-r moto-i: 1,2 / 3,4 / 5,6).
   Ekhon protita row automatic marquee (Contact page-er collage-er moto ekoi feel, pure CSS .marquee-track):
   row 1 dan-e (left -> right), row 2 bam-e (right -> left), row 3 abar dan-e. Image 6 ta Figma export (images.menuCollage1..6).
   Seamless loop: set-er width (>= 560px) box (351px)-er cheye boro, duita copy, -50% translate.
   Seam-e duita ekoi tile pashapashi na ashe (row-er shesh tile ar prothom tile alada). */
type CollageTile = { src: string; width: number };

const T1: CollageTile = { src: images.menuCollage1, width: 194.19 };
const T2: CollageTile = { src: images.menuCollage2, width: 174.73 };
const T3: CollageTile = { src: images.menuCollage3, width: 176.71 };
const T4: CollageTile = { src: images.menuCollage4, width: 192.41 };
const T5: CollageTile = { src: images.menuCollage5, width: 189.64 };
const T6: CollageTile = { src: images.menuCollage6, width: 163.92 };

const collageRows: { tiles: CollageTile[]; reverse: boolean; duration: string }[] = [
  { tiles: [T1, T2, T6], reverse: true, duration: "38s" }, // dan-e
  { tiles: [T3, T4, T1], reverse: false, duration: "46s" }, // bam-e
  { tiles: [T5, T6, T2], reverse: true, duration: "42s" }, // dan-e
];

/* Ekta marquee row. playing = panel khola thakle chole, bondho thakle pause (hidden panel-e shudhu shudhu animate na kore).
   Inline animationPlayState .marquee:hover-er pause-ke override kore, tai collage-er upor mouse thakleo cholte thake (menu-te card click-i main interaction) */
function CollageMarquee({ row, playing }: { row: (typeof collageRows)[number]; playing: boolean }) {
  const set = (copy: number) => (
    <ul className="flex shrink-0 items-center gap-[0.6888rem] pr-[0.6888rem]">
      {row.tiles.map((tile, i) => (
        <li
          key={`${copy}-${tile.src}-${i}`}
          className="relative h-[8.4375rem] shrink-0 overflow-hidden rounded-md bg-white"
          style={{ width: `${tile.width}px` }}
        >
          <CloudImage
            src={tile.src}
            alt=""
            fill
            sizes="200px"
            /* eager + age-i decode: panel prothom bar khulle image decode-er jonno atke na jay (armed hole idle-e-i load hoy) */
            loading="eager"
            fetchPriority="low"
            decoding="async"
            onLoad={(e) => {
              const img = e.currentTarget;
              if (typeof img.decode === "function") img.decode().catch(() => {});
            }}
            draggable={false}
            className="select-none object-cover"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee fade-edges overflow-hidden" data-keep-running="" suppressHydrationWarning>
      <div
        className={cn("flex w-max", row.reverse ? "marquee-track-reverse" : "marquee-track")}
        style={{ animationDuration: row.duration, animationPlayState: playing ? "running" : "paused" }}
      >
        {set(0)}
        {set(1)}
      </div>
    </div>
  );
}

/* Shared menu state (Project + Services ekshathe): shudhu EKTA panel khola thake.
   Ek menu theke onno menu-te jawar shomoy (instant = true) ager panel ar notun panel CROSSFADE kore na, ek frame-e swap hoy
   (collage duitor-i ekoi, tai shudhu card gulo bodlay). Tai text mishe jay na, blur overlay-o ar blink kore na.
   quick = card click-e bondho hole druto (150ms) fade-out: nahole 300ms blur overlay scroll-er shomoy cholte thake ar frame drop hoy. */
type MenuId = "projects" | "services";
let menuState: { active: MenuId | null; instant: boolean; quick: boolean } = { active: null, instant: false, quick: false };
const menuListeners = new Set<() => void>();

function setActiveMenu(next: MenuId | null, quick = false) {
  if (menuState.active === next) return;
  menuState = { active: next, instant: next !== null && menuState.active !== null, quick: next === null && quick };
  menuListeners.forEach((listener) => listener());
}

function subscribeMenu(listener: () => void) {
  menuListeners.add(listener);
  return () => {
    menuListeners.delete(listener);
  };
}

const getMenuState = () => menuState;

const CLOSE_DELAY = 150; // ms: button theke panel-e jawar shomoy mouse-er choto gap-e panel jeno bondho na hoye jay

type ProjectsMenuItemProps = {
  href: string;
  label: string;
  /** li-er visibility (hidden / md:flex ...). Nav-er onno button-er moto-i, tai FloatingNav theke ashe */
  wrapperClassName?: string;
  className?: string;
  activeClassName?: string;
  /** "projects" = filter card (/projects-e), "services" = section card (/services#id-te). Collage duitor-i ekoi */
  variant?: "projects" | "services";
};

export function ProjectsMenuItem({
  href,
  label,
  wrapperClassName,
  className,
  activeClassName,
  variant = "projects",
}: ProjectsMenuItemProps) {
  const pathname = usePathname();
  const { active, instant, quick } = useSyncExternalStore(subscribeMenu, getMenuState, getMenuState);
  const open = active === variant;
  /* Image gulo prothom bar hover-er age mount kori na, tai page load-e extra image download hoy na */
  const [armed, setArmed] = useState(false);
  const [caretX, setCaretX] = useState<number | null>(null);

  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  /* Caret (panel-er niche-r chhoto tikon) ThikThak "Project" button-er thik majhkhane boshe */
  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const panel = panelRef.current;
    if (!wrap || !panel || panel.offsetWidth === 0) return;
    const center = wrap.offsetLeft + wrap.offsetWidth / 2 - panel.offsetLeft;
    setCaretX(Math.min(Math.max(center, 44), panel.offsetWidth - 44));
  }, []);

  const show = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setArmed(true);
    measure();
    setActiveMenu(variant);
  }, [measure, variant]);

  /* Nijer panel-i khola thakle tobei bondho kori: mouse onno menu-te chole gele ei purono timer notun panel-ke bondho korbe na */
  const closeSelf = useCallback(
    (fast = false) => {
      if (menuState.active === variant) setActiveMenu(null, fast);
    },
    [variant]
  );

  const hideSoon = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => closeSelf(), CLOSE_DELAY);
  }, [closeSelf]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  /* Image gulo page idle hole age-i load kore rakhi, jeno prothom hover-e image decode-er jonno panel atke na jay (extra download page-er critical load-er pore) */
  useEffect(() => {
    /* Safari-te requestIdleCallback nai, tai optional type. (Window & {...} dile TS bhabe function shob shomoy ache -> build fail) */
    type IdleApi = {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const w = window as unknown as IdleApi;
    const hasIdle = typeof w.requestIdleCallback === "function";
    const id = hasIdle
      ? (w.requestIdleCallback as NonNullable<IdleApi["requestIdleCallback"]>)(() => setArmed(true), { timeout: 4000 })
      : window.setTimeout(() => setArmed(true), 2500);
    return () => {
      if (hasIdle) w.cancelIdleCallback?.(id);
      else window.clearTimeout(id);
    };
  }, []);

  /* Menu khola (ar fade-out cholar) shomoy <html data-nav-menu> boshay: globals.css-e tokhon marquee hover-e thame na.
     Na hole panel theke mouse berolei niche-r marquee hover hoye ~0.5s freeze hoto. Shudhu "projects" instance (overlay-er malik) eta kore,
     jeno duto menu ekshathe attribute niye race na kore. Fade-out (300ms / quick 150ms) shesh hole-i tule nei. */
  useEffect(() => {
    if (variant !== "projects") return;
    const root = document.documentElement;
    if (active !== null) {
      root.setAttribute("data-nav-menu", "");
      /* Blur fade-in (300ms)-er shathe pechoner marquee/animation dhire thame jay: blur-er niche pixel bodlay na, tai protita frame-e puro screen abar blur korte hoy na (jitter-er mul karon) */
      setBackdropMotion(false, 300);
      return;
    }
    /* Blur fade-out-er shathe shathe abar dhire chalu (jekhane thamechilo sekhan theke) */
    setBackdropMotion(true, quick ? 150 : 300);
    const id = window.setTimeout(() => root.removeAttribute("data-nav-menu"), quick ? 250 : 450);
    return () => window.clearTimeout(id);
  }, [active, quick, variant]);

  useEffect(() => {
    if (variant !== "projects") return;
    return () => {
      document.documentElement.removeAttribute("data-nav-menu");
      resetBackdropMotion();
    };
  }, [variant]);

  /* Page bodlale (jemon Project click-er por) panel bondho */
  useEffect(() => {
    closeSelf();
  }, [pathname, closeSelf]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSelf();
    };
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", measure);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", measure);
    };
  }, [open, measure, closeSelf]);

  return (
    <div
      ref={wrapRef}
      className={cn("flex", wrapperClassName)}
      onMouseEnter={show}
      onMouseLeave={hideSoon}
      onFocus={show}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) closeSelf();
      }}
    >
      <NavLink
        href={href}
        className={cn("flex", className)}
        activeClassName={activeClassName}
        onClick={() => closeSelf(true)}
      >
        {label}
      </NavLink>

      {/* Figma "Rectangle 34629149": panel khola thakle puro page-er upor rgba(255,255,255,.1) + blur(12px).
          fixed inset-0 = puro viewport (jei page-i hok). -z-10: FloatingNav-er (z-50) bhitor page-er upore kintu nav/panel-er niche,
          tai nav, back-to-top ar WhatsApp button sharp thake, shudhu page blur hoy. pointer-events-none: mouse er shathe kono ba-dha nai */}
      {/* Overlay shudhu EKTA (Project-er wrapper-e), jeno duto menu-r majhe jawar shomoy duto blur layer ekshathe fade/blink na kore. Je kono menu khola thakle-i dekha jay */}
      {variant === "projects" && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none fixed inset-0 -z-10 hidden bg-white/10 backdrop-blur-[12px] will-change-[opacity] transition-[opacity,visibility] ease-out motion-reduce:transition-none md:block",
            instant ? "duration-0" : quick ? "duration-150" : "duration-300",
            active !== null ? "visible opacity-100" : "invisible opacity-0"
          )}
        />
      )}

      {/* Positioner: nav-er upore, nav-er majhkhane (overflow holeo duipashe soman). Shudhu desktop (md+) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-full hidden justify-center md:flex">
        <div
          ref={panelRef}
          id={`${variant}-menu`}
          style={{ transformOrigin: `${caretX ?? 0}px 100%` }}
          className={cn(
            /* pb-5: button ar panel-er majher transparent gap, jeno mouse niche theke upore jawar shomoy hover na hare */
            "pb-5 transition-[opacity,transform,visibility] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] motion-reduce:transition-none",
            instant ? "duration-0" : quick ? "duration-150" : "duration-300",
            open
              ? "pointer-events-auto visible translate-y-0 scale-100 opacity-100"
              : "pointer-events-none invisible translate-y-2 scale-[0.97] opacity-0"
          )}
        >
          <div className="relative flex w-[min(52.5rem,calc(100vw-2rem))] items-center gap-6 rounded-[1.875rem] bg-white p-[1.875rem] shadow-[0_0_80px_rgba(0,0,0,0.1)]">
            <ul className="flex min-w-0 flex-1 flex-col gap-3">
              {variant === "services"
                ? serviceMenuItems.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          closeSelf(true);
                          /* Already /services-e thakle Next-er hash jump (jhotka dey) off: Lenis diye oi section-e smooth kore jai.
                             Onno page theke ashle Link nijei /services-e niye jay ar oi section-e khole. */
                          if (pathname !== "/services") return;
                          const target = document.getElementById(item.href.split("#")[1] ?? "");
                          if (!target) return;
                          e.preventDefault();
                          /* Duration dur-er hishab-e (1.1s - 2.2s), easeInOut: shuru-te ektu dhire (overlay mishe jay), majhkhane druto, shesh-e dhire thame */
                          const distance = Math.abs(target.getBoundingClientRect().top - 80);
                          scrollToElement(target, {
                            offset: -80,
                            duration: Math.min(2.2, Math.max(1.1, distance / 1400)),
                            easing: easeInOutCubic,
                          });
                          window.history.replaceState(window.history.state, "", item.href);
                        }}
                        className="flex min-h-[6.5rem] flex-col gap-1.5 rounded-2xl bg-[#FAFAFA] p-4 transition-colors duration-300 hover:bg-[#F0F0F0] focus-visible:bg-[#F0F0F0]"
                      >
                        <span className="text-xl font-medium leading-[1.2] text-black">{item.title}</span>
                        <span className="text-sm leading-[1.5] text-black/70">{item.description}</span>
                      </Link>
                    </li>
                  ))
                : menuItems.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={projectFilterHref(item.title)}
                        /* Already /projects-e thakle Next-er "upore jao" off: gallery nijei smooth scroll kore filter-e jay */
                        scroll={pathname !== "/projects"}
                        onClick={() => {
                          closeSelf(true);
                          /* Already /projects-e thakle page remount hoy na, tai gallery-ke direct janai */
                          if (pathname === "/projects") {
                            window.dispatchEvent(new CustomEvent(PROJECT_FILTER_EVENT, { detail: item.title }));
                          } else {
                            /* Onno page theke ashchi: notun page-e gallery mount hole chip row-e scroll korte hobe (purono scrollY-er upor nirbhor na kore) */
                            markScrollToFilters();
                          }
                        }}
                        className="flex min-h-[6.5rem] flex-col gap-1.5 rounded-2xl bg-[#FAFAFA] p-4 transition-colors duration-300 hover:bg-[#F0F0F0] focus-visible:bg-[#F0F0F0]"
                      >
                        <span className="text-xl font-medium leading-[1.2] text-black">{item.title}</span>
                        <span className="text-sm leading-[1.5] text-black/70">{item.description}</span>
                      </Link>
                    </li>
                  ))}
            </ul>

            <div
              aria-hidden="true"
              className="flex h-[28.25rem] w-[21.9375rem] shrink-0 flex-col justify-center gap-[0.6888rem] overflow-hidden rounded-[1.25rem] bg-[#F0F0F0]"
            >
              {armed && collageRows.map((row, i) => <CollageMarquee key={i} row={row} playing={open} />)}
            </div>

            {/* Figma "Polygon 17": panel-er niche white tikon, "Project" button-er dike point kore */}
            <span
              aria-hidden="true"
              className="absolute -bottom-2 size-5 -translate-x-1/2 rotate-45 rounded-[2px] bg-white"
              style={{ left: caretX ?? 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}