import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  // 90rem = 1440px (base), px-20 = 80px side padding, content = 1280px
  return <div className={cn("mx-auto w-full max-w-[90rem] px-4 sm:px-8 lg:px-20", className)}>{children}</div>;
}