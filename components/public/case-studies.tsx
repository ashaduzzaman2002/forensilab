import { dbConnect } from "@/lib/db";
import { CaseStudy } from "@/lib/models/case-study";
import { CaseStudiesClient } from "./case-studies-client";

export async function CaseStudies() {
  await dbConnect();
  const docs = await CaseStudy.find().sort({ order: 1 }).lean();
  if (docs.length === 0) return null;
  return <CaseStudiesClient items={JSON.parse(JSON.stringify(docs))} />;
}
