"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/locations", label: "Locations" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary flex items-center justify-between px-10 h-[60px] max-md:px-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/fL logo-01.png" alt="ForensiLabs" width={120} height={40} className=" h-8 w-auto" />
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-6">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`text-[11px] font-medium tracking-[0.08em] uppercase transition-colors ${
                isActive(href) ? "text-white" : "text-white/80 hover:text-white"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <span className="hidden md:block text-[11px] text-white/60">A unit of forensi</span>

      {/* Mobile toggle */}
      <button className="md:hidden p-2 text-white" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
        {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-[60px] left-0 right-0 bg-primary border-t border-white/10 flex flex-col p-4 gap-1 md:hidden">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-[11px] font-medium tracking-[0.08em] uppercase py-2 px-3 rounded transition-colors ${
                isActive(href) ? "text-white bg-white/10" : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              {label}
            </Link>
          ))}
          <span className="text-[11px] text-white/60 mt-2 px-3">A unit of forensi</span>
        </div>
      )}
    </nav>
  );
}
