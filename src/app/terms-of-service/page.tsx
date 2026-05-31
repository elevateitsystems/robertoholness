import { PageHero } from "@/components/sections/PageHero";
import { PolicyContent } from "@/components/sections/PolicyContent";

export const metadata = {
  title: "Terms of Service | Simply Diego's",
  description: "Read the terms and conditions for using our website and services.",
};

const sections = [
  {
    title: "Welcome",
    content:
      "Thanks for choosing Simply Diego's! These Terms explain how our services work and what we expect from each other. By using our website or services, you agree to these terms.",
  },
  {
    title: "Our Services",
    content:
      "We provide products and/or services related to our business. We may update or change services at any time to improve your experience.",
  },
  {
    title: "Using Our Services",
    content: [
      "Provide accurate information.",
      "Use our services responsibly.",
      "Do not misuse or disrupt our systems.",
      "Respect our business operations.",
    ],
  },
  {
    title: "Payments",
    content:
      "If you make a purchase, you agree to pay the listed price, including any applicable taxes. We may cancel orders if necessary, for example suspected fraud or pricing errors.",
  },
  {
    title: "SMS & Communication",
    content: [
      "If you provide your contact info, you may receive messages from us.",
      "Text message frequency may vary.",
      "Message and data rates may apply.",
      "Reply STOP to unsubscribe.",
      "Reply HELP for help.",
      "All messages come directly from Simply Diego's.",
    ],
  },
  {
    title: "Intellectual Property",
    content:
      "All content, branding, and materials from Simply Diego's belong to us and may not be used without permission.",
  },
  {
    title: "Limitation of Liability",
    content:
      "We do our best to provide reliable services, but we cannot guarantee perfection. We are not responsible for indirect or unexpected damages related to use of our services.",
  },
  {
    title: "Responsibility",
    content:
      "You agree to use our services responsibly and to hold Simply Diego's harmless from issues caused by misuse or violation of these terms.",
  },
  {
    title: "Changes to Terms",
    content:
      "We may update these Terms occasionally. Continued use of our services means you accept any updates.",
  },
  {
    title: "Contact Information",
    content: [
      "If you have questions, reach out anytime:",
      "Simply Diego's Email: info@simplydiegos.com",
      "Phone: 505-990-0099",
      "Website: www.SimplyDiegos.com",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <main className="flex flex-col w-full">
      <PageHero
        title="Terms of"
        highlightedWord="Service"
        description="Effective Date: May 21, 2026. Please read these terms carefully before using our website or services."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
      />
      <PolicyContent sections={sections} />
    </main>
  );
}
