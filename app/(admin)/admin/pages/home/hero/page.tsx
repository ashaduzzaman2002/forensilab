import { getHero } from "@/lib/actions/hero";
import { PageHeader } from "@/components/admin/page-header";
import { SparklesIcon } from "lucide-react";
import { HeroForm } from "./hero-form";

export default async function AdminHeroPage() {
  const hero = await getHero();
  return (
    <>
      <PageHeader title="Hero Section" description="Edit the hero banner, headline, and call-to-action." icon={SparklesIcon} />
      <HeroForm hero={hero} />
    </>
  );
}
