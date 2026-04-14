import mongoose, { Schema } from "mongoose";

const CaseStudySchema = new Schema({
  slug: { type: String, required: true, unique: true },
  tag: { type: String, default: "" },
  badge: { type: String, default: "" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: "" },
  gradient: { type: String, default: "linear-gradient(135deg,#0A1A40,#0057FF)" },
  metaTitle: { type: String, default: "" },
  metaDescription: { type: String, default: "" },
  metaKeywords: { type: String, default: "" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

if (mongoose.models.CaseStudy) delete mongoose.models.CaseStudy;
export const CaseStudy = mongoose.model("CaseStudy", CaseStudySchema);
