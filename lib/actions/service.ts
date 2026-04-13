"use server";

import { dbConnect } from "@/lib/db";
import { Service } from "@/lib/models/service";
import { getUploadUrl, deleteFile, getFileUrl } from "@/lib/s3";
import { revalidatePath } from "next/cache";

const paths = ["/services", "/admin/pages/services"];
function revalidate() { paths.forEach(p => revalidatePath(p)); }

export async function getServices() {
  await dbConnect();
  const items = await Service.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(items));
}

export async function getServiceById(id: string) {
  await dbConnect();
  const item = await Service.findById(id).lean();
  console.log("Service from DB:", JSON.stringify(item, null, 2));
  return item ? JSON.parse(JSON.stringify(item)) : null;
}

export async function getServiceUploadUrl(fileName: string, contentType: string) {
  const key = `services-${Date.now()}-${fileName}`;
  const url = await getUploadUrl(key, contentType);
  return { url, key };
}

async function uploadFileIfPresent(file: { key: string } | null | undefined, oldUrl: string | undefined) {
  if (!file || !file.key) return oldUrl || "";
  if (oldUrl?.includes(".amazonaws.com/")) {
    try { const k = oldUrl.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {}
  }
  return getFileUrl(file.key);
}

export async function createService(data: {
  slug: string; title: string; description: string; content: string; details: string[];
  icon?: { key: string } | null; thumbnail?: { key: string } | null;
  metaTitle?: string; metaDescription?: string; metaKeywords?: string;
}) {
  await dbConnect();
  const count = await Service.countDocuments();
  console.log("Creating service:", { content: data.content, thumbnail: data.thumbnail, icon: data.icon });
  const doc = await Service.create({
    slug: data.slug,
    title: data.title,
    description: data.description,
    content: data.content || "",
    details: data.details,
    icon: data.icon?.key ? getFileUrl(data.icon.key) : "",
    thumbnail: data.thumbnail?.key ? getFileUrl(data.thumbnail.key) : "",
    metaTitle: data.metaTitle || "", metaDescription: data.metaDescription || "", metaKeywords: data.metaKeywords || "",
    order: count,
  });
  revalidate();
  return { success: true, id: doc._id.toString() };
}

export async function updateService(id: string, data: {
  slug: string; title: string; description: string; content: string; details: string[];
  icon?: { key: string } | null; thumbnail?: { key: string } | null;
  metaTitle?: string; metaDescription?: string; metaKeywords?: string;
}) {
  await dbConnect();
  const existing = await Service.findById(id);
  console.log("Updating service:", { content: data.content?.slice(0, 50), thumbnail: data.thumbnail, icon: data.icon });
  const icon = await uploadFileIfPresent(data.icon || null, existing?.icon);
  const thumbnail = await uploadFileIfPresent(data.thumbnail || null, existing?.thumbnail);

  await Service.findByIdAndUpdate(id, {
    slug: data.slug, title: data.title, description: data.description,
    content: data.content || "", details: data.details, icon, thumbnail,
    metaTitle: data.metaTitle || "", metaDescription: data.metaDescription || "", metaKeywords: data.metaKeywords || "",
  });
  const after = await Service.findById(id).lean();
  console.log("After update:", { content: (after as any)?.content?.slice(0, 50), thumbnail: (after as any)?.thumbnail, icon: (after as any)?.icon });
  revalidate();
  return { success: true };
}

export async function deleteService(id: string) {
  await dbConnect();
  const service = await Service.findById(id);
  if (service) {
    for (const field of ["image", "thumbnail", "icon"] as const) {
      const val = (service as any)[field];
      if (val?.includes(".amazonaws.com/")) {
        try { const k = val.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {}
      }
    }
  }
  await Service.findByIdAndDelete(id);
  revalidate();
  return { success: true };
}
