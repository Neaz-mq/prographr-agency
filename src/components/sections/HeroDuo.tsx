/* Heading-er moddhe Figma + Webflow circle (Design + Development).
   Animation-er CSS globals.css-e (`.duo*`). Server component, kono JS lagbe na.
   Decorative, tai screen reader-er theke lukano. */
export function HeroDuo() {
  return (
    <span className="duo" aria-hidden="true">
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
              transform="translate(11.9 11.55) scale(1.1)"
              fill="#146EF5"
              d="m24 4.515-7.658 14.97H9.149l3.205-6.204h-.144C9.566 16.713 5.621 18.973 0 19.485v-6.118s3.596-.213 5.71-2.435H0V4.515h6.417v5.278l.144-.001 2.622-5.277h4.854v5.244h.144l2.72-5.244H24Z"
            />
          </svg>
        </span>
      </span>
    </span>
  );
}