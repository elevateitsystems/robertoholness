import { PageHero } from "@/components/sections/PageHero";
import { PolicyContent } from "@/components/sections/PolicyContent";

export const metadata = {
  title: "Privacy Policy | Simply Diego's",
  description: "Simply Diego's privacy policy.",
};

const sections = [
  {
    title: "Our Commitment",
    content:
      "At Simply Diego’s, we care about our customers, their pets, and their privacy. This policy explains how we collect, use, and protect personal information when you visit our website, contact us, place an order, or book a service.",
  },
  {
    title: "Information We Collect",
    content: [
      "Depending on how you interact with us, we may collect:",
      "Contact information: Your name, email address, phone number, and billing or delivery address.",
      "Order information: Products purchased, delivery or pickup instructions, and transaction history.",
      "Appointment information: Details needed to schedule and manage your DIY dog wash.",
      "Information you provide: Messages, questions, feedback, and pet information you choose to share.",
      "Payments are handled through our payment service providers. Please do not send credit card details through email, text messages, or website contact forms.",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "We use personal information to:",
      "Process orders and arrange delivery or pickup.",
      "Schedule and manage appointments.",
      "Answer questions and provide customer support.",
      "Send order confirmations, appointment reminders, and service updates.",
      "Send promotional communications when you have agreed to receive them.",
      "Maintain business records, prevent fraud, and meet legal obligations.",
    ],
  },
  {
    title: "Cookies and Website Technology",
    content: "",
  },
  {
    title: "When Information Is Shared",
    content: [
      "We may provide information to service providers that help us operate our business, such as providers supporting online ordering, payment processing, appointment scheduling, delivery, website hosting, and customer communications.",
      "We limit these disclosures to information needed for the relevant service. We may also disclose information when required by law or when reasonably necessary to protect our customers, business, or legal rights.",
      "Simply Diego’s does not sell personal information or share it with third parties for their own marketing or targeted advertising.",
    ],
  },
  {
    title: "Email and Text Messages",
    content: [
      "You may choose to receive promotional emails or text messages from Simply Diego’s. Consent to marketing messages is not a condition of purchase.",
      "You can unsubscribe from promotional emails using the unsubscribe link included in those messages.",
      "For text messages, reply STOP to opt out or HELP for assistance. Message frequency varies, and message and data rates may apply. You may still receive necessary non-marketing communications through other appropriate channels.",
      "Mobile opt-in information and consent are not shared with third parties or affiliates for marketing or promotional purposes. Information may be provided to service providers only as needed to operate the messaging program.",
    ],
  },
  {
    title: "Keeping Information Secure",
    content: [
      "We use reasonable administrative and technical safeguards designed to protect personal information. However, no internet transmission or electronic storage system can be guaranteed completely secure.",
      "We retain information only as reasonably necessary to provide services, maintain required records, resolve disputes, and satisfy legal obligations.",
    ],
  },
  {
    title: "Your Privacy Choices",
    content: [
      "You may contact us to request access to, correction of, or deletion of personal information we maintain about you. We will respond as required by applicable law and may need to verify your identity.",
      "Some information may need to be retained for legal, accounting, security, or transaction-related purposes.",
    ],
  },
  {
    title: "Other Websites and Services",
    content:
      "Our website links to third-party services, including online shopping, appointment booking, and social media platforms. Those services may collect information under their own privacy policies. Please review their policies when using them.",
  },
  {
    title: "Children’s Privacy",
    content:
      "Our website and online services are intended for a general audience and are not directed to children under 13. If you believe a child under 13 has provided personal information to us, please contact us so we can investigate and take appropriate action.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update this policy as our services or practices change. The current version will be posted on this page with an updated effective date. Where required, we will provide additional notice.",
  },
  {
    title: "Contact Us",
    content: [
      "For privacy questions or requests, contact:",
      "Simply Diego’s",
      "3301 Menaul Blvd NE, Suite 10, Albuquerque, NM 87107",
      "Email: info@simplydiegos.com",
      "Phone: 505-990-0099",
      "Website: www.simplydiegos.com",
    ],
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
