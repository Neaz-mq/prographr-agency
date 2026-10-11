import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <Logo />
      <Button href="#contact" size="sm">
        Book a call
      </Button>
    </header>
  );
}