import { dbConnect } from "@/lib/db";
import { Sector } from "@/lib/models/sector";
import { SectorsClient } from "./sectors-client";

export async function Sectors() {
  await dbConnect();
  const docs = await Sector.find().sort({ order: 1 }).lean();
  if (docs.length === 0) return null;
  return <SectorsClient items={JSON.parse(JSON.stringify(docs))} />;
}
