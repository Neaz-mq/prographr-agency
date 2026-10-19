"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/sections/Projects";
import { allProjects, projects } from "@/lib/projects";
import {
  PROJECT_FILTER_EVENT,
  clearScrollToFilters,
  hasScrollToFilters,
  isProjectFilter,
  projectFilterHref,
  projectFilters,
  readProjectFilterFromUrl,
  type ProjectFilter,
} from "@/lib/project-filter";
import { scrollToElement } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

/* Figma: "Desktop - 2014" (1440 x 3356), bg #FAFAFA, padding 100px 80px, gap 60px.
   Upore filter chip row (gap 16, chip 40px high, radius 12), niche 2 column card grid (gap 24). Card = home-er ekoi ProjectCard */

/* "Most Recent" = home-er recent 6 ta project */
const recentSlugs = new Set(projects.map((p) => p.slug));

/* Menu theke ashle filter chip row-er upore ei koto px jayga rekhe thambe (chip-er upor-er faka dekha jay, chip kata jay na) */
const SCROLL_OFFSET = -40;

/* Menu theke onno page (/services...) theke ashle chip row-e NISCHITO vabe pouchhai.
   Shomosya chhilo duto:
   1. Purono page-er scrollY new page-e theke jay (Next/Lenis shathe shathe reset kore na), tai "scrollY < target" check-e scroll skip hoye jeto.
   2. Mount-er shomoy layout final na (font, hero text reveal, image load), tai ek bar scroll korle chip row pore sore jay.
   Fix: mount-er por kichu frame dhore chip row-er asol position dekhi, sore gele abar immediate scroll kori; kichukkhon position sthir thakle (ba user nije scroll korle) thami. */
function scrollToFiltersWhenStable(getEl: () => HTMLElement | null, onFinish: (userTookOver: boolean) => void) {
  let raf = 0;
  let stopped = false;
  let stableFrames = 0;
  const startedAt = performance.now();
  const STABLE_FRAMES = 24; // ~0.4s ekdom sthir
  const MAX_MS = 2000; // kono obosthay-i er beshi chesta kori na

  const userEvents = ["wheel", "touchstart", "keydown", "mousedown"] as const;
  const onUser = () => stop(true, true);

  function stop(finish: boolean, userTookOver = false) {
    if (stopped) return;
    stopped = true;
    cancelAnimationFrame(raf);
    userEvents.forEach((evt) => window.removeEventListener(evt, onUser));
    if (finish) onFinish(userTookOver);
  }

  const step = () => {
    if (stopped) return;
    const el = getEl();
    if (el) {
      const target = el.getBoundingClientRect().top + window.scrollY + SCROLL_OFFSET;
      if (Math.abs(window.scrollY - target) > 2) {
        scrollToElement(el, { offset: SCROLL_OFFSET, immediate: true });
        stableFrames = 0;
      } else {
        stableFrames++;
      }
    }
    if (stableFrames >= STABLE_FRAMES || performance.now() - startedAt > MAX_MS) stop(true);
    else raf = requestAnimationFrame(step);
  };

  userEvents.forEach((evt) => window.addEventListener(evt, onUser, { passive: true }));
  raf = requestAnimationFrame(step);

  /* Effect cleanup: flag na muchhe shudhu thamai (StrictMode-e effect abar chalu hole flag lagbe) */
  return () => stop(false);
}

