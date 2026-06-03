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
  createdAt: string;
  user: {
    firstName?: string;
    lastName?: string;
    displayName?: string;
  };
}

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);

  const words = review.description.trim().split(/\s+/).filter(Boolean);
  const overflow = words.length > 20;

  const visibleDescription =
    overflow && !expanded
      ? `${words.slice(0, 20).join(" ")}...`
      : review.description;

  const authorName =
    `${review.user?.firstName || ""} ${review.user?.lastName || ""}`.trim() ||
    review.user?.displayName ||
    "Anonymous";

  return (
    <div className="bg-[#f4fce3] border border-[#d2f094] text-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-lg min-h-[260px] flex-shrink-0">
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

      <div className="mt-4 flex-1">
        <p className="text-slate-700 text-sm md:text-base font-semibold leading-relaxed italic">
          “{visibleDescription}”
        </p>

        {overflow && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="text-sm font-semibold text-secondary hover:text-secondary-dark transition-colors p-0"
          >
            {expanded ? "See less" : "See more"}
          </button>
        )}
      </div>

      <h4 className="text-[#017ce8] font-extrabold text-sm md:text-base uppercase tracking-wide mt-4">
        {authorName}
      </h4>
    </div>
  );
}

function ReviewCardsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-[#f4fce3] border border-[#d2f094] rounded-3xl p-6 md:p-8 shadow-lg h-[260px] animate-pulse"
        >
          <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
          <div className="space-y-3 mb-6">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
          <div className="h-5 w-32 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}

export function CustomerReviews() {
  const user = useAppStore((state: any) => state.user);
  const setUser = useAppStore((state: any) => state.setUser);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState<number>(5);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [cardsToShow, setCardsToShow] = useState<number>(3);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<"form" | "login">("form");

  const [ratingInput, setRatingInput] = useState(5);
  const [descriptionInput, setDescriptionInput] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  const [submitSubmitting, setSubmitSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // =========================
  // FETCH REVIEWS
  // =========================
  const loadReviews = async () => {
    try {
      setLoading(true);
      const res = await reviewsApi.getAll();

      if (res.success && res.data) {
        setReviews(res.data);
        setAvgRating(res.meta?.pagination?.avgRating || 5);
        setTotalReviews(res.meta?.pagination?.total || res?.data?.length);
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

  // =========================
  // RESPONSIVE (NO LISTENERS)
  // =========================
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 639px)");
    const tablet = window.matchMedia(
      "(min-width: 640px) and (max-width: 1023px)",
    );
    const desktop = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      if (mobile.matches) setCardsToShow(1);
      else if (tablet.matches) setCardsToShow(2);
      else if (desktop.matches) setCardsToShow(3);
    };

    update();

    mobile.addEventListener("change", update);
    tablet.addEventListener("change", update);
    desktop.addEventListener("change", update);

    return () => {
      mobile.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
      desktop.removeEventListener("change", update);
    };
  }, []);

  // =========================
  // CAROUSEL LOGIC
  // =========================
  const maxIndex = Math.max(0, reviews.length - cardsToShow);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const totalDots = maxIndex + 1;

  // =========================
  // MODAL + AUTH LOGIC (UNCHANGED)
  // =========================
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

    if (!user) {
      setModalStep("login");
      return;
    }

    try {
      setSubmitSubmitting(true);
      await reviewsApi.create({
        rating: ratingInput,
        description: descriptionInput,
      });

      setSubmitSuccess(true);

      setTimeout(() => {
        setIsModalOpen(false);
        loadReviews();
      }, 2000);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit review");
    } finally {
      setSubmitSubmitting(false);
    }
  };

  const handleInlineLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoginSubmitting(true);
      const res = await authApi.login({
        email: loginEmail,
        password: loginPassword,
      });

      setUser(res.data.user);
      setModalStep("form");
    } catch (err: any) {
      setLoginError(err.message || "Login failed");
    } finally {
      setLoginSubmitting(false);
    }
  };

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
            <div className="bg-white rounded-3xl p-8 shadow-md">
              <ReviewCardsSkeleton />
            </div>
          ) : reviews.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-md">
              <p className="text-gray-500 font-medium">
                No reviews yet. Be the first to leave one!
              </p>
            </div>
          ) : (
            <div className="relative">
              <div className="overflow-hidden">
                <motion.div
                  className="flex gap-6 py-6"
                  animate={{
                    x: `-${currentIndex * (100 / cardsToShow)}%`,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="flex-shrink-0"
                      style={{
                        flex: `0 0 ${100 / cardsToShow}%`,
                      }}
                    >
                      <ReviewCard review={review} />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* ARROWS */}
              {reviews.length > cardsToShow && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white text-secondary w-10 h-10 rounded-full shadow flex items-center justify-center"
                  >
                    <ChevronLeft />
                  </button>

                  <button
                    onClick={nextSlide}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white text-secondary w-10 h-10 rounded-full shadow flex items-center justify-center"
                  >
                    <ChevronRight />
                  </button>
                </>
              )}

              {/* DOTS */}
              {totalDots > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {[...Array(totalDots)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-2 rounded-full transition-all ${
                        currentIndex === i
                          ? "w-8 bg-secondary"
                          : "w-2 bg-secondary/30"
                      }`}
                    />
                  ))}
                </div>
              )}
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
