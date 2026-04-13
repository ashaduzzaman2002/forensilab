import mongoose, { Schema } from "mongoose";

const SeoSchema = new Schema({
  page: { type: String, required: true, unique: true },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  keywords: { type: String, default: "" },
  ogImage: { type: String, default: "" },
}, { timestamps: true });

if (mongoose.models.Seo) delete mongoose.models.Seo;
export const Seo = mongoose.model("Seo", SeoSchema);
