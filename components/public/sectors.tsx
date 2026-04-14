import { dbConnect } from "@/lib/db";
import { Sector } from "@/lib/models/sector";
import { SectorsClient } from "./sectors-client";

const fallback = [
  { name: "Banking & Finance", description: "Fraud detection, document forgery analysis, and signature verification for banks." },
  { name: "Insurance", description: "Claim investigation, evidence analysis, and expert testimony support for insurers." },
  { name: "Legal & Judiciary", description: "Court-admissible forensic reports and expert witness services for lawyers." },
  { name: "Law Enforcement", description: "Crime scene investigation and forensic support for police & government agencies." },
  { name: "Corporate", description: "Internal fraud investigation, background verification, and digital forensics." },
  { name: "Academic & Research", description: "Internship programs, MOU partnerships, and forensic training for universities." },
  { name: "Healthcare & Medical", description: "Biological evidence analysis, toxicology reports, and medico-legal services." },
  { name: "Defence & Army", description: "Specialized forensic support, ballistic analysis, and identity verification." },
];

export async function Sectors() {
  await dbConnect();
  const docs = await Sector.find().sort({ order: 1 }).lean();
  const items = docs.length > 0 ? JSON.parse(JSON.stringify(docs)) : fallback;
  return <SectorsClient items={items} />;
}
