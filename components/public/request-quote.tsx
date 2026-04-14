import { dbConnect } from "@/lib/db";
import { Footer } from "@/lib/models/footer";
import { RequestQuoteClient } from "./request-quote-client";

const fallback = { phone: "8670790730", email: "forensibusindia@gmail.com", website: "www.forensilabs.in", address: "Kolkata · Raiganj · Patna" };

export async function RequestQuote() {
  await dbConnect();
  const doc = await Footer.findOne().lean();
  const data = doc ? { ...fallback, ...JSON.parse(JSON.stringify(doc)) } : fallback;
  return <RequestQuoteClient contact={{ phone: data.phone, email: data.email, website: data.website || fallback.website, address: data.address }} />;
}
