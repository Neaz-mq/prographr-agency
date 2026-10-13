import { Logo } from "./Logo";
import { RollButton } from "@/components/ui/RollButton";

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <Logo />
      <RollButton href="#contact" size="sm">
        Book a call
      </RollButton>
    </header>
  );
}