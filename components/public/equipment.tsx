import { dbConnect } from "@/lib/db";
import { Equipment as EquipmentModel } from "@/lib/models/equipment";
import { EquipmentClient } from "./equipment-client";

const fallback = [
  { name: "DNA Analysis", category: "Biological", description: "Advanced genetic profiling and identification", image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=600&auto=format&fit=crop" },
  { name: "Toxicology", category: "Chemical", description: "Detection of drugs, poisons and chemical substances", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=600&auto=format&fit=crop" },
  { name: "Digital Forensics", category: "Digital", description: "Cyber evidence recovery and analysis", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop" },
  { name: "Ballistics", category: "Physical", description: "Firearm and ammunition examination", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop" },
  { name: "Trace Evidence", category: "Physical", description: "Microscopic material and fiber analysis", image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600&auto=format&fit=crop" },
];

export async function Equipment() {
  await dbConnect();
  const docs = await EquipmentModel.find().sort({ order: 1 }).lean();
  const items = docs.length > 0 ? JSON.parse(JSON.stringify(docs)) : fallback;
  return <EquipmentClient items={items} />;
}
