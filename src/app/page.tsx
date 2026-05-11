import { HeroSection } from "@/components/sections/HeroSection";
import { WelcomeSection } from "@/components/sections/WelcomeSection";
import { GalleryOverview } from "@/components/sections/GalleryOverview";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { BottomShopCTA } from "@/components/sections/BottomShopCTA";
import { LatestNews } from "@/components/sections/LatestNews";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <WelcomeSection />
      <GalleryOverview />
      <GoogleReviews />
      <LatestNews />
      <InstagramFeed />
      <BottomShopCTA />
    </div>
  );
}
