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