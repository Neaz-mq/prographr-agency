import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" aria-label="Prographr home" className="flex items-center gap-3">
      <Image src="/icons/logo-mark.svg" alt="" width={30} height={30} priority className="size-[1.875rem]" />
      <span className="text-2xl font-medium leading-[1.25] text-ink">Prographr</span>
    </Link>
  );
}