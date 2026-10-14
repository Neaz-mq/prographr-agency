import type Lenis from "lenis";

/* Lenis instance ekta-i thake (SmoothScroll component set kore).
   Onno component (BackToTop, MobileMenu) ekhan theke use kore; Lenis na thakle (reduced-motion / SSR) native-e fallback kore. */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function scrollToTop() {
  if (instance) instance.scrollTo(0, { duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

/* Menu/modal khola thakle background scroll bondho. Lenis na thakle caller nijei overflow handle kore (return false). */
export function lockScroll(): boolean {
  if (!instance) return false;
  instance.stop();
  return true;
}

export function unlockScroll() {
  instance?.start();
}
