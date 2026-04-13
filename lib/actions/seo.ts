"use server";
import { dbConnect } from "@/lib/db";
import { Seo } from "@/lib/models/seo";
import { revalidatePath } from "next/cache";
import { seoPages } from "@/lib/seo-pages";
import type { Metadata } from "next";

export async function getAllSeo() {
  await dbConnect();
  return JSON.parse(JSON.stringify(await Seo.find().lean()));
}

export async function getSeoByPage(page: string) {
  await dbConnect();
  const doc = await Seo.findOne({ page }).lean();
  return doc ? JSON.parse(JSON.stringify(doc)) : null;
}

export async function updateSeo(page: string, data: { title: string; description: string; keywords: string; ogImage: string }) {
  await dbConnect();
  await Seo.findOneAndUpdate({ page }, { page, ...data }, { upsert: true });
  const p = seoPages.find(s => s.page === page);
  if (p) revalidatePath(p.path);
  revalidatePath("/admin/seo");
  return { success: true };
}

export async function getPageMetadata(page: string, fallback: { title: string; description: string }): Promise<Metadata> {
  await dbConnect();
  const seo = await Seo.findOne({ page }).lean();
  if (!seo) return { title: fallback.title, description: fallback.description };
  return {
    title: (seo as any).title || fallback.title,
    description: (seo as any).description || fallback.description,
    keywords: (seo as any).keywords || undefined,
    openGraph: (seo as any).ogImage ? { images: [(seo as any).ogImage] } : undefined,
  };
}
