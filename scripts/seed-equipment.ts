import "dotenv/config";
import { dbConnect } from "../lib/db";
import { Equipment } from "../lib/models/equipment";

const data = [
  { emoji: "🔭", badge: "Microscopy", category: "Imaging", name: "Digital Microscope", description: "High-resolution digital imaging of trace evidence, documents, and biological samples.", order: 0 },
  { emoji: "🔬", badge: "Microscopy", category: "Imaging", name: "Portable Microscope", description: "Field-deployable microscope for on-site crime scene evidence examination.", order: 1 },
  { emoji: "🧫", badge: "Microscopy", category: "Imaging", name: "Compound Microscope", description: "Detailed examination of biological specimens, fibres, hair, and micro-evidence.", order: 2 },
  { emoji: "🔎", badge: "Microscopy", category: "Imaging", name: "Stereoscopic Microscope", description: "3D surface imaging for tool marks, fingerprints, and physical evidence analysis.", order: 3 },
  { emoji: "🌡️", badge: "Thermal", category: "Lab Equipment", name: "Hot-air Oven", description: "Sterilisation and drying of forensic samples and laboratory glassware.", order: 4 },
  { emoji: "🧪", badge: "Biology", category: "Lab Equipment", name: "Incubator", description: "Controlled environment for biological sample cultivation and analysis.", order: 5 },
  { emoji: "⚗️", badge: "Separation", category: "Lab Equipment", name: "Centrifuge", description: "Separation of blood components, DNA extraction, and fluid analysis.", order: 6 },
  { emoji: "🌀", badge: "Mixing", category: "Lab Equipment", name: "Vortex Shaker", description: "Homogeneous mixing of forensic reagents and biological sample preparation.", order: 7 },
  { emoji: "💡", badge: "Visualisation", category: "Crime Scene", name: "Light Chamber", description: "UV and alternate light source examination for latent evidence and documents.", order: 8 },
  { emoji: "📡", badge: "Portable", category: "Portable", name: "Pocket Microscope", description: "Compact field microscope for rapid preliminary examination at crime scenes.", order: 9 },
  { emoji: "🖥️", badge: "Digital", category: "Digital Forensics", name: "Forensics Workstation", description: "Dedicated system for cyber evidence recovery, data extraction, and analysis.", order: 10 },
];

async function seed() {
  await dbConnect();
  await Equipment.deleteMany({});
  await Equipment.insertMany(data);
  console.log(`${data.length} equipment items seeded.`);
  process.exit(0);
}

seed().catch((err) => { console.error("Seed failed:", err); process.exit(1); });
