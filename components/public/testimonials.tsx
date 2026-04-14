import { dbConnect } from "@/lib/db";
import { Testimonial } from "@/lib/models/testimonial";
import { TestimonialsClient } from "./testimonials-client";

export async function Testimonials() {
  await dbConnect();
  const docs = await Testimonial.find().sort({ order: 1 }).lean();
  if (docs.length === 0) return null;
  return <TestimonialsClient testimonials={JSON.parse(JSON.stringify(docs))} />;
}
