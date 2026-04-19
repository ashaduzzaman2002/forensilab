"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/careers", label: "Careers" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setVisible(y < lastY.current || y < 10);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const bgClass = isHome
    ? scrolled
      ? "bg-primary/95 backdrop-blur-md shadow-lg"
      : "bg-transparent"
    : "bg-primary";

  function handleHomeClick(e: React.MouseEvent) {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[60px] h-[60px] max-md:px-6 transition-all duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${bgClass}`}
    >
      <div className="flex gap-5 items-center">
        <Link href="/" onClick={handleHomeClick} className="flex items-center`">
          <Image
            src="/logo.svg"
            alt="ForensiLabs"
            width={150}
            height={48}
            className="h-9 w-auto"
          />
        </Link>
      </div>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-6">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={href === "/" ? handleHomeClick : undefined}
              className={`text-[11px] font-medium tracking-[0.08em] capitalize transition-colors ${
                isActive(href) ? "text-white" : "text-white/80 hover:text-white"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <span className="hidden md:block text-[10px] text-white bg-white/10 px-3 py-1 border border-white/60 rounded-full">
        A unit of forensi
      </span>

      {/* Mobile toggle */}
      <button
        className="md:hidden p-2 text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-[60px] left-0 right-0 bg-primary border-t border-white/10 flex flex-col p-4 gap-1 md:hidden">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={href === "/" ? handleHomeClick : undefined}
              className={`text-[11px] font-medium tracking-[0.08em] uppercase py-2 px-3 rounded transition-colors ${
                isActive(href)
                  ? "text-white bg-white/10"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              {label}
            </Link>
          ))}
          <span className="text-[11px] text-white/60 mt-2 px-3">
            A unit of forensi
          </span>
        </div>
      )}
    </nav>
  );
}
