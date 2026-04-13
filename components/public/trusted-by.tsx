import { dbConnect } from "@/lib/db";
import { TrustedBy as TrustedByModel } from "@/lib/models/trusted-by";
import { TrustedByClient } from "./trusted-by-client";

export async function TrustedBy() {
  await dbConnect();
  const docs = await TrustedByModel.find().sort({ order: 1 }).lean();
  const items = JSON.parse(JSON.stringify(docs));
  if (items.length === 0) return null;
  return <TrustedByClient items={items} />;
}
