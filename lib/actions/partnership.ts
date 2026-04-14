"use server";

import { dbConnect } from "@/lib/db";
import { Partnership } from "@/lib/models/partnership";
import { revalidatePath } from "next/cache";

const paths = ["/", "/admin/pages/home/partnerships"];
function revalidate() { paths.forEach(p => revalidatePath(p)); }

export async function getPartnerships() {
  await dbConnect();
  const items = await Partnership.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(items));
}

export async function getPartnershipById(id: string) {
  await dbConnect();
  const item = await Partnership.findById(id).lean();
  return item ? JSON.parse(JSON.stringify(item)) : null;
}

export async function createPartnership(formData: FormData) {
  await dbConnect();
  const count = await Partnership.countDocuments();
  await Partnership.create({
    name: formData.get("name") as string,
    subtitle: formData.get("subtitle") as string,
    type: formData.get("type") as string,
    order: count,
  });
  revalidate();
  return { success: true };
}

export async function updatePartnership(id: string, formData: FormData) {
  await dbConnect();
  await Partnership.findByIdAndUpdate(id, {
    name: formData.get("name") as string,
    subtitle: formData.get("subtitle") as string,
    type: formData.get("type") as string,
  });
  revalidate();
  return { success: true };
}

export async function deletePartnership(id: string) {
  await dbConnect();
  await Partnership.findByIdAndDelete(id);
  revalidate();
  return { success: true };
}
