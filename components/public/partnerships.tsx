import { dbConnect } from "@/lib/db";
import { Partnership } from "@/lib/models/partnership";
import { PartnershipsClient } from "./partnerships-client";

const fallback = [
  { name: "Adamas University", subtitle: "", type: "mou" },
  { name: "Kalinga University", subtitle: "Raipur, India", type: "mou" },
  { name: "Sandip University", subtitle: "UGC Recognised", type: "mou" },
  { name: "Usha Martin University", subtitle: "", type: "mou" },
  { name: "IEML Labs", subtitle: "", type: "moa" },
  { name: "Aryaman Detection of Truth", subtitle: "", type: "moa" },
  { name: "Sandip University", subtitle: "UGC Recognised", type: "moa" },
  { name: "Usha Martin University", subtitle: "", type: "moa" },
];

export async function Partnerships() {
  await dbConnect();
  const docs = await Partnership.find().sort({ order: 1 }).lean();
  const items = docs.length > 0 ? JSON.parse(JSON.stringify(docs)) : fallback;
  return <PartnershipsClient items={items} />;
}
