"use server";

import { dbConnect } from "@/lib/db";
import { Career } from "@/lib/models/career";
import { getUploadUrl, deleteFile, getFileUrl } from "@/lib/s3";
import { revalidatePath } from "next/cache";

const paths = ["/careers", "/admin/pages/careers"];
function revalidate() { paths.forEach(p => revalidatePath(p)); }

export async function getCareers() {
  await dbConnect();
  return JSON.parse(JSON.stringify(await Career.find().sort({ order: 1 }).lean()));
}

export async function getActiveCareers() {
  await dbConnect();
  return JSON.parse(JSON.stringify(await Career.find({ isActive: true }).sort({ order: 1 }).lean()));
}

export async function getCareerById(id: string) {
  await dbConnect();
  const item = await Career.findById(id).lean();
  return item ? JSON.parse(JSON.stringify(item)) : null;
}

export async function getCareerBySlug(slug: string) {
  await dbConnect();
  const item = await Career.findOne({ slug }).lean();
  return item ? JSON.parse(JSON.stringify(item)) : null;
}

export async function getCareerUploadUrl(fileName: string, contentType: string) {
  const key = `careers-${Date.now()}-${fileName}`;
  return { url: await getUploadUrl(key, contentType), key };
}

export async function createCareer(data: { slug: string; title: string; location: string; type: string; description: string; content?: string; requirements?: string; applyLink?: string; image?: { key: string } | null }) {
  await dbConnect();
  const count = await Career.countDocuments();
  await Career.create({ slug: data.slug, title: data.title, location: data.location, type: data.type, description: data.description, content: data.content || "", requirements: data.requirements || "", applyLink: data.applyLink || "", image: data.image?.key ? getFileUrl(data.image.key) : "", order: count });
  revalidate();
  return { success: true };
}

export async function updateCareer(id: string, data: { slug: string; title: string; location: string; type: string; description: string; content?: string; requirements?: string; applyLink?: string; isActive?: boolean; image?: { key: string } | null }) {
  await dbConnect();
  const existing = await Career.findById(id);
  let image = existing?.image || "";
  if (data.image?.key) {
    if (image?.includes(".amazonaws.com/")) { try { const k = image.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {} }
    image = getFileUrl(data.image.key);
  }
  await Career.findByIdAndUpdate(id, { slug: data.slug, title: data.title, location: data.location, type: data.type, description: data.description, content: data.content || "", requirements: data.requirements || "", applyLink: data.applyLink || "", isActive: data.isActive, image });
  revalidate();
  return { success: true };
}

export async function deleteCareer(id: string) {
  await dbConnect();
  const item = await Career.findById(id);
  if (item?.image?.includes(".amazonaws.com/")) { try { const k = item.image.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {} }
  await Career.findByIdAndDelete(id);
  revalidate();
  return { success: true };
}
