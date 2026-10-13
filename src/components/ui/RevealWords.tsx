import { Fragment } from "react";
import { reveal } from "@/lib/reveal";

type RevealWordsProps = {
  text: string;
  /** prothom word koto ms por shuru hobe */
  start?: number;
  /** ek word theke porer word-er majhe koto ms gap (stagger) */
  step?: number;
  /** protita word-er animation koto ms */
  duration?: number;
  /** shuru-te koto px blur */
  blur?: number;
};

/* Text-ke word-e bhaag kore protita word blur + transparent theke sharp kore ane, left-to-right stagger-e.
   Server component, pure CSS (`.reveal`), kono JS lage na. Word-gulo inline-block, tai line wrap thik thake.
   Text DOM-e puro-i thake, tai SEO/screen reader-e kono somoshya nai. */
export function RevealWords({ text, start = 0, step = 55, duration = 700, blur = 10 }: RevealWordsProps) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="reveal inline-block" style={reveal(start + i * step, { duration, blur })}>
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}