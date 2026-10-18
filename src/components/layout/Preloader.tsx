import { PreloaderController } from "./PreloaderController";

/* Website-e dhukle prothome dekha jay: logo mark-er animation (Dribbble "Prographr Logo Icon" reference), tarpor wordmark.
   Server component, tai HTML-er shathe-i first paint-e chole ashe (JS load hobar jonno opoksha kore na).
   Animation timeline puro globals.css-e (".pl-*"). Exit + scroll lock + hero pause PreloaderController-e.
   Color shobsomoy currentColor (--pl-fg: kalo #121212), tai ekhane kono color nai.

   Timeline (ms):
     200-750   Kon-er piece: kon theke fade-in + scale hoye boro hoy
     600-1067  Piece (+ dot) majhkhane soriye abar kon-e fire ashe
     700-985   Dot: arc-er kendro-te fade-in, tarpor choto hoye mishe jay
     1135-1585 L (duita bar): patla line theke mota hoye puro L hoy (kon fixed, baire-r dhar baire soreh)
     1600-2750 Mark bame soriye jay, ek-i shomoy "Prographr" text logo-r pashe theke dane slide kore beriye ashe.
               Duita-i ek-i duration + easing (--pl-slide-*), tai mirror-er moto smooth: logo jotota bame, text totota dane */

const WORD = "Prographr";

export function Preloader() {
  return (
    <div id="preloader" className="preloader" role="status" aria-label="Loading Prographr">
      <div className="pl-lockup" aria-hidden="true">
        <div className="pl-mark">
          {/* L shape: duita bar (oporer + bamer), duita-i nijer kon (bottom-right) theke scale hoy */}
          <span className="pl-bar pl-bar-top" />
          <span className="pl-bar pl-bar-left" />
          {/* Kon-er piece + dot ekta group-e, jate duita ekshathe sore */}
          <div className="pl-corner-move">
            <svg className="pl-layer pl-corner" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30.0001 15.125C28.6235 22.6741 22.6749 28.6245 15.124 30.001H30.0001V15.125Z" fill="currentColor" />
            </svg>
            <span className="pl-dot" />
          </div>
        </div>

        <div className="pl-word">
          <div className="pl-word-inner">
            <div className="pl-word-text">
              {WORD.split("").map((char, i) => (
                <span key={i} className="pl-letter" style={{ "--i": i } as React.CSSProperties}>
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <PreloaderController />
    </div>
  );
}