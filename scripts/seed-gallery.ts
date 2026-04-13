import "dotenv/config";
import { dbConnect } from "../lib/db";
import { Gallery } from "../lib/models/gallery";

const data = [
  { caseId: "2023-FMG042", scene: "Living Room", date: "Mar 15, 2023 — 09:42 AM", image: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?q=80&w=600&auto=format&fit=crop", order: 0 },
  { caseId: "2023-FMG078", scene: "Vehicle Interior", date: "Jun 22, 2023 — 02:15 PM", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop", order: 1 },
  { caseId: "2024-FMG003", scene: "Digital Device Lab", date: "Jan 08, 2024 — 11:30 AM", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop", order: 2 },
  { caseId: "2024-FMG019", scene: "Outdoor Crime Scene", date: "Feb 14, 2024 — 07:20 AM", image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600&auto=format&fit=crop", order: 3 },
  { caseId: "2024-FMG035", scene: "Toxicology Sample", date: "Apr 03, 2024 — 04:55 PM", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=600&auto=format&fit=crop", order: 4 },
  { caseId: "2024-FMG051", scene: "Document Forgery", date: "May 19, 2024 — 10:10 AM", image: "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=600&auto=format&fit=crop", order: 5 },
  { caseId: "2024-FMG067", scene: "Ballistics Lab", date: "Jul 28, 2024 — 01:45 PM", image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=600&auto=format&fit=crop", order: 6 },
  { caseId: "2024-FMG082", scene: "DNA Processing Unit", date: "Sep 11, 2024 — 03:30 PM", image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=600&auto=format&fit=crop", order: 7 },
];

async function seed() { await dbConnect(); const c = await Gallery.countDocuments(); if (c > 0) { console.log(`${c} gallery items exist, skipping.`); process.exit(0); } await Gallery.insertMany(data); console.log(`${data.length} gallery items seeded.`); process.exit(0); }
seed().catch((e) => { console.error("Seed failed:", e); process.exit(1); });
