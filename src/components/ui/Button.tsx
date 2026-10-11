import Link from "next/link";
import { ArrowUpRight } from "./icons";
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

  const isSmall = size === "sm";

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 rounded-xl bg-ink text-sm font-medium leading-[1.2] text-white shadow-[inset_3px_3px_10px_rgba(255,255,255,0.2)] transition-transform duration-300 active:scale-[0.98]",
        isSmall ? "h-9 pl-3 pr-1" : "h-[2.625rem] pl-4 pr-1",
        className
      )}
    >
      {children}
      <span className={cn("grid place-items-center rounded-lg bg-white text-black", isSmall ? "size-7" : "size-[2.125rem]")}>
        <ArrowUpRight
          className={cn(
            "transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
            isSmall ? "size-4" : "size-[1.125rem]"
          )}
        />
      </span>
    </Link>
  );
}