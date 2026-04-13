"use server";
import { dbConnect } from "@/lib/db";
import { Team } from "@/lib/models/team";
import { getUploadUrl, deleteFile, getFileUrl } from "@/lib/s3";
import { revalidatePath } from "next/cache";

const paths = ["/team", "/admin/pages/team"];
function revalidate() { paths.forEach(p => revalidatePath(p)); }

export async function getTeamMembers() { await dbConnect(); return JSON.parse(JSON.stringify(await Team.find().sort({ order: 1 }).lean())); }
export async function getTeamMemberById(id: string) { await dbConnect(); const i = await Team.findById(id).lean(); return i ? JSON.parse(JSON.stringify(i)) : null; }
export async function getTeamUploadUrl(fileName: string, contentType: string) { const key = `team-${Date.now()}-${fileName}`; return { url: await getUploadUrl(key, contentType), key }; }

export async function createTeamMember(data: { name: string; role: string; description: string; email: string; linkedin: string; image?: { key: string } | null }) {
  await dbConnect(); const count = await Team.countDocuments();
  await Team.create({ name: data.name, role: data.role, description: data.description, email: data.email, linkedin: data.linkedin, image: data.image?.key ? getFileUrl(data.image.key) : "", order: count });
  revalidate(); return { success: true };
}

export async function updateTeamMember(id: string, data: { name: string; role: string; description: string; email: string; linkedin: string; image?: { key: string } | null }) {
  await dbConnect(); const existing = await Team.findById(id); let image = existing?.image || "";
  if (data.image?.key) { if (image?.includes(".amazonaws.com/")) { try { const k = image.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {} } image = getFileUrl(data.image.key); }
  await Team.findByIdAndUpdate(id, { name: data.name, role: data.role, description: data.description, email: data.email, linkedin: data.linkedin, image });
  revalidate(); return { success: true };
}

export async function deleteTeamMember(id: string) {
  await dbConnect(); const item = await Team.findById(id);
  if (item?.image?.includes(".amazonaws.com/")) { try { const k = item.image.split(".amazonaws.com/")[1]; if (k) await deleteFile(k); } catch {} }
  await Team.findByIdAndDelete(id); revalidate(); return { success: true };
}
