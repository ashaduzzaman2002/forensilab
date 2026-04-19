import mongoose, { Schema } from "mongoose";

const GallerySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

if (mongoose.models.Gallery) delete mongoose.models.Gallery;
export const Gallery = mongoose.model("Gallery", GallerySchema);
