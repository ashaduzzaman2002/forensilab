import "dotenv/config";
import { dbConnect } from "../lib/db";
import { Seo } from "../lib/models/seo";

const data = [
  { page: "home", title: "ForensiLabs — Forensic Science Laboratory", description: "Empowering justice through scientific analysis. Premier forensic laboratory offering DNA analysis, toxicology, digital forensics, and more.", keywords: "forensic laboratory, DNA analysis, toxicology, digital forensics, ballistics, crime scene investigation" },
  { page: "about", title: "About — ForensiLabs", description: "Trusted experts in forensic and digital investigation with over a decade of experience.", keywords: "about forensilabs, forensic experts, certified analysts, accredited laboratory" },
  { page: "services", title: "Services — ForensiLabs", description: "Comprehensive forensic solutions powered by cutting-edge technology and expert analysis.", keywords: "forensic services, DNA profiling, cyber forensics, toxicology testing, ballistics analysis" },
  { page: "team", title: "Our Team — ForensiLabs", description: "Meet our world-class team of certified forensic professionals dedicated to delivering justice.", keywords: "forensic team, forensic experts, certified professionals" },
  { page: "gallery", title: "Gallery — ForensiLabs", description: "Browse documented forensic case files and evidence records from our investigations.", keywords: "forensic gallery, case files, evidence records, investigation photos" },
  { page: "locations", title: "Locations — ForensiLabs", description: "Find a ForensiLabs facility near you. Multiple locations across the country.", keywords: "forensic lab locations, laboratory near me, forensilabs offices" },
  { page: "privacy-policy", title: "Privacy Policy — ForensiLabs", description: "How ForensiLabs collects, uses, and protects your personal information.", keywords: "privacy policy, data protection, forensilabs privacy" },
  { page: "terms-of-service", title: "Terms of Service — ForensiLabs", description: "Terms and conditions for using ForensiLabs forensic laboratory services.", keywords: "terms of service, terms and conditions, forensilabs terms" },
];

async function seed() {
  await dbConnect();
  for (const item of data) {
    const existing = await Seo.findOne({ page: item.page });
    if (existing) { console.log(`${item.page} SEO exists, skipping.`); continue; }
    await Seo.create(item);
    console.log(`${item.page} SEO seeded.`);
  }
  process.exit(0);
}

seed().catch((e) => { console.error("Seed failed:", e); process.exit(1); });
