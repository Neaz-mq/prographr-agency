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

/* Kono element-e scroll. offset = element-er top theke koto px age thambe (negative = upore ektu jayga rakhe).
   immediate: true hole animation chhara sathe sathe jay (onno page theke ashle, jeno prothome upore na dekhay).
   duration = second (default 1.2). easing = custom curve (default: site-er expo-out, ja shuru-te onek druto).
   Section-theke-section jawar jonno easeInOut dile shuru ar shesh duto-i dhire hoy, tai aro smooth lage. */
export function scrollToElement(
  el: HTMLElement,
  {
    offset = 0,
    immediate = false,
    duration = 1.2,
    easing,
  }: { offset?: number; immediate?: boolean; duration?: number; easing?: (t: number) => number } = {}
) {
  if (instance) {
    instance.scrollTo(el, easing ? { offset, immediate, duration, easing } : { offset, immediate, duration });
    return;
  }
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
}

/* Shuru ar shesh dhire, majhkhane druto (section-theke-section scroll-er jonno) */
export function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
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