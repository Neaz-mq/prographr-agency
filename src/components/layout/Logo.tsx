import Image from "next/image";
import Link from "next/link";

/* `logo-mark` / `logo-text` class: preloader-er logo-morph (globals.css, PreloaderController) ei duto-ke alada kore chine.
   Header-er logo-te (`data-pl-logo`) preloader-er logo uriye ese boshe, tarpor text beriye ashe. */
export function Logo() {
  return (
    <Link href="/" aria-label="Prographr home" className="flex items-center gap-3">
      <Image src="/icons/logo-mark.svg" alt="" width={30} height={30} priority className="logo-mark size-[1.875rem]" />
      <span className="logo-text text-2xl font-medium leading-[1.25] text-ink">Prographr</span>
    </Link>
  );
}