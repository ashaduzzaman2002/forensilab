"use server";
import { dbConnect } from "@/lib/db";
import { PageContent } from "@/lib/models/page-content";
import { revalidatePath } from "next/cache";

export async function getPageContent(slug: string) {
  await dbConnect();
  const doc = await PageContent.findOne({ slug }).lean();
  return doc ? JSON.parse(JSON.stringify(doc)) : null;
}

export async function updatePageContent(slug: string, title: string, content: string) {
  await dbConnect();
  await PageContent.findOneAndUpdate({ slug }, { slug, title, content }, { upsert: true });
  revalidatePath(`/${slug}`);
  return { success: true };
}
