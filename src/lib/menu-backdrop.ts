/* Nav menu (Project / Services) khola thakar shomoy pechoner infinite animation gulo dhire thamiye, bondho hole dhire abar chalay.

   KEN: menu khulle puro screen-e `backdrop-filter: blur(12px)` overlay ashe. Pechone marquee (hero, logo, showcase), status dot, duo float
   ekshathe cholte thakle browser-ke PROTITA frame-e puro screen (2K-te ~3.7M pixel) abar blur korte hoy. Eta GPU-r jonno bhari,
   tai hover-e frame drop / kapakapi (jitter) hoy. Animation thamle pechoner pixel bodlay na, tai blur ekbar-i hishab hoy ar
   menu khola obosthay kono extra frame-i toiri hoy na.

   KIVABE: Web Animations API-r `playbackRate` 1 -> 0 (ease-in-out) blur-er fade-in (300ms) er shathe shathe nameye ani, ar bondho holeo
   0 -> 1 fade-out-er shathe uthai. Ei ramp-er shomoy blur-o fade hocche (ager moto-i frame toiri hocche), tai kono extra khoroch nai.
   Animation-er currentTime thik thake, tai marquee jhotka chhara jekhane thamlo sekhan theke-i abar chole.
   Pause/hover/offscreen-er CSS (animation-play-state) ar eta alada, kono conflict nai.

   Ager moto pechone marquee cholte-i thakuk chaile FREEZE_BACKGROUND_WHILE_MENU_OPEN = false koro. */

export const FREEZE_BACKGROUND_WHILE_MENU_OPEN = true;

/* Je animation gulo thamabo: shudhu infinite (loop) gulo. Reveal / entrance (finite) animation-e hat dei na */
const LOOPING_TARGETS = ".marquee-track, .marquee-track-reverse, .status-ripple, .status-dot, .duo-float";

/* <html>-e ProjectsMenuItem.tsx ei attribute boshay (menu khola + fade-out shesh na hoa porjonto). globals.css-o ei naam use kore, tai bodlale tinta jaygay-i bodlate hobe */
const NAV_MENU_ATTR = "data-nav-menu";

/* JS diye cholano animation (Team / Testimonial carousel-er autoplay) CSS playbackRate-e thame na, tai tara protita frame-e ei function-e jiggesh kore.
   true hole (menu khola) autoplay timer ar slide bodlano ruke thake, menu bondho holei ager jayga theke abar chole (elapsed time reset hoy na). */
export function isBackdropFrozen(): boolean {
  return FREEZE_BACKGROUND_WHILE_MENU_OPEN && typeof document !== "undefined" && document.documentElement.hasAttribute(NAV_MENU_ATTR);
}

let rate = 1; // ekhon shob animation-er shared playbackRate (0 = thama, 1 = normal)
let from = 1;
let to = 1;
let startTime = 0;
let duration = 0;
let raf = 0;

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

function loopingAnimations(): Animation[] {
  if (typeof document === "undefined" || typeof document.getAnimations !== "function") return [];
  return document.getAnimations().filter((animation) => {
    const effect = animation.effect as KeyframeEffect | null;
    const target = effect?.target;
    if (!effect || !target || !target.matches(LOOPING_TARGETS)) return false;
    return effect.getComputedTiming().iterations === Infinity;
  });
}

function apply(next: number) {
  for (const animation of loopingAnimations()) {
    if (animation.playbackRate === next) continue;
    /* updatePlaybackRate: currentTime dhore rekhe rate bodlay (jump hoy na). Purono browser-e playbackRate setter-i same kaj kore */
    if (typeof animation.updatePlaybackRate === "function") animation.updatePlaybackRate(next);
    else animation.playbackRate = next;
  }
}

function step(now: number) {
  const t = duration <= 0 ? 1 : Math.min(1, Math.max(0, (now - startTime) / duration));
  rate = from + (to - from) * ease(t);
  apply(rate);
  raf = t < 1 ? requestAnimationFrame(step) : 0;
}

/* running = false -> pechoner animation dhire thame (menu khulche). running = true -> dhire abar chole (menu bondho hocche).
   ms = ramp-er somoy, overlay-er fade-er shomoyer shoman rakhi (300ms, card click-e quick = 150ms). */
export function setBackdropMotion(running: boolean, ms = 300) {
  if (!FREEZE_BACKGROUND_WHILE_MENU_OPEN || typeof window === "undefined") return;
  const next = running ? 1 : 0;
  if (next === to && (raf !== 0 || rate === next)) return; // age-i oi dike jachche / pouchhe gechhe
  from = rate;
  to = next;
  duration = ms * Math.abs(to - from); // majh-pothe ulte gele baki-tuku-i ramp kori
  startTime = performance.now();
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(step);
}

/* Safety: component unmount / page chhere gele kono obosthay-i animation jeno thame na thake */
export function resetBackdropMotion() {
  if (typeof window === "undefined") return;
  cancelAnimationFrame(raf);
  raf = 0;
  from = 1;
  to = 1;
  rate = 1;
  apply(1);
}