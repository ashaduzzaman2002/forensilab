import Link from "next/link";

const pages = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Home", href: "/admin/pages/home" },
  { label: "Services", href: "/admin/pages/services" },
  { label: "Gallery", href: "/admin/pages/gallery" },
  { label: "About", href: "/admin/pages/about" },
  { label: "Team", href: "/admin/pages/team" },
];

const sections = [
  { label: "Hero", href: "/admin/sections/hero" },
  { label: "Equipment", href: "/admin/sections/equipment" },
  { label: "Case Studies", href: "/admin/sections/case-studies" },
  { label: "Testimonials", href: "/admin/sections/testimonials" },
  { label: "Certifications", href: "/admin/sections/certifications" },
  { label: "Trusted By", href: "/admin/sections/trusted-by" },
  { label: "Locations", href: "/admin/sections/locations" },
  { label: "Request Quote", href: "/admin/sections/request-quote" },
];

export function AdminSidebar() {
  return (
    <aside className="w-64 border-r bg-muted/40 p-4">
      <Link href="/admin/dashboard" className="mb-6 block text-lg font-bold">ForensiLabs Admin</Link>
      <nav className="space-y-6">
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Pages</h3>
          <ul className="space-y-1">{pages.map((p) => <li key={p.href}><Link href={p.href} className="block rounded px-2 py-1.5 text-sm hover:bg-muted">{p.label}</Link></li>)}</ul>
        </div>
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Sections</h3>
          <ul className="space-y-1">{sections.map((s) => <li key={s.href}><Link href={s.href} className="block rounded px-2 py-1.5 text-sm hover:bg-muted">{s.label}</Link></li>)}</ul>
        </div>
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Settings</h3>
          <ul className="space-y-1"><li><Link href="/admin/seo" className="block rounded px-2 py-1.5 text-sm hover:bg-muted">SEO</Link></li></ul>
        </div>
      </nav>
    </aside>
  );
}
