"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function FooterLinks({ href, label }: { href?: string; label?: string }) {
  const pathname = usePathname();

  function handleClick(e: React.MouseEvent, target: string) {
    const [path, hash] = target.split("#");
    const targetPath = path || "/";

    if (pathname === targetPath) {
      e.preventDefault();
      if (hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }

  if (!href) {
    return (
      <Link href="/" onClick={(e) => handleClick(e, "/")}>
        <Image src="/logo.svg" alt="ForensiLabs Logo" width={150} height={48} className="h-16 w-auto" />
      </Link>
    );
  }

  return (
    <Link href={href} onClick={(e) => handleClick(e, href)} className="text-sm text-white/60 hover:text-white">
      {label}
    </Link>
  );
}
