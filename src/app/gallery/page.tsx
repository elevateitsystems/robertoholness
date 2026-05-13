import { PageHero } from "@/components/sections/PageHero";
import { GalleryContent } from "./components/GalleryContent";

export const metadata = {
  title: "Gallery | Simply Diego's",
  description: "Explore our collection of happy pets and satisfied customers.",
};

export default function GalleryPage() {
  return (
    <main className="flex flex-col w-full">
      <PageHero
        title="Our"
        highlightedWord="Gallery"
        description="A peek into the happy lives of the pets we serve. From grooming sessions to play time, see why families trust Simply Diego's."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />
      <GalleryContent />
    </main>
  );
}
