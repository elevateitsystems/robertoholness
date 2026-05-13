import { PageHero } from "@/components/sections/PageHero";
import { PolicyContent } from "@/components/sections/PolicyContent";

export const metadata = {
  title: "Privacy Policy | Simply Diego's",
  description: "Learn how we collect, use, and protect your personal information.",
};

const sections = [
  {
    title: "Information We Collect",
    content: [
      "We collect information you provide directly to us when you create an account, make a purchase, or communicate with us. This may include your name, email address, phone number, and payment information.",
      "We also automatically collect certain information about your device and how you interact with our website using cookies and similar technologies.",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "To process your orders and provide the products and services you request.",
      "To communicate with you about your orders, account, and promotional offers.",
      "To improve our website, products, and customer service.",
      "To comply with legal obligations and protect our rights.",
    ],
  },
  {
    title: "Information Sharing",
    content:
      "We do not sell your personal information. We may share your information with third-party service providers who perform services on our behalf, such as payment processing and shipping.",
  },
  {
    title: "Your Choices",
    content:
      "You can update your account information and communication preferences at any time by logging into your account settings. You can also opt-out of receiving promotional emails by following the instructions in those emails.",
  },
  {
    title: "Security",
    content:
      "We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-col w-full">
      <PageHero
        title="Privacy"
        highlightedWord="Policy"
        description="Your privacy is important to us. This policy explains how we handle your data with care and transparency."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <PolicyContent sections={sections} />
    </main>
  );
}
