import Link from "next/link";
import { Microscope } from "lucide-react";

export function Navbar() {
  return (
    <header className="border-b bg-background">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Microscope className="size-5" />
          ForensiLabs
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/services" className="text-sm hover:text-primary">Services</Link>
          <Link href="/gallery" className="text-sm hover:text-primary">Gallery</Link>
          <Link href="/about" className="text-sm hover:text-primary">About</Link>
          <Link href="/team" className="text-sm hover:text-primary">Meet Our Team</Link>
        </div>
      </nav>
    </header>
  );
}
