import { projectCategories, type ProjectCategory } from "@/lib/projects";

/* /projects page-er filter (chip) er shared logic. Floating nav-er "Project" hover menu ar ProjectsGallery duto-i eta use kore.
   URL: /projects?filter=Web%20Design  (filter na thakle = Explore All) */

export type ProjectFilter = "Explore All" | "Most Recent" | ProjectCategory;

export const projectFilters: ProjectFilter[] = ["Explore All", "Most Recent", ...projectCategories];

/* Menu theke already /projects page-e thakle page remount hoy na, tai gallery-ke ei event diye janano hoy */
export const PROJECT_FILTER_EVENT = "projects:filter";

export function isProjectFilter(value: unknown): value is ProjectFilter {
  return typeof value === "string" && (projectFilters as string[]).includes(value);
}

export function projectFilterHref(filter: ProjectFilter) {
  return filter === "Explore All" ? "/projects" : `/projects?filter=${encodeURIComponent(filter)}`;
}

/* Browser-e URL theke filter pore. Server-e call kora jabe na (useEffect/event-er bhitor) */
export function readProjectFilterFromUrl(): ProjectFilter | null {
  const value = new URLSearchParams(window.location.search).get("filter");
  return isProjectFilter(value) ? value : null;
}