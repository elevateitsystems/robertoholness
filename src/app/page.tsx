import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { SeasonalBanner } from "@/components/sections/SeasonalBanner";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { BottomShopCTA } from "@/components/sections/BottomShopCTA";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <SeasonalBanner />
      <ServicesOverview />
      <GoogleReviews />
      <InstagramFeed />
      <BottomShopCTA />
    </div>
  );
}
