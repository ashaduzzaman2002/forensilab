import "dotenv/config";
import { dbConnect } from "../lib/db";
import { Team } from "../lib/models/team";

const data = [
  { name: "Dr. Sarah Mitchell", role: "Chief Forensic Officer", description: "20+ years in forensic pathology and crime scene analysis", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop", order: 0 },
  { name: "James Carter", role: "Lead Ballistics Expert", description: "Firearm identification and trajectory reconstruction specialist", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop", order: 1 },
  { name: "Dr. Priya Sharma", role: "Toxicology Director", description: "Expert in drug screening and poison detection analysis", image: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?q=80&w=400&auto=format&fit=crop", order: 2 },
  { name: "Michael Torres", role: "Cyber Forensics Lead", description: "Digital evidence recovery and encrypted data specialist", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop", order: 3 },
  { name: "Emily Zhang", role: "DNA Analysis Specialist", description: "Genetic profiling and STR analysis expert", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop", order: 4 },
  { name: "Robert Okafor", role: "Document Examiner", description: "Handwriting analysis and forgery detection specialist", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop", order: 5 },
  { name: "Dr. Lisa Nguyen", role: "Trace Evidence Analyst", description: "Microscopic material and fiber analysis expert", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop", order: 6 },
  { name: "David Hernandez", role: "Crime Scene Investigator", description: "On-site evidence collection and scene reconstruction", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop", order: 7 },
];

async function seed() { await dbConnect(); const c = await Team.countDocuments(); if (c > 0) { console.log(`${c} team members exist, skipping.`); process.exit(0); } await Team.insertMany(data); console.log(`${data.length} team members seeded.`); process.exit(0); }
seed().catch((e) => { console.error("Seed failed:", e); process.exit(1); });
