import { dbConnect } from "@/lib/db";
import { Equipment as EquipmentModel } from "@/lib/models/equipment";
import { EquipmentClient } from "./equipment-client";

export async function Equipment() {
  await dbConnect();
  const docs = await EquipmentModel.find().sort({ order: 1 }).lean();
  if (docs.length === 0) return null;
  return <EquipmentClient items={JSON.parse(JSON.stringify(docs))} />;
}
