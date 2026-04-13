import { getPageMetadata } from "@/lib/actions/seo";

export const revalidate = 60;

import { dbConnect } from "@/lib/db";
import { PageContent } from "@/lib/models/page-content";

export async function generateMetadata() { return getPageMetadata("terms-of-service", { title: "Terms of Service — ForensiLabs", description: "Terms and conditions for using ForensiLabs services" }); }

export default async function TermsOfServicePage() {
  await dbConnect();
  const doc = await PageContent.findOne({ slug: "terms-of-service" }).lean();
  const data = doc ? JSON.parse(JSON.stringify(doc)) : null;

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-heading text-3xl font-bold">{data?.title || "Terms of Service"}</h1>
      {data?.content ? (
        <div className="mt-8 prose prose-sm prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: data.content }} />
      ) : (
        <p className="mt-8 text-muted-foreground">Content coming soon.</p>
      )}
    </section>
  );
}
