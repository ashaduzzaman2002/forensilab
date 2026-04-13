"use server";
import { dbConnect } from "@/lib/db";
import { Footer } from "@/lib/models/footer";
import { revalidatePath } from "next/cache";

export async function getFooter() {
  await dbConnect();
  const doc = await Footer.findOne().lean();
  return doc ? JSON.parse(JSON.stringify(doc)) : null;
}

export async function updateFooter(data: {
  description: string; phone: string; email: string; address: string;
  quickLinks: { label: string; href: string }[];
  socialLinks: { facebook: string; twitter: string; linkedin: string; instagram: string };
}) {
  await dbConnect();
  await Footer.findOneAndUpdate({}, data, { upsert: true });
  revalidatePath("/");
  revalidatePath("/admin/sections/footer");
  return { success: true };
}
