"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/blogData";
import { BlogCard } from "../components/BlogCard";
import { BlogHeroBanner } from "../components/BlogHeroBanner";
import { BlogPostHero } from "../components/BlogPostHero";
import { BlogPostContent } from "../components/BlogPostContent";
import { BlogPostFooter } from "../components/BlogPostFooter";

const PawIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <ellipse cx="12" cy="17" rx="4" ry="5" opacity="0.9" />
    <ellipse cx="6" cy="11" rx="2.5" ry="3" opacity="0.9" />
    <ellipse cx="18" cy="11" rx="2.5" ry="3" opacity="0.9" />
    <ellipse cx="8.5" cy="6" rx="2" ry="2.5" opacity="0.9" />
    <ellipse cx="15.5" cy="6" rx="2" ry="2.5" opacity="0.9" />
  </svg>
);

interface SingleBlogContentProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export function SingleBlogContent({
  post,
  relatedPosts,
}: SingleBlogContentProps) {
  return (
    <div className="flex flex-col w-full">
      {/* App Hero Banner — following services page pattern */}
      <BlogHeroBanner
        title="Recent"
        highlightedWord="News"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      {/* Blog Post Details */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Post Hero: Image + Overlaid info */}
            <BlogPostHero post={post} />

            {/* Article Content */}
            <BlogPostContent content={post.content} />

            {/* Tags + Share */}
            <BlogPostFooter category={post.category} />
          </div>
        </div>
      </section>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <p className="text-secondary/50 text-sm font-semibold uppercase tracking-wider mb-2">
                🐾 Keep Reading
              </p>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-secondary">
                Related <span className="text-primary">Articles</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {relatedPosts.map((relatedPost, i) => (
                <BlogCard
                  key={relatedPost.slug}
                  post={relatedPost}
                  index={i}
                />
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-[5px] border-2 border-secondary/20 text-secondary font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
              >
                <PawIcon className="w-4 h-4" />
                <span>View All Posts</span>
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
