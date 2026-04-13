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

export async function getCaseStudyUploadUrl(fileName: string, contentType: string) {
  const key = `casestudies-${Date.now()}-${fileName}`;
  return { url: await getUploadUrl(key, contentType), key };
}

export async function createCaseStudy(data: {
  slug: string; title: string; description: string; icon?: { key: string } | null;
}) {
  await dbConnect();
  const count = await CaseStudy.countDocuments();
  await CaseStudy.create({
    slug: data.slug, title: data.title, description: data.description,
    icon: data.icon?.key ? getFileUrl(data.icon.key) : "",
    order: count,
  });
  revalidate();
  return { success: true };
}

export async function updateCaseStudy(id: string, data: {
  slug: string; title: string; description: string; icon?: { key: string } | null;
}) {
  await dbConnect();
  const existing = await CaseStudy.findById(id);
  let icon = existing?.icon || "";
  if (data.icon?.key) {
    if (icon?.includes(".amazonaws.com/")) {
      try { const k = icon.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {}
    }
    icon = getFileUrl(data.icon.key);
  }
  await CaseStudy.findByIdAndUpdate(id, { slug: data.slug, title: data.title, description: data.description, icon });
  revalidate();
  return { success: true };
}

export async function deleteCaseStudy(id: string) {
  await dbConnect();
  const item = await CaseStudy.findById(id);
  if (item?.icon?.includes(".amazonaws.com/")) {
    try { const k = item.icon.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {}
  }
  await CaseStudy.findByIdAndDelete(id);
  revalidate();
  return { success: true };
}
