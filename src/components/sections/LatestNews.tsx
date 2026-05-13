"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/blogData";
import { BlogCard } from "@/app/blog/components/BlogCard";

const ArrowRight = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export function LatestNews() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsVisible = 3;
  const maxIndex = blogPosts.length - itemsVisible;

  const next = () => {
    setStartIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setStartIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="mb-16">
          <p className="text-secondary/50 text-sm font-semibold uppercase tracking-wider mb-2">
            🐾 Recent Blog Post
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-secondary">
            Latest <span className="text-primary">News</span> & Articles
          </h2>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-12">
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all z-20"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all z-20"
          >
            <ChevronRight />
          </button>

          <div className="overflow-hidden py-4">
            <motion.div
              className="flex gap-6 md:gap-8"
              initial={false}
              animate={{ x: `-${startIndex * (100 / itemsVisible)}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {blogPosts.map((post, i) => (
                <div
                  key={i}
                  className="min-w-full md:min-w-[calc(33.333%-1.5rem)] lg:min-w-[calc(33.333%-1.5rem)]"
                >
                  <BlogCard post={post} index={i} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="mt-16">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-[5px] px-10 font-semibold border-2 border-secondary/20 text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
          >
            <Link href="/blog" className="flex items-center gap-2">
              <span>View All Blog</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
