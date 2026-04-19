import "dotenv/config";
import { dbConnect } from "../lib/db";
import { Career } from "../lib/models/career";

const data = [
  { slug: "forensic-scientist-dna-analysis", title: "Forensic Scientist — DNA Analysis", location: "Mumbai, India", type: "Full-time", description: "Conduct DNA extraction, amplification, and STR profiling for criminal and civil investigations.", requirements: "M.Sc. in Forensic Science or Genetics\nMinimum 2 years lab experience\nKnowledge of PCR and electrophoresis techniques", applyLink: "", order: 0 },
  { slug: "questioned-document-examiner", title: "Questioned Document Examiner", location: "Delhi, India", type: "Full-time", description: "Examine handwriting, signatures, and printed documents to detect forgery and authenticate evidence.", requirements: "Degree in Forensic Science\nCertification in document examination\nExperience with VSC and ESDA instruments", applyLink: "", order: 1 },
  { slug: "cyber-forensics-analyst", title: "Cyber Forensics Analyst", location: "Bangalore, India", type: "Full-time", description: "Recover and analyse digital evidence from computers, mobile devices, and network systems.", requirements: "B.Tech/M.Tech in Computer Science or Cyber Security\nExperience with EnCase, FTK, or Cellebrite\nKnowledge of chain-of-custody protocols", applyLink: "", order: 2 },
  { slug: "crime-scene-investigator", title: "Crime Scene Investigator", location: "Hyderabad, India", type: "Full-time", description: "Process crime scenes, collect physical evidence, and document findings for forensic analysis.", requirements: "B.Sc. in Forensic Science or Criminology\nField investigation experience\nPhotography and evidence packaging skills", applyLink: "", order: 3 },
  { slug: "forensic-lab-intern", title: "Forensic Lab Intern", location: "Mumbai, India", type: "Internship", description: "Assist senior scientists in sample preparation, testing, and documentation across multiple forensic disciplines.", requirements: "Currently pursuing B.Sc./M.Sc. in Forensic Science\nStrong attention to detail\nWillingness to learn and follow SOPs", applyLink: "", order: 4 },
  { slug: "business-development-executive", title: "Business Development Executive", location: "Pan India", type: "Full-time", description: "Drive client acquisition and partnerships across insurance, legal, and corporate sectors for forensic services.", requirements: "MBA or equivalent\n2+ years in B2B sales\nUnderstanding of forensic or investigation industry preferred", applyLink: "", order: 5 },
];

async function seed() {
  await dbConnect();
  await Career.deleteMany({});
  await Career.insertMany(data);
  console.log(`${data.length} careers seeded.`);
  process.exit(0);
}

seed().catch((err) => { console.error("Seed failed:", err); process.exit(1); });
