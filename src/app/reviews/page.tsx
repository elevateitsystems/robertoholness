import { PageHero } from "@/components/sections/PageHero";
import { ReviewsList } from "./components/ReviewsList";

export const metadata = {
  title: "Reviews | Simply Diego's",
  description: "See what our customers have to say about our products and services.",
};

export default function ReviewsPage() {
  return (
    <main className="flex flex-col w-full">
      <PageHero
        title="Customer"
        highlightedWord="Reviews"
        description="We take pride in serving the Albuquerque pet community. Read through thousands of honest reviews from pet parents like you."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Reviews" }]}
      />
      <ReviewsList />
    </main>
  );
}
