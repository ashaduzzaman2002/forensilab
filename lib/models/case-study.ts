import mongoose, { Schema } from "mongoose";

const CaseStudySchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: "" },
  metaTitle: { type: String, default: "" },
  metaDescription: { type: String, default: "" },
  metaKeywords: { type: String, default: "" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

if (mongoose.models.CaseStudy) delete mongoose.models.CaseStudy;
export const CaseStudy = mongoose.model("CaseStudy", CaseStudySchema);