export function ProjectsGallery() {
  const [active, setActive] = useState<ProjectFilter>("Explore All");
  const filtersRef = useRef<HTMLDivElement>(null);

  /* Floating nav-er "Project" hover menu theke ashle (/projects?filter=...) oi filter selected thakbe ar page SORASORI filter chip-er jayga-e jabe.
     - mount: URL-er ?filter= pore. Onno page theke ashle prothom scroll-i chip row-e (immediate, animation chhara) hoy.
       Page-e age thekei neeche (chip row-er porer ongshe) thakle (jemon refresh-er por browser scroll fire dile) scroll kori na
     - PROJECT_FILTER_EVENT: already /projects-e thakle menu-r click (page remount hoy na). Ekhane smooth scroll hoy
     - popstate: browser back/forward (shudhu filter bodlay, scroll na)
     Server render-e hydration mismatch jeno na hoy, tai eta useEffect-e kora, prothom render "Explore All" */
  useEffect(() => {
    const fromUrl = () => setActive(readProjectFilterFromUrl() ?? "Explore All");
    const onFilterEvent = (e: Event) => {
      const filter = (e as CustomEvent<unknown>).detail;
      if (!isProjectFilter(filter)) return;
      setActive(filter);
      if (filtersRef.current) scrollToElement(filtersRef.current, { offset: SCROLL_OFFSET });
    };

    const initial = readProjectFilterFromUrl();
    setActive(initial ?? "Explore All");

    let cancelScroll: (() => void) | undefined;
    if (hasScrollToFilters()) {
      /* Menu theke onno page theke ashchi: scrollY ja-i hok chip row-e jabo (ar layout sthir na howa porjonto position thik rakhbo) */
      cancelScroll = scrollToFiltersWhenStable(
        () => filtersRef.current,
        () => clearScrollToFilters()
      );
    } else {
      const el = filtersRef.current;
      if (initial && el) {
        /* Shorashori URL / refresh: age thekei chip row-er niche thakle (browser-er restore kora scroll) kichu kori na */
        const target = el.getBoundingClientRect().top + window.scrollY + SCROLL_OFFSET;
        if (window.scrollY < target) scrollToElement(el, { offset: SCROLL_OFFSET, immediate: true });
      }
    }

    window.addEventListener(PROJECT_FILTER_EVENT, onFilterEvent);
    window.addEventListener("popstate", fromUrl);
    return () => {
      cancelScroll?.();
      window.removeEventListener(PROJECT_FILTER_EVENT, onFilterEvent);
      window.removeEventListener("popstate", fromUrl);
    };
  }, []);

  /* Chip click: filter bodlay + URL-o sathe update (refresh/share korle same filter thake). Page scroll/reload hoy na */
  const selectFilter = (filter: ProjectFilter) => {
    setActive(filter);
    window.history.replaceState(window.history.state, "", projectFilterHref(filter));
  };

  const visible = useMemo(() => {
    if (active === "Explore All") return allProjects;
    if (active === "Most Recent") return allProjects.filter((p) => recentSlugs.has(p.slug));
    return allProjects.filter((p) => p.categories?.includes(active));
  }, [active]);

  return (
    <section aria-label="All projects" className="bg-[#FAFAFA] py-16 md:py-[6.25rem]">
      <Container className="flex flex-col gap-8 md:gap-[3.75rem]">
        {/* Filter chips: desktop-e (lg+) chip-er majhe gap barhe, prothom chip grid-er bam edge-e ar shesh chip dan edge-e thake.
            Tablet/mobile-e scroll hoy, dan pashe fade */}
        <div ref={filtersRef} className="relative">
          <ul
            role="list"
            aria-label="Filter projects"
            className="flex gap-4 overflow-x-auto pb-1 lg:justify-between lg:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projectFilters.map((filter) => {
              const isActive = filter === active;
              return (
                <li key={filter} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => selectFilter(filter)}
                    className={cn(
                      "flex h-10 items-center justify-center rounded-xl px-4 text-base font-medium leading-none transition-colors duration-300",
                      isActive
                        ? "bg-ink text-white shadow-[inset_3px_3px_10px_rgba(255,255,255,0.2)]"
                        : "bg-chip text-ink hover:bg-[#e6e6e6]"
                    )}
                  >
                    {filter}
                  </button>
                </li>
              );
            })}
          </ul>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-[#FAFAFA]/0 to-[#FAFAFA] lg:hidden"
          />
        </div>

        {visible.length > 0 ? (
          <div key={active} aria-live="polite" className="gallery-in grid grid-cols-1 gap-6 md:grid-cols-2">
            {visible.map((project) => (
              <div key={project.slug} className="flex">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-base text-black/70">No projects in this category yet.</p>
        )}
      </Container>
    </section>
  );
}