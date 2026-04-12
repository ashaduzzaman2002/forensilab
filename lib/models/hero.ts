import mongoose, { Schema, models, model } from "mongoose";

const HeroSchema = new Schema({
  heading: { type: String, required: true },
  subheading: { type: String, required: true },
  subtitle: { type: String, required: true },
  primaryBtnText: { type: String, required: true },
  primaryBtnLink: { type: String, required: true },
  secondaryBtnText: { type: String, required: true },
  secondaryBtnLink: { type: String, required: true },
  bgImage: { type: String, default: "" },
}, { timestamps: true });

export const Hero = models.Hero || model("Hero", HeroSchema);
