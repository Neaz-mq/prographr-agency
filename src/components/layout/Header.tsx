import { Logo } from "./Logo";
import { RollButton } from "@/components/ui/RollButton";
import { reveal } from "@/lib/reveal";

export function Header() {
  return (
    <header className="flex items-center justify-between">
      {/* Shudhu logo: left theke ~14px slide kore nijer jayga-y ashe + fade-in. Book a call-e kono animation nai */}
      <div className="slide-in-left" style={reveal(0, { duration: 600, x: -14 })}>
        <Logo />
      </div>
      <RollButton href="#contact" size="sm">
        Book a call
      </RollButton>
    </header>
  );
}