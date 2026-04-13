import mongoose, { Schema } from "mongoose";

const PageContentSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, default: "" },
}, { timestamps: true });

if (mongoose.models.PageContent) delete mongoose.models.PageContent;
export const PageContent = mongoose.model("PageContent", PageContentSchema);
