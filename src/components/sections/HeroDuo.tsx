/* Heading-er moddhe Figma + Dribbble circle (Design + Creative community).
   Animation-er CSS globals.css-e (`.duo*`). Entrance delay prop theke ashe. Server component, kono JS lagbe na.
   Decorative, tai screen reader-er theke lukano. */
export function HeroDuo({ delay = 400 }: { delay?: number }) {
  return (
    /* delay (ms): heading-er word reveal-er shathe sync (globals.css `--duo-delay`) */
    <span className="duo" aria-hidden="true" style={{ "--duo-delay": `${delay}ms` } as React.CSSProperties}>
      <span className="duo-slot duo-slot--a">
        <span className="duo-float duo-float--a">
          <svg className="duo-face" viewBox="0 0 49.5 49.5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24.75" cy="24.75" r="23.87" fill="#FAFAFA" stroke="#000" strokeWidth="1.77" />
            <g transform="translate(16.8 13.7) scale(0.418)">
              <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
              <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
              <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
              <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
              <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
            </g>
          </svg>
        </span>
      </span>

      <span className="duo-slot duo-slot--b">
        <span className="duo-float duo-float--b">
          <svg className="duo-face" viewBox="0 0 49.5 49.5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24.75" cy="24.75" r="23.87" fill="#FAFAFA" stroke="#000" strokeWidth="1.77" />
            <path
              transform="translate(10.95 10.95) scale(1.15)"
              fill="#EA4C89"
              d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"
            />
          </svg>
        </span>
      </span>
    </span>
  );
}