import Link from "next/link";
import { RollButton } from "./RollButton";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light";
  size?: "sm" | "md";
  className?: string;
};

export function Button({ href, children, variant = "dark", size = "md", className }: ButtonProps) {
  if (variant === "light") {
    return (
      <Link
        href={href}
        className={cn(
          "inline-flex h-[2.625rem] items-center rounded-xl bg-chip px-4 text-sm font-medium leading-[1.2] text-black transition-colors duration-300 hover:bg-[#e6e6e6]",
          className
        )}
      >
        {children}
      </Link>
    );
  }

  /* Dark button: hover-e label upore roll kore + arrow beriye notun arrow dhuke (RollButton). Header-er "Book a call"-er moto */
  return (
    <RollButton href={href} size={size} className={className}>
      {children}
    </RollButton>
  );
}