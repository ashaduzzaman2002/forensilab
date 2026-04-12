import { PageHeader } from "@/components/admin/page-header";
import {
  HomeIcon,
  SparklesIcon,
  WrenchIcon,
  BookOpenIcon,
  MessageCircleIcon,
  ShieldCheckIcon,
  BuildingIcon,
  MapPinIcon,
  ArrowRightIcon,
} from "lucide-react";
import Link from "next/link";

const sections = [
  { label: "Hero", icon: SparklesIcon, href: "/admin/pages/home/hero", description: "Banner, headline & CTA" },
  { label: "Equipment", icon: WrenchIcon, href: "/admin/pages/home/equipment", description: "Lab equipment showcase" },
  { label: "Case Studies", icon: BookOpenIcon, href: "/admin/pages/home/case-studies", description: "Featured case studies" },
  { label: "Testimonials", icon: MessageCircleIcon, href: "/admin/pages/home/testimonials", description: "Client testimonials" },
  { label: "Certifications", icon: ShieldCheckIcon, href: "/admin/pages/home/certifications", description: "Accreditations & certifications" },
  { label: "Trusted By", icon: BuildingIcon, href: "/admin/pages/home/trusted-by", description: "Partner logos & trust badges" },
  { label: "Locations", icon: MapPinIcon, href: "/admin/pages/home/locations", description: "Office locations" },
];

export default function AdminHomePage() {
  return (
    <>
      <PageHeader title="Home Page" description="Manage your homepage sections." icon={HomeIcon} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((s) => (
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
            <p className="mt-3 font-heading text-base font-semibold">{s.label}</p>
            <p className="text-sm text-muted-foreground">{s.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
