import { dbConnect } from "@/lib/db";
import { Footer as FooterModel } from "@/lib/models/footer";
import { RequestQuoteClient } from "./request-quote-client";

export async function RequestQuote() {
  await dbConnect();
  const doc = await FooterModel.findOne().lean();
  if (!doc) return null;
  const data = JSON.parse(JSON.stringify(doc));
  return <RequestQuoteClient contact={{ phone: data.phone || "", email: data.email || "", website: data.website || "", address: data.address || "" }} />;
}
