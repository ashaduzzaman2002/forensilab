import mongoose, { Schema } from "mongoose";

const TrustedBySchema = new Schema({
  name: { type: String, required: true },
  logo: { type: String, default: "" },
  link: { type: String, default: "" },
  order: { type: Number, default: 0 },
}, { timestamps: true });

if (mongoose.models.TrustedBy) delete mongoose.models.TrustedBy;
export const TrustedBy = mongoose.model("TrustedBy", TrustedBySchema);
