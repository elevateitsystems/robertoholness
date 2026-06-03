"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, X, Loader2 } from "lucide-react";
import { reviewsApi } from "@/lib/api/reviews";
import { authApi } from "@/lib/api/auth";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

interface Review {
  id: string;
  description: string;
  rating: number;
  authorName: string;
  createdAt: string;
}

export function CustomerReviews() {
  const user = useAppStore((state: any) => state.user);
  const setUser = useAppStore((state: any) => state.setUser);

  // States
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState<number>(5);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Carousel
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [cardsToShow, setCardsToShow] = useState<number>(3);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<"form" | "login">("form");

  // Form input states
  const [ratingInput, setRatingInput] = useState<number>(5);
  const [descriptionInput, setDescriptionInput] = useState<string>("");

  // Login states
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSubmitting, setLoginSubmitting] = useState<boolean>(false);

  // Submit states
  const [submitSubmitting, setSubmitSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fetch reviews from backend
  const loadReviews = async () => {
    try {
      setLoading(true);
      const res = await reviewsApi.getAll();
      if (res.success && res.data) {
        const backendReviews = res.data.map((item: any) => ({
          id: item.id,
          description: item.description,
          rating: item.rating,
          authorName: item.user
            ? `${item.user.firstName || ""} ${item.user.lastName || ""}`.trim() ||
              item.user.displayName ||
              "Anonymous"
            : "Anonymous",
          createdAt: item.createdAt,
        }));

        setAvgRating(res.meta?.pagination?.avgRating || 5);
        setTotalReviews(res.meta?.pagination?.total || backendReviews.length);

        // Process reviews: Slice to first 10 for slider
        let list = backendReviews.slice(0, 10);

        // If backend has 3 or fewer reviews, repeat them to keep slider functional
        if (list.length > 0 && list.length <= 3) {
          const originalList = [...list];
          while (list.length < 8) {
            list = [
              ...list,
              ...originalList.map((r, i) => ({
                ...r,
                id: `${r.id}-dup-${list.length}-${i}`,
              })),
            ];
          }
        }
        setReviews(list);
      }
    } catch (err) {
      console.error("Failed to load reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  // Update cards in view depending on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation handlers
  const nextSlide = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % (reviews.length - cardsToShow + 1));
  };

  const prevSlide = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) =>
      prev === 0 ? reviews.length - cardsToShow : prev - 1,
    );
  };

  // Leave a review handlers
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setModalStep("form");
    setRatingInput(5);
    setDescriptionInput("");
    setLoginEmail("");
    setLoginPassword("");
    setLoginError(null);
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // If user is not logged in, switch to login form inline
    if (!user) {
      setModalStep("login");
      return;
    }

    // Submit review
    try {
      setSubmitSubmitting(true);
      await reviewsApi.create({
        rating: ratingInput,
        description: descriptionInput,
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        loadReviews(); // reload reviews
      }, 2000);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit review");
    } finally {
      setSubmitSubmitting(false);
    }
  };

  const handleInlineLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      setLoginSubmitting(true);
      const res = await authApi.login({
        email: loginEmail,
        password: loginPassword,
      });
      setUser(res.data.user);
      // Switch back to review form
      setModalStep("form");
    } catch (err: any) {
      setLoginError(err.message || "Failed to login. Please try again.");
    } finally {
      setLoginSubmitting(false);
    }
  };

  const totalDots = Math.max(0, reviews.length - cardsToShow + 1);

  return (
    <section className="py-16 bg-[#FFF8F0] relative overflow-hidden">
      <div className="pink-paw-pattern absolute inset-0 opacity-[0.035]" />
      {/* <div className="absolute inset-x-0 top-0 h-1 bg-secondary" /> */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Box Wrapper - Using Brand blue to deep-teal gradient */}
        <div className="bg-gradient-to-r from-secondary to-deep-teal rounded-[30px] p-8 md:p-12 text-white relative shadow-xl min-h-[300px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-10">
            {/* Left Header */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Customer Reviews
              </h2>
              <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-xl">
                We take pride in serving the Albuquerque pet community. Read
                through honest reviews from pet parents like you.
              </p>
              <div className="flex gap-4 pt-2">
                <button
                  onClick={handleOpenModal}
                  className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-[25px] transition-all duration-300 transform hover:scale-105 shadow-md cursor-pointer"
                >
                  Write A Review
                </button>
              </div>
            </div>

            {/* Right Aggregator Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white text-secondary-foreground rounded-[25px] p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-lg w-full max-w-[220px]">
                <span className="text-5xl font-black text-slate-800 leading-none">
                  {Number(avgRating).toFixed(1)}
                </span>
                <div className="flex gap-1 my-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(avgRating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                  {totalReviews} Reviews
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Overlay Container */}
        <div className="relative -mt-16 sm:-mt-20 md:-mt-24 px-4 sm:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 text-secondary animate-spin" />
            </div>
          ) : reviews.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-md">
              <p className="text-gray-500 font-medium">
                No reviews yet. Be the first to leave one!
              </p>
            </div>
          ) : (
            <div className="relative">
              {/* Slider Viewport */}
              <div className="overflow-hidden">
                <motion.div
                  className="flex gap-6 py-6"
                  animate={{
                    x: `calc(-${currentIndex * (100 / cardsToShow)}% - ${
                      currentIndex * (24 / cardsToShow)
                    }px)`,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{
                    width: `calc(${reviews.length * (100 / cardsToShow)}% + ${
                      (reviews.length - 1) * 24
                    }px)`,
                  }}
                >
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-[#f4fce3] border border-[#d2f094] text-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-lg h-[260px]"
                      style={{
                        width: `calc(100% / ${reviews.length} - 16px)`,
                      }}
                    >
                      {/* Star Rating inside card - using brand green color for stars */}
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            className={`h-4 w-4 ${
                              idx < review.rating
                                ? "fill-[#A2D600] text-[#A2D600]"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Review Comment */}
                      <p className="text-slate-700 text-sm md:text-base font-semibold leading-relaxed line-clamp-4 my-4 flex-grow italic">
                        &ldquo;{review.description}&rdquo;
                      </p>

                      {/* Review Author */}
                      <div>
                        <h4 className="text-[#017ce8] font-extrabold text-sm md:text-base truncate uppercase tracking-wide">
                          {review.authorName}
                        </h4>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Slider Navigation Arrows */}
              {totalDots > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute -left-4 sm:-left-8 top-1/2 -translate-y-1/2 bg-white text-secondary hover:bg-secondary hover:text-white w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10 cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-5 sm:h-6 w-5 sm:w-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute -right-4 sm:-right-8 top-1/2 -translate-y-1/2 bg-white text-secondary hover:bg-secondary hover:text-white w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10 cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-5 sm:h-6 w-5 sm:w-6" />
                  </button>
                </>
              )}

              {/* Slider Dots Indicator */}
              {/* {totalDots > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {[...Array(totalDots)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        currentIndex === index
                          ? "w-8 bg-secondary"
                          : "w-2 bg-secondary/30 hover:bg-secondary/60"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )} */}
            </div>
          )}
        </div>
      </div>

      {/* Write a Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-md relative"
            >
              {/* Header */}
              <div className="bg-secondary text-white p-6 relative">
                <h3 className="text-xl md:text-2xl font-bold">
                  {modalStep === "form" ? "Write a Review" : "Please Log In"}
                </h3>
                <p className="text-white/80 text-sm mt-1">
                  {modalStep === "form"
                    ? "Share your experience with our community"
                    : "Log in to authenticate your review"}
                </p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-white hover:text-white/75 transition-colors cursor-pointer"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {modalStep === "form" ? (
                  // Step 1: Write Review form
                  <form onSubmit={handleSubmitReview} className="space-y-5">
                    {submitError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-[5px] text-xs font-semibold text-center">
                        {submitError}
                      </div>
                    )}
                    {submitSuccess ? (
                      <div className="py-8 text-center space-y-3">
                        <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <h4 className="text-lg font-bold text-gray-800">
                          Thank you!
                        </h4>
                        <p className="text-sm text-gray-500">
                          Your review was submitted successfully.
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Rating Stars Input */}
                        <div className="space-y-2">
                          <label className="block text-sm font-bold text-gray-700">
                            Rating
                          </label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setRatingInput(star)}
                                className="focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                              >
                                <Star
                                  className={`h-8 w-8 ${
                                    star <= ratingInput
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Text description */}
                        <div className="space-y-2">
                          <label
                            htmlFor="description"
                            className="block text-sm font-bold text-gray-700"
                          >
                            Your Review
                          </label>
                          <Textarea
                            id="description"
                            value={descriptionInput}
                            onChange={(e) =>
                              setDescriptionInput(e.target.value)
                            }
                            placeholder="Tell us what you loved about our service..."
                            className="min-h-[120px] rounded-xl border-gray-200"
                            required
                          />
                        </div>

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          disabled={submitSubmitting}
                          className="w-full bg-[#017ce8] hover:bg-[#0056A3] text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {submitSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            "Submit Review"
                          )}
                        </Button>
                      </>
                    )}
                  </form>
                ) : (
                  // Step 2: Inline login form
                  <div className="space-y-5">
                    {loginError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-[5px] text-xs font-semibold text-center">
                        {loginError}
                      </div>
                    )}
                    <p className="text-gray-600 text-xs md:text-sm">
                      Please log in to complete your review. You will be
                      returned directly back to your written review.
                    </p>

                    <p className="text-xs md:text-sm text-gray-500 text-center">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/register"
                        className="text-primary hover:underline font-semibold cursor-pointer"
                      >
                        Register here
                      </Link>
                    </p>

                    <div className="relative flex py-1 items-center">
                      <div className="flex-grow border-t border-gray-100"></div>
                    </div>

                    <form onSubmit={handleInlineLogin} className="space-y-4">
                      <div className="space-y-1">
                        <label
                          htmlFor="email"
                          className="block text-xs font-bold text-gray-700 uppercase tracking-wider"
                        >
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="rounded-xl border-gray-200"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="password"
                          className="block text-xs font-bold text-gray-700 uppercase tracking-wider"
                        >
                          Password
                        </label>
                        <Input
                          id="password"
                          type="password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••"
                          className="rounded-xl border-gray-200"
                          required
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setModalStep("form")}
                          className="flex-1 border-gray-200 rounded-xl font-bold cursor-pointer"
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          disabled={loginSubmitting}
                          className="flex-1 bg-[#017ce8] hover:bg-[#0056A3] text-white font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {loginSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Logging In...
                            </>
                          ) : (
                            "Log In"
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
