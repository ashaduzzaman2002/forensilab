import mongoose, { Schema } from "mongoose";

const FooterSchema = new Schema({
  description: { type: String, default: "" },
  phone: { type: String, default: "" },
  email: { type: String, default: "" },
  website: { type: String, default: "" },
  address: { type: String, default: "" },
  quickLinks: [{ label: { type: String }, href: { type: String } }],
  socialLinks: { facebook: { type: String, default: "" }, twitter: { type: String, default: "" }, linkedin: { type: String, default: "" }, instagram: { type: String, default: "" } },
}, { timestamps: true });

if (mongoose.models.Footer) delete mongoose.models.Footer;
export const Footer = mongoose.model("Footer", FooterSchema);
