"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/sections/Projects";
import { allProjects, projects, projectCategories, type ProjectCategory } from "@/lib/projects";
import { cn } from "@/lib/utils";

/* Figma: "Desktop - 2014" (1440 x 3356), bg #FAFAFA, padding 100px 80px, gap 60px.
   Upore filter chip row (gap 16, chip 40px high, radius 12), niche 2 column card grid (gap 24). Card = home-er ekoi ProjectCard */

type Filter = "Explore All" | "Most Recent" | ProjectCategory;

const filters: Filter[] = ["Explore All", "Most Recent", ...projectCategories];

/* "Most Recent" = home-er recent 6 ta project */
const recentSlugs = new Set(projects.map((p) => p.slug));

export function ProjectsGallery() {
  const [active, setActive] = useState<Filter>("Explore All");

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
        <div className="relative">
          <ul
            role="list"
            aria-label="Filter projects"
            className="flex gap-4 overflow-x-auto pb-1 lg:justify-between lg:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filters.map((filter) => {
              const isActive = filter === active;
              return (
                <li key={filter} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActive(filter)}
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
