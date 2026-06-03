import { HeroSection } from "@/components/sections/HeroSection";
import { BottomShopCTA } from "@/components/sections/BottomShopCTA";
import { DeliveryInfoSection } from "@/components/sections/DeliveryInfoSection";
import { SocialMediaSection } from "@/components/sections/SocialMediaSection";
import { CustomerReviews } from "@/components/sections/CustomerReviews";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <DeliveryInfoSection />
      <CustomerReviews />
      <SocialMediaSection />
      <BottomShopCTA />
    </div>
  );
}

