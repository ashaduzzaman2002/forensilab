import { getAllSeo } from "@/lib/actions/seo";
import { seoPages } from "@/lib/seo-pages";
import { PageHeader } from "@/components/admin/page-header";
import { SearchIcon } from "lucide-react";
import { SeoForm } from "./seo-form";

export default async function SeoPage() {
  const allSeo = await getAllSeo();
  const seoMap: Record<string, any> = {};
  allSeo.forEach((s: any) => { seoMap[s.page] = s; });

  return (
    <>
      <PageHeader title="SEO Management" description="Configure meta tags, titles, and search optimization for all pages." icon={SearchIcon} />
      <SeoForm pages={seoPages} seoMap={seoMap} />
    </>
  );
}
