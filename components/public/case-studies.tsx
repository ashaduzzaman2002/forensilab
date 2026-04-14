import { dbConnect } from "@/lib/db";
import { CaseStudy } from "@/lib/models/case-study";
import { CaseStudiesClient } from "./case-studies-client";

const fallback = [
  { slug: "fingerprint-analysis", tag: "Trace Evidence", badge: "Fingerprint", title: "Fingerprint Analysis in Property Dispute", description: "Latent print identification using advanced chemical and digital enhancement techniques resolved a multi-crore property fraud case.", gradient: "linear-gradient(135deg,#0A1A40,#0057FF)" },
  { slug: "dna-profiling", tag: "Biological Analysis", badge: "DNA Profiling", title: "DNA Profiling for Identity Verification", description: "Genetic marker extraction and STR analysis provided precise individual identification in a complex insurance fraud investigation.", gradient: "linear-gradient(135deg,#0F2A1A,#0F6E56)" },
  { slug: "ballistics-analysis", tag: "Physical Evidence", badge: "Ballistics", title: "Ballistics Analysis — Shooting Incident", description: "Firearm discharge residue testing and projectile trajectory reconstruction provided critical evidence for law enforcement.", gradient: "linear-gradient(135deg,#2A0A0A,#993C1D)" },
  { slug: "cyber-forensics", tag: "Digital Forensics", badge: "Cyber Forensics", title: "Cyber Forensics — Encrypted Device Recovery", description: "Digital evidence recovery from encrypted devices and network intrusion analysis delivered actionable intelligence for prosecution.", gradient: "linear-gradient(135deg,#0A1A2A,#185FA5)" },
  { slug: "signature-forgery", tag: "Document Examination", badge: "Graphology", title: "Signature Forgery in Banking Fraud", description: "Expert handwriting analysis and signature comparison uncovered a systematic banking fraud scheme worth several crores.", gradient: "linear-gradient(135deg,#1A1A0A,#3B6D11)" },
  { slug: "blood-pattern-analysis", tag: "Biological Forensics", badge: "Blood Analysis", title: "Blood Pattern Analysis — Crime Scene", description: "Comprehensive blood spatter and pattern analysis at a crime scene provided key evidence in a high-profile investigation.", gradient: "linear-gradient(135deg,#1A0A1A,#533AB7)" },
];

export async function CaseStudies() {
  await dbConnect();
  const docs = await CaseStudy.find().sort({ order: 1 }).lean();
  const items = docs.length > 0 ? JSON.parse(JSON.stringify(docs)) : fallback;
  return <CaseStudiesClient items={items} />;
}
