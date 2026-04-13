import "dotenv/config";
import { dbConnect } from "../lib/db";
import { Service } from "../lib/models/service";

const data = [
  {
    slug: "dna-analysis", title: "DNA Analysis", order: 0,
    description: "Advanced genetic profiling and individual identification",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-8"><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="M2 9c6.667 6 13.333 0 20 6"/></svg>',
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1200&auto=format&fit=crop",
    details: ["STR (Short Tandem Repeat) profiling", "Mitochondrial DNA analysis", "Y-chromosome testing", "Familial DNA searching", "Degraded and touch DNA recovery", "Court-admissible reporting"],
  },
  {
    slug: "cyber-forensics", title: "Cyber Forensics", order: 1,
    description: "Digital evidence recovery and network intrusion analysis",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 8h2m2 0h4"/><path d="M7 11h8"/></svg>',
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    details: ["Hard drive and SSD forensic imaging", "Mobile device data extraction", "Network traffic analysis", "Malware reverse engineering", "Email and social media forensics", "Cloud storage investigation"],
  },
  {
    slug: "ballistics", title: "Ballistics Investigation", order: 2,
    description: "Firearm discharge residue and projectile trajectory analysis",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop",
    details: ["Bullet and cartridge comparison", "Gunshot residue (GSR) analysis", "Trajectory reconstruction", "Firearm identification and classification", "Tool mark examination", "Distance determination testing"],
  },
  {
    slug: "toxicology", title: "Toxicology Testing", order: 3,
    description: "Detection of drugs, poisons and chemical substances",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-8"><path d="M9 3h6v3H9z"/><path d="M8 6l-3 14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2L16 6"/><path d="M7 15h10"/></svg>',
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1200&auto=format&fit=crop",
    details: ["Blood alcohol concentration testing", "Drug screening and confirmation", "Poison and heavy metal detection", "Post-mortem toxicology", "Workplace drug testing", "Pharmaceutical analysis"],
  },
  {
    slug: "digital-evidence", title: "Digital Evidence Recovery", order: 4,
    description: "Encrypted device data extraction and forensic imaging",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-8"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/><path d="M4 9h1m14 0h1M4 15h1m14 0h1M9 4v1m6-1v1M9 19v1m6-1v1"/></svg>',
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    details: ["Deleted file recovery", "Encrypted volume decryption", "Forensic disk imaging", "Metadata analysis", "Database reconstruction", "Chain of custody documentation"],
  },
  {
    slug: "fingerprint-analysis", title: "Fingerprint Analysis", order: 5,
    description: "Latent print identification using chemical and digital enhancement",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-8"><path d="M12 2a10 10 0 0 1 7.07 17.07"/><path d="M12 6a6 6 0 0 1 4.24 10.24"/><path d="M12 10a2 2 0 0 1 1.41 3.41"/><path d="M2 12h2"/><path d="M12 22v-2"/></svg>',
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1200&auto=format&fit=crop",
    details: ["Latent print development", "AFIS database searching", "Chemical enhancement methods", "Digital print comparison", "Palm and footprint analysis", "Expert testimony support"],
  },
  {
    slug: "trace-evidence", title: "Trace Evidence", order: 6,
    description: "Microscopic material, fiber and residue analysis",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><circle cx="11" cy="11" r="3"/></svg>',
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1200&auto=format&fit=crop",
    details: ["Fiber and textile analysis", "Glass fragment comparison", "Paint chip examination", "Hair and soil analysis", "Gunshot residue detection", "Microscopic particle identification"],
  },
  {
    slug: "document-examination", title: "Document Examination", order: 7,
    description: "Handwriting analysis, forgery and document verification",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></svg>',
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1200&auto=format&fit=crop",
    details: ["Handwriting comparison", "Signature verification", "Ink and paper analysis", "Altered document detection", "Typewriter and printer identification", "Indented writing recovery"],
  },
  {
    slug: "crime-scene", title: "Crime Scene Investigation", order: 8,
    description: "On-site evidence collection and scene reconstruction",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-8"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l8 8"/></svg>',
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop",
    details: ["Evidence collection and preservation", "Crime scene photography", "Bloodstain pattern analysis", "3D scene reconstruction", "Forensic mapping and sketching", "Chain of custody management"],
  },
];

async function seed() {
  await dbConnect();
  const count = await Service.countDocuments();
  if (count > 0) {
    console.log(`${count} services already exist, skipping seed.`);
    process.exit(0);
  }
  await Service.insertMany(data);
  console.log(`${data.length} services seeded.`);
  process.exit(0);
}

seed().catch((err) => { console.error("Seed failed:", err); process.exit(1); });
