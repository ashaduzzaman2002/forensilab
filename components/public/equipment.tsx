import { dbConnect } from "@/lib/db";
import { Equipment as EquipmentModel } from "@/lib/models/equipment";
import { EquipmentClient } from "./equipment-client";

const fallback = [
  { emoji: "🔭", badge: "Microscopy", category: "Imaging", name: "Digital Microscope", description: "High-resolution digital imaging of trace evidence, documents, and biological samples." },
  { emoji: "🔬", badge: "Microscopy", category: "Imaging", name: "Portable Microscope", description: "Field-deployable microscope for on-site crime scene evidence examination." },
  { emoji: "🧫", badge: "Microscopy", category: "Imaging", name: "Compound Microscope", description: "Detailed examination of biological specimens, fibres, hair, and micro-evidence." },
  { emoji: "🔎", badge: "Microscopy", category: "Imaging", name: "Stereoscopic Microscope", description: "3D surface imaging for tool marks, fingerprints, and physical evidence analysis." },
  { emoji: "🌡️", badge: "Thermal", category: "Lab Equipment", name: "Hot-air Oven", description: "Sterilisation and drying of forensic samples and laboratory glassware." },
  { emoji: "🧪", badge: "Biology", category: "Lab Equipment", name: "Incubator", description: "Controlled environment for biological sample cultivation and analysis." },
  { emoji: "⚗️", badge: "Separation", category: "Lab Equipment", name: "Centrifuge", description: "Separation of blood components, DNA extraction, and fluid analysis." },
  { emoji: "🌀", badge: "Mixing", category: "Lab Equipment", name: "Vortex Shaker", description: "Homogeneous mixing of forensic reagents and biological sample preparation." },
  { emoji: "💡", badge: "Visualisation", category: "Crime Scene", name: "Light Chamber", description: "UV and alternate light source examination for latent evidence and documents." },
  { emoji: "📡", badge: "Portable", category: "Portable", name: "Pocket Microscope", description: "Compact field microscope for rapid preliminary examination at crime scenes." },
  { emoji: "🖥️", badge: "Digital", category: "Digital Forensics", name: "Forensics Workstation", description: "Dedicated system for cyber evidence recovery, data extraction, and analysis." },
];

export async function Equipment() {
  await dbConnect();
  const docs = await EquipmentModel.find().sort({ order: 1 }).lean();
  const items = docs.length > 0 ? JSON.parse(JSON.stringify(docs)) : fallback;
  return <EquipmentClient items={items} />;
}
