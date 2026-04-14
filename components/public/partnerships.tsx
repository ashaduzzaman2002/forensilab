import { dbConnect } from "@/lib/db";
import { Partnership } from "@/lib/models/partnership";
import { PartnershipsClient } from "./partnerships-client";

export async function Partnerships() {
  await dbConnect();
  const docs = await Partnership.find().sort({ order: 1 }).lean();
  if (docs.length === 0) return null;
  return <PartnershipsClient items={JSON.parse(JSON.stringify(docs))} />;
}
