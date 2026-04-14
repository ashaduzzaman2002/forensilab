"use server";

import { dbConnect } from "@/lib/db";
import { CaseStudy } from "@/lib/models/case-study";
import { getUploadUrl, deleteFile, getFileUrl } from "@/lib/s3";
import { revalidatePath } from "next/cache";

const paths = ["/", "/admin/pages/home/case-studies"];
function revalidate() { paths.forEach(p => revalidatePath(p)); }

export async function getCaseStudies() {
  await dbConnect();
  return JSON.parse(JSON.stringify(await CaseStudy.find().sort({ order: 1 }).lean()));
}

export async function getCaseStudyById(id: string) {
  await dbConnect();
  const item = await CaseStudy.findById(id).lean();
  return item ? JSON.parse(JSON.stringify(item)) : null;
}

export async function getCaseStudyBySlug(slug: string) {
  await dbConnect();
  const item = await CaseStudy.findOne({ slug }).lean();
  return item ? JSON.parse(JSON.stringify(item)) : null;
}

export async function getCaseStudyUploadUrl(fileName: string, contentType: string) {
  const key = `casestudies-${Date.now()}-${fileName}`;
  return { url: await getUploadUrl(key, contentType), key };
}

export async function createCaseStudy(data: {
  slug: string; tag: string; badge: string; title: string; description: string; content?: string;
  gradient: string; image?: { key: string } | null;
  metaTitle?: string; metaDescription?: string; metaKeywords?: string;
}) {
  await dbConnect();
  const count = await CaseStudy.countDocuments();
  await CaseStudy.create({
    slug: data.slug, tag: data.tag, badge: data.badge, title: data.title, description: data.description,
    content: data.content || "",
    gradient: data.gradient || "linear-gradient(135deg,#0A1A40,#0057FF)",
    image: data.image?.key ? getFileUrl(data.image.key) : "",
    metaTitle: data.metaTitle || "", metaDescription: data.metaDescription || "", metaKeywords: data.metaKeywords || "",
    order: count,
  });
  revalidate();
  return { success: true };
}

export async function updateCaseStudy(id: string, data: {
  slug: string; tag: string; badge: string; title: string; description: string; content?: string;
  gradient: string; image?: { key: string } | null;
  metaTitle?: string; metaDescription?: string; metaKeywords?: string;
}) {
  await dbConnect();
  const existing = await CaseStudy.findById(id);
  let image = existing?.image || "";
  if (data.image?.key) {
    if (image?.includes(".amazonaws.com/")) {
      try { const k = image.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {}
    }
    image = getFileUrl(data.image.key);
  }
  await CaseStudy.findByIdAndUpdate(id, {
    slug: data.slug, tag: data.tag, badge: data.badge, title: data.title, description: data.description,
    content: data.content || "",
    gradient: data.gradient || "linear-gradient(135deg,#0A1A40,#0057FF)", image,
    metaTitle: data.metaTitle || "", metaDescription: data.metaDescription || "", metaKeywords: data.metaKeywords || "",
  });
  revalidate();
  return { success: true };
}

export async function deleteCaseStudy(id: string) {
  await dbConnect();
  const item = await CaseStudy.findById(id);
  if (item?.image?.includes(".amazonaws.com/")) {
    try { const k = item.image.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {}
  }
  await CaseStudy.findByIdAndDelete(id);
  revalidate();
  return { success: true };
}
