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

/* Menu theke onno page (jemon /services) theke /projects-e ashle "chip row-e scroll koro" intent-ta ei flag-e rakhi.
   Keno scrollY heuristic noy: purono page-er (niche-r) scrollY new page-e theke jay, tai "scrollY < target" check ulta kaj korto
   ar page Testimonials-e giye pore. Flag thakle scrollY ja-i hok, ekhane jete-i hobe.
   Flag shudhu scroll sesh holei (ba user nije scroll korle) muchhe jay: React StrictMode-er double effect-e jeno hariye na jay. */
const SCROLL_TO_FILTERS_KEY = "projects:scroll-to-filters";
const SCROLL_TO_FILTERS_TTL = 8000; // ms: bashi flag (jemon tab bondho kore pore refresh) jeno kaj na kore

export function markScrollToFilters() {
  try {
    sessionStorage.setItem(SCROLL_TO_FILTERS_KEY, String(Date.now()));
  } catch {
    /* private mode / storage off: flag chhara-i chole, shudhu fallback behavior hobe */
  }
}

export function hasScrollToFilters(): boolean {
  try {
    const raw = sessionStorage.getItem(SCROLL_TO_FILTERS_KEY);
    return raw !== null && Date.now() - Number(raw) < SCROLL_TO_FILTERS_TTL;
  } catch {
    return false;
  }
}

export function clearScrollToFilters() {
  try {
    sessionStorage.removeItem(SCROLL_TO_FILTERS_KEY);
  } catch {
    /* ignore */
  }
}