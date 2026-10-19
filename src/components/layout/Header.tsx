import { Logo } from "./Logo";
import { RollButton } from "@/components/ui/RollButton";
import { reveal } from "@/lib/reveal";

export function Header() {
  return (
    <header className="flex items-center justify-between">
      {/* Logo (left theke) ar Book a call (right theke) ~14px slide + fade-in, dutoi ekoi shomoy (delay 0).
          Ager moto button age theke dekha jeto ar logo pore ashto, tai preloader-er por upore "gap" mone hoto. */}
      {/* data-pl-logo: preloader-er logo ekhane uriye ese boshe (logo-morph). Se shomoy ei wrapper-er slide-in off thake (globals.css) */}
      <div className="slide-in-left" data-pl-logo="" style={reveal(0, { duration: 600, x: -14 })}>
        <Logo />
      </div>
      <div className="slide-in-left" style={reveal(0, { duration: 600, x: 14 })}>
        <RollButton href="#contact" size="sm">
          Book a call
        </RollButton>
      </div>
    </header>
  );
}