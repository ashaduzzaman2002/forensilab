import { dbConnect } from "@/lib/db";
import { Certification } from "@/lib/models/certification";
import { CertificationsClient } from "./certifications-client";

export async function Certifications() {
  await dbConnect();
  const docs = await Certification.find().sort({ order: 1 }).lean();
  const items = JSON.parse(JSON.stringify(docs));
  if (items.length === 0) return null;
  return <CertificationsClient items={items} />;
}
