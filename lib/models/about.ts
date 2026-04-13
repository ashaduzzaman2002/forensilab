import mongoose, { Schema } from "mongoose";

const AboutSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  content: { type: String, default: "" },
  image: { type: String, default: "" },
  highlights: [{ type: String }],
  stats: [{ value: { type: String }, label: { type: String } }],
}, { timestamps: true });

if (mongoose.models.About) delete mongoose.models.About;
export const About = mongoose.model("About", AboutSchema);
