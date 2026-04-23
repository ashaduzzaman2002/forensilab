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

function deleteS3File(url: string) {
  if (url?.includes(".amazonaws.com/")) {
    try { const k = url.split(".amazonaws.com/")[1]; if (k) deleteFile(k); } catch {}
  }
}

export async function createCaseStudy(data: {
  slug: string; tag: string; badge: string; title: string; description: string;
  gradient: string; image?: { key: string } | null; file?: { key: string; name: string } | null;
}) {
  await dbConnect();
  const count = await CaseStudy.countDocuments();
  await CaseStudy.create({
    slug: data.slug, tag: data.tag, badge: data.badge, title: data.title, description: data.description,
    gradient: data.gradient || "linear-gradient(135deg,#0A1A40,#0057FF)",
    image: data.image?.key ? getFileUrl(data.image.key) : "",
    file: data.file?.key ? getFileUrl(data.file.key) : "",
    fileName: data.file?.name || "",
    order: count,
  });
  revalidate();
  return { success: true };
}

export async function updateCaseStudy(id: string, data: {
  slug: string; tag: string; badge: string; title: string; description: string;
  gradient: string; image?: { key: string } | null; file?: { key: string; name: string } | null; removeFile?: boolean;
}) {
  await dbConnect();
  const existing = await CaseStudy.findById(id);
  let image = existing?.image || "";
  let file = existing?.file || "";
  let fileName = existing?.fileName || "";

  if (data.image?.key) {
    deleteS3File(image);
    image = getFileUrl(data.image.key);
  }
  if (data.removeFile) {
    deleteS3File(file);
    file = "";
    fileName = "";
  } else if (data.file?.key) {
    deleteS3File(file);
    file = getFileUrl(data.file.key);
    fileName = data.file.name;
  }

  await CaseStudy.findByIdAndUpdate(id, {
    slug: data.slug, tag: data.tag, badge: data.badge, title: data.title, description: data.description,
    gradient: data.gradient || "linear-gradient(135deg,#0A1A40,#0057FF)", image, file, fileName,
  });
  revalidate();
  return { success: true };
}

export async function deleteCaseStudy(id: string) {
  await dbConnect();
  const item = await CaseStudy.findById(id);
  deleteS3File(item?.image || "");
  deleteS3File(item?.file || "");
  await CaseStudy.findByIdAndDelete(id);
  revalidate();
  return { success: true };
}
