"use client";

import { useEffect, useState } from "react";
import { ReviewSummary } from "./ReviewSummary";
import { ReviewCard } from "./ReviewCard";
import { ChevronDown, MessageSquare } from "lucide-react";
import { LeaveReview } from "./LeaveReview";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const reviewData = {
  averageRating: 4.0,
  totalRatings: 35000,
  distribution: [
    { stars: 5.0, count: "14K", percentage: 70 },
    { stars: 4.0, count: "6K", percentage: 45 },
    { stars: 3.0, count: "4K", percentage: 30 },
    { stars: 2.0, count: "800", percentage: 15 },
    { stars: 1.0, count: "9K", percentage: 60 },
  ],
  subScores: [
    { label: "Cleanliness", score: 4.0 },
    { label: "Safety & Security", score: 4.0 },
    { label: "Staff", score: 4.0 },
    { label: "Amenities", score: 3.5 },
  ],
  reviews: [
    {
      author: "Alexander Rity",
      avatar: "https://i.pravatar.cc/150?u=alex",
      date: "4 months ago",
      rating: 5.0,
      comment:
        "Simply Diego's has been a life saver for my pup. The nutritional counseling was top notch and the local delivery is always on time. Highly recommended for any pet owner in Albuquerque!",
      images: [
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=200",
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200",
        "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=200",
        "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&q=80&w=200",
      ],
    },
    {
      author: "Emma Crieght",
      avatar: "https://i.pravatar.cc/150?u=emma",
      date: "4 months ago",
      rating: 4.0,
      comment:
        "The DIY dog wash is a game changer! No more mess in my bathroom. The staff is friendly and the store is always clean. Only reason for 4 stars is that they are sometimes very busy on weekends!",
    },
    {
      author: "Michael Peterson",
      avatar: "https://i.pravatar.cc/150?u=michael",
      date: "2 months ago",
      rating: 5.0,
      comment:
        "Great selection of high-quality food. My dog has allergies and the team helped me find the perfect grain-free diet. The rewards program is also quite generous.",
    },
  ],
};

export function ReviewsList() {
  const [reviews, setReviews] = useState(reviewData);

  useEffect(() => {
    async function loadGoogleReviews() {
      try {
        const response = await fetch("/api/google-reviews");
        const payload = await response.json();

        if (payload?.data?.reviews?.length) {
          const dynamicReviews = payload.data.reviews;
          const total = payload.data.totalRatings || dynamicReviews.length;

          setReviews({
            ...reviewData,
            averageRating: payload.data.averageRating || reviewData.averageRating,
            totalRatings: total,
            distribution: reviewData.distribution.map((item) => ({
              ...item,
              count: item.stars === 5 ? String(total) : "0",
              percentage: item.stars === 5 ? 100 : 0,
            })),
            reviews: dynamicReviews.map((review: any) => ({
              author: review.author || "Google reviewer",
              avatar: review.avatar || "https://i.pravatar.cc/150?u=google",
              date: review.date || "",
              rating: review.rating || 5,
              comment: review.comment || "",
            })),
          });
        }
      } catch {
        // Static review content is used when Google integration is not configured.
      }
    }

    loadGoogleReviews();
  }, []);

  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-black text-secondary mb-6">Reviews</h2>

        <div className="md:flex gap-6 items-start justify-center">
          {/* Left Column: Summary and Leave Review */}
          <div className="space-y-6">
            <ReviewSummary
              averageRating={reviews.averageRating}
              totalRatings={reviews.totalRatings}
              distribution={reviews.distribution}
              subScores={reviews.subScores}
            />

            {/* Leave Review Section: Hidden on mobile (will show at bottom) */}
            <div className="hidden lg:block">
              <LeaveReview />
            </div>
          </div>

          {/* Right Column: Reviews List */}

          <div className="bg-white rounded-[5px] shadow-sm border border-black/5 px-6 md:px-12">
            {reviews.reviews.map((review, i) => (
              <ReviewCard key={i} {...review} index={i} />
            ))}

            <div className="py-8 border-t border-black/5 text-center">
              <Button
                // variant="transparant"
                className="bg-transparent hover:bg-transparent cursor-pointer p-0 inline-flex items-center gap-2 text-primary font-semibold hover:opacity-80 transition-opacity"
              >
                <span>Read all reviews</span>
                <ChevronDown size={20} />
              </Button>
            </div>
          </div>

          {/* Leave Review Section: Visible only on mobile at the bottom */}
          <div className="lg:hidden order-3">
            <LeaveReview />
          </div>
        </div>
      </div>
    </div>
  );
}
