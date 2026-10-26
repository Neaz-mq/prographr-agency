import { PreloaderController } from "./PreloaderController";

/* Website-e dhukle prothome dekha jay: logo mark-er animation (Dribbble "Prographr Logo Icon" reference), tarpor wordmark.
   Server component, tai HTML-er shathe-i first paint-e chole ashe (JS load hobar jonno opoksha kore na).
   Animation timeline puro globals.css-e (".pl-*"). Exit + scroll lock + hero pause PreloaderController-e.
   Color shobsomoy currentColor (--pl-fg: kalo #121212), tai ekhane kono color nai.

   Timeline (ms):
     170-640   Kon-er piece: kon theke fade-in + scale hoye boro hoy
     510-907   Piece (+ dot) majhkhane soriye abar kon-e fire ashe
     595-837   Dot: arc-er kendro-te fade-in, tarpor choto hoye mishe jay
     965-1350  L (duita bar): patla line theke mota hoye puro L hoy (kon fixed, baire-r dhar baire soreh)
     1360-2340 Mark bame soriye jay, ek-i shomoy "Prographr" text logo-r pashe theke dane slide kore beriye ashe.
               Duita-i ek-i duration + easing (--pl-slide-*), tai mirror-er moto smooth: logo jotota bame, text totota dane
   Exit (page + font load + minimum time hole, PreloaderController data-state="exit" dey; timeline globals.css-e) = entry-r ulto:
     0-980     Text logo-r pichone dhuke jay (je jayga theke beriyechhilo), ek-i shomoy logo majhkhane ashe
     980-1108  Logo majhkhane ektu thame
     1108-1832 Logo majhkhane theke upor-bam kone Header-er logo-r jayga-y uriye jay (ar choto hoy), tar shathe shathe...
     1232-2167 Safed curtain upor theke niche soriye jay (soft edge), home page uncover hoy ar hero-r reveal wipe-er shathe upor theke niche phute othe
     1832      Logo Header-er logo-r jayga-y pouchhe jay ar oitai Header-er logo hoye jay, tarpor "Prographr" text logo-r pichon theke bere ashe
   Header (ba page-er scroll) na thakle logo-morph bad, logo majhkhane choto hoye vanish hoy (fallback). Controller-e "setupMorph". */

const WORD = "Prographr";

export function Preloader() {
  return (
    <div id="preloader" className="preloader" role="status" aria-label="Loading Prographr">
      {/* Safed curtain: exit-e upor theke niche soriye home page uncover kore (globals.css ".pl-curtain") */}
      <div className="pl-curtain" aria-hidden="true" />
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