import mongoose, { Schema } from "mongoose";

const SectionSchema = new Schema({
  title: { type: String, default: "" },
  content: { type: String, default: "" },
  image: { type: String, default: "" },
}, { _id: false });

const AboutSchema = new Schema({
  subtitle: { type: String, default: "" },
  whoWeAre: { type: SectionSchema, default: () => ({}) },
  whatWeDo: { type: SectionSchema, default: () => ({}) },
  others: { type: SectionSchema, default: () => ({}) },
  stats: [{ value: { type: String }, label: { type: String } }],
}, { timestamps: true });

if (mongoose.models.About) delete mongoose.models.About;
export const About = mongoose.model("About", AboutSchema);
