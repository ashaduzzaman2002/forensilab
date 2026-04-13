"use server";
import { dbConnect } from "@/lib/db";
import { QuoteRequest } from "@/lib/models/quote-request";
import { revalidatePath } from "next/cache";

export async function submitQuoteRequest(formData: FormData) {
  await dbConnect();
  await QuoteRequest.create({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    service: formData.get("service") as string,
    requirement: formData.get("requirement") as string,
  });
  return { success: true };
}

export async function getQuoteRequests(params: { page?: number; search?: string; filter?: string }) {
  await dbConnect();
  const page = params.page || 1;
  const limit = 10;
  const query: any = {};
  if (params.search) { query.$or = [{ name: { $regex: params.search, $options: "i" } }, { email: { $regex: params.search, $options: "i" } }, { service: { $regex: params.search, $options: "i" } }]; }
  if (params.filter === "read") query.isRead = true;
  if (params.filter === "unread") query.isRead = false;
  const [items, total] = await Promise.all([
    QuoteRequest.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    QuoteRequest.countDocuments(query),
  ]);
  return { items: JSON.parse(JSON.stringify(items)), total, pages: Math.ceil(total / limit), page };
}

export async function getQuoteRequestById(id: string) {
  await dbConnect();
  const item = await QuoteRequest.findById(id).lean();
  return item ? JSON.parse(JSON.stringify(item)) : null;
}

export async function markQuoteAsRead(id: string) {
  await dbConnect();
  await QuoteRequest.findByIdAndUpdate(id, { isRead: true });
  revalidatePath("/admin/sections/request-quote");
  return { success: true };
}

export async function deleteQuoteRequest(id: string) {
  await dbConnect();
  await QuoteRequest.findByIdAndDelete(id);
  revalidatePath("/admin/sections/request-quote");
  return { success: true };
}
