import "dotenv/config";
import { dbConnect } from "../lib/db";
import { Equipment } from "../lib/models/equipment";

const data = [
  { name: "DNA Analysis", category: "Biological", description: "Advanced genetic profiling and identification", image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=600&auto=format&fit=crop", order: 0 },
  { name: "Toxicology", category: "Chemical", description: "Detection of drugs, poisons and chemical substances", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=600&auto=format&fit=crop", order: 1 },
  { name: "Digital Forensics", category: "Digital", description: "Cyber evidence recovery and analysis", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop", order: 2 },
  { name: "Ballistics", category: "Physical", description: "Firearm and ammunition examination", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop", order: 3 },
  { name: "Trace Evidence", category: "Physical", description: "Microscopic material and fiber analysis", image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600&auto=format&fit=crop", order: 4 },
];

async function seed() {
  await dbConnect();
  const count = await Equipment.countDocuments();
  if (count > 0) { console.log(`${count} equipment items exist, skipping.`); process.exit(0); }
  await Equipment.insertMany(data);
  console.log(`${data.length} equipment items seeded.`);
  process.exit(0);
}

seed().catch((err) => { console.error("Seed failed:", err); process.exit(1); });
