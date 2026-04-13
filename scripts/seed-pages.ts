import "dotenv/config";
import { dbConnect } from "../lib/db";
import { PageContent } from "../lib/models/page-content";

const pages = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    content: `<h2>Introduction</h2><p>ForensiLabs is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our services or visit our website.</p><h2>Information We Collect</h2><ul><li>Personal identification information (name, email, phone number)</li><li>Case-related data submitted for forensic analysis</li><li>Website usage data and cookies</li><li>Communication records between you and our team</li></ul><h2>How We Use Your Information</h2><p>We use collected information to:</p><ul><li>Provide and improve our forensic laboratory services</li><li>Process and manage case submissions</li><li>Communicate with you regarding your cases and inquiries</li><li>Comply with legal obligations and court orders</li><li>Maintain the security of our systems and data</li></ul><h2>Data Security</h2><p>We implement industry-standard security measures including encryption, access controls, and secure storage to protect your personal and case-related data. All forensic evidence is handled following strict chain-of-custody protocols.</p><h2>Data Retention</h2><p>We retain personal data only as long as necessary to fulfill the purposes outlined in this policy or as required by law. Case-related data may be retained for extended periods as required by legal and regulatory obligations.</p><h2>Your Rights</h2><p>You have the right to access, correct, or request deletion of your personal data. Contact us at info@forensilabs.com for any privacy-related requests.</p><h2>Contact Us</h2><p>If you have questions about this Privacy Policy, please contact us at info@forensilabs.com or call +1 (555) 000-0000.</p>`,
  },
  {
    slug: "terms-of-service",
    title: "Terms of Service",
    content: `<h2>Acceptance of Terms</h2><p>By accessing or using ForensiLabs services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p><h2>Services</h2><p>ForensiLabs provides forensic science laboratory services including but not limited to DNA analysis, toxicology testing, digital forensics, ballistics investigation, and trace evidence analysis. All services are performed by certified professionals following accredited methodologies.</p><h2>Client Responsibilities</h2><ul><li>Provide accurate and complete information for all case submissions</li><li>Maintain proper chain of custody for all evidence submitted</li><li>Comply with all applicable laws regarding evidence handling</li><li>Make timely payments for services rendered</li></ul><h2>Confidentiality</h2><p>All case information, evidence, and results are treated as strictly confidential. We will not disclose any information to third parties except as required by law or with your explicit written consent.</p><h2>Limitation of Liability</h2><p>ForensiLabs provides forensic analysis based on the evidence and information provided. While we strive for the highest accuracy, we cannot guarantee specific outcomes in legal proceedings. Our liability is limited to the fees paid for the specific service in question.</p><h2>Intellectual Property</h2><p>All reports, methodologies, and proprietary processes developed by ForensiLabs remain our intellectual property. Clients receive a license to use reports for their intended legal or investigative purposes.</p><h2>Governing Law</h2><p>These terms are governed by the laws of the State of California. Any disputes shall be resolved in the courts of California.</p><h2>Changes to Terms</h2><p>We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of updated terms.</p>`,
  },
];

async function seed() {
  await dbConnect();
  for (const page of pages) {
    const existing = await PageContent.findOne({ slug: page.slug });
    if (existing) { console.log(`${page.slug} already exists, skipping.`); continue; }
    await PageContent.create(page);
    console.log(`${page.slug} seeded.`);
  }
  process.exit(0);
}

seed().catch((e) => { console.error("Seed failed:", e); process.exit(1); });
