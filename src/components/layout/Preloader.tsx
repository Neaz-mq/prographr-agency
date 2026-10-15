import { PreloaderController } from "./PreloaderController";

/* Website-e dhukle prothome dekha jay: logo-r protita vector alada kore animate hoy (After Effects-er moto).
   Server component, tai HTML-er shathe-i first paint-e chole ashe (JS load hobar jonno opoksha kore na).
   Animation timeline puro globals.css-e (".pl-*"). Exit + scroll lock + hero pause PreloaderController-e.

   Timeline (ms):
     100-2100  L vector: outline "trim path"-er moto ankhe
     1100-1900 L vector: fill dhire fade-in, outline mishe jay
     1450-2650 Corner vector: kon theke scale + ghure (halka overshoot) boshe
     1800-2900 Mark bame soriye wordmark-er jayga kore dey
     2100-3750 "Prographr" akkhor-gulo mask theke ek-ek kore uthe ashe (stagger) */

const WORD = "Prographr";

export function Preloader() {
  return (
    <div id="preloader" className="preloader" role="status" aria-label="Loading Prographr">
      <div className="pl-lockup" aria-hidden="true">
        <div className="pl-mark">
          {/* Vector 1: L shape. Duita alada layer: fill (pore fade-in) + outline (draw hoy) */}
          <svg className="pl-layer pl-l-fill" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.9999 14.999V0H0V29.9999H14.999V14.999H29.9999Z" fill="currentColor" />
          </svg>
          <svg className="pl-layer pl-l-stroke" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M29.9999 14.999V0H0V29.9999H14.999V14.999H29.9999Z"
              pathLength={120}
              stroke="currentColor"
              strokeWidth={1.5}
            />
          </svg>
          {/* Vector 2: kon-er piece, nijer layer-e transform-origin bottom-right */}
          <svg className="pl-layer pl-corner" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.0001 15.125C28.6235 22.6741 22.6749 28.6245 15.124 30.001H30.0001V15.125Z" fill="currentColor" />
          </svg>
        </div>

        <div className="pl-word">
          <div className="pl-word-inner">
            {WORD.split("").map((char, i) => (
              <span key={i} className="pl-letter" style={{ "--i": i } as React.CSSProperties}>
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>

      <PreloaderController />
    </div>
  );
}
