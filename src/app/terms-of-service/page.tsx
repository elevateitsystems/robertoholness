import { PageHero } from "@/components/sections/PageHero";
import { PolicyContent } from "@/components/sections/PolicyContent";

export const metadata = {
  title: "Terms of Service | Simply Diego's",
  description: "Read the terms and conditions for using our website and services.",
};

const sections = [
  {
    title: "Agreement to Terms",
    content:
      "By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
  },
  {
    title: "Use of the Site",
    content: [
      "You may use our site for lawful purposes only and in accordance with these Terms.",
      "You are responsible for maintaining the confidentiality of your account information.",
      "We reserve the right to refuse service, terminate accounts, or cancel orders at our discretion.",
    ],
  },
  {
    title: "Intellectual Property",
    content:
      "All content on this site, including text, graphics, logos, and images, is the property of Simply Diego's and is protected by copyright and other intellectual property laws.",
  },
  {
    title: "Product Information and Pricing",
    content: [
      "We strive to provide accurate product descriptions and pricing, but errors may occur.",
      "We reserve the right to correct any errors and to change or update information at any time without prior notice.",
    ],
  },
  {
    title: "Limitation of Liability",
    content:
      "Simply Diego's shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our website or products.",
  },
  {
    title: "Governing Law",
    content:
      "These Terms shall be governed by and construed in accordance with the laws of the State of New Mexico, without regard to its conflict of law provisions.",
  },
];

export default function TermsOfServicePage() {
  return (
    <main className="flex flex-col w-full">
      <PageHero
        title="Terms of"
        highlightedWord="Service"
        description="Please read these terms carefully before using our website. They outline our mutual rights and responsibilities."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
      />
      <PolicyContent sections={sections} />
    </main>
  );
}
