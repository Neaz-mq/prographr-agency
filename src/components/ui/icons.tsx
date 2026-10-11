type IconProps = { className?: string };

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

export function ArrowUp({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden="true">
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

/* ---------- Projects section icons (Figma: vuesax/linear, 14px, 1px stroke) ---------- */
const lineProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/* Badge-er blue circle-er bhitor-er white sparkle (Figma: "Our Recent Projects") */
export function SparkleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 1.5c.7 5.9 4.6 9.8 10.5 10.5-5.9.7-9.8 4.6-10.5 10.5C11.3 16.6 7.4 12.7 1.5 12 7.4 11.3 11.3 7.4 12 1.5Z" />
    </svg>
  );
}

export function MagicPenIcon({ className }: IconProps) {
  return (
    <svg {...lineProps} className={className}>
      <path d="M3 17.5 15.5 5l3.5 3.5L6.5 21 3 17.5ZM13 7.5l3.5 3.5" />
      <path d="M8 2.5v3M6.5 4h3M21 13v3M19.5 14.5h3M4.5 8v2M3.5 9h2" />
    </svg>
  );
}

export function UsersIcon({ className }: IconProps) {
  return (
    <svg {...lineProps} className={className}>
      <circle cx="9" cy="7.5" r="3.5" />
      <path d="M2.5 20.5c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
      <path d="M16 4.3a3.5 3.5 0 0 1 0 6.4M18.5 14.8c1.9.7 3 2.6 3 5.2" />
    </svg>
  );
}

export function DashboardIcon({ className }: IconProps) {
  return (
    <svg {...lineProps} className={className}>
      <rect x="2.5" y="2.5" width="8" height="6" rx="2" />
      <rect x="13.5" y="2.5" width="8" height="11" rx="2" />
      <rect x="2.5" y="11" width="8" height="10.5" rx="2" />
      <rect x="13.5" y="16" width="8" height="5.5" rx="2" />
    </svg>
  );
}

/* Figma "judge" icon (24x24): 45° ghorano rounded head, divider, handle, ar base line */
export function GavelIcon({ className }: IconProps) {
  return (
    <svg {...lineProps} className={className}>
      <g transform="translate(11.53 10.04) rotate(-45)">
        <rect x="-6.8" y="-4" width="13.6" height="8" rx="1.6" />
        <path d="M-3.6 -4V4" />
      </g>
      <path d="m15.06 13.56 4.95 4.95M2 21h6" />
    </svg>
  );
}

export function ChartUpIcon({ className }: IconProps) {
  return (
    <svg {...lineProps} className={className}>
      <path d="M3 21h18M6 17v-3M11 17V9M16 17v-5" />
      <path d="m5 8 4-4 3 3 6-5M14.5 2H19v4.5" />
    </svg>
  );
}

export function LayersStackIcon({ className }: IconProps) {
  return (
    <svg {...lineProps} className={className}>
      <path d="m12 2.5 9 4.7-9 4.7-9-4.7 9-4.7Z" />
      <path d="m3 12 9 4.7 9-4.7M3 16.8l9 4.7 9-4.7" />
    </svg>
  );
}

export function TeamIcon({ className }: IconProps) {
  return (
    <svg {...lineProps} className={className}>
      <circle cx="5.5" cy="6" r="2.5" />
      <circle cx="18.5" cy="6" r="2.5" />
      <circle cx="12" cy="11.5" r="3" />
      <path d="M2 14c.5-1.6 1.8-2.5 3.5-2.5M22 14c-.5-1.6-1.8-2.5-3.5-2.5M6.5 21.5c0-2.8 2.4-4.8 5.5-4.8s5.5 2 5.5 4.8" />
    </svg>
  );
}

export function DocumentIcon({ className }: IconProps) {
  return (
    <svg {...lineProps} className={className}>
      <path d="M20 8.5v7c0 4.5-2 6.5-6.5 6.5h-3C6 22 4 20 4 15.5v-7C4 4 6 2 10.5 2h3C18 2 20 4 20 8.5Z" />
      <path d="M14.5 2v3.5c0 1.4 1.1 2.5 2.5 2.5h3M8 13h4M8 17h8" />
    </svg>
  );
}