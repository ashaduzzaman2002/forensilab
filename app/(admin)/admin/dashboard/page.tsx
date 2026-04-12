import {
  LayoutDashboardIcon,
  FileTextIcon,
  ImageIcon,
  UsersIcon,
  GlobeIcon,
  ArrowRightIcon,
} from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/admin/page-header";

const stats = [
  { label: "Pages", value: "5", icon: FileTextIcon, href: "/admin/pages/home" },
  { label: "Sections", value: "8", icon: GlobeIcon, href: "/admin/sections/hero" },
  { label: "Gallery", value: "—", icon: ImageIcon, href: "/admin/pages/gallery" },
  { label: "Team", value: "—", icon: UsersIcon, href: "/admin/pages/team" },
];

const quickLinks = [
  { label: "Edit Hero Section", href: "/admin/sections/hero" },
  { label: "Manage Services", href: "/admin/pages/services" },
  { label: "Update Testimonials", href: "/admin/sections/testimonials" },
  { label: "SEO Settings", href: "/admin/seo" },
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Welcome back. Manage your ForensiLabs website from here."
        icon={LayoutDashboardIcon}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group rounded-xl border border-white/60 bg-white/60 backdrop-blur-md p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="size-4" />
              </div>
              <ArrowRightIcon className="size-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
            </div>
            <p className="mt-3 text-2xl font-bold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-white/60 bg-white/60 backdrop-blur-md p-6 shadow-sm">
        <h2 className="font-heading text-lg font-semibold">Quick Actions</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center justify-between rounded-lg border px-4 py-3 text-sm transition hover:border-primary/30 hover:bg-primary/5"
            >
              <span>{link.label}</span>
              <ArrowRightIcon className="size-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
