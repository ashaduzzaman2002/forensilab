import type { MetadataRoute } from "next";
import { dbConnect } from "@/lib/db";
import { Service } from "@/lib/models/service";
import { CaseStudy } from "@/lib/models/case-study";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  await dbConnect();

  const [services, caseStudies] = await Promise.all([
    Service.find().select("slug updatedAt").lean(),
    CaseStudy.find().select("slug updatedAt").lean(),
  ]);

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/terms-of-service`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const servicePages = services.map((s: any) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: s.updatedAt || new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const caseStudyPages = caseStudies.map((s: any) => ({
    url: `${baseUrl}/case-studies/${s.slug}`,
    lastModified: s.updatedAt || new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...caseStudyPages];
}
