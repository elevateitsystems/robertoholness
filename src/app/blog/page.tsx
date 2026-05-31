"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { blogPosts } from "@/lib/blogData";
import { BlogCard } from "./components/BlogCard";
import { BlogHeroBanner } from "./components/BlogHeroBanner";
import { BlogSidebar } from "./components/BlogSidebar";
import { blogApi } from "@/lib/api/blog";

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

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [posts, setPosts] = useState(blogPosts);

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await blogApi.getPosts();
        const records = Array.isArray(res?.data?.items)
          ? res.data.items
          : Array.isArray(res?.data)
            ? res.data
            : [];

        if (records.length > 0) {
          setPosts(
            records.map((post: any) => {
              const createdAt = post.publishDate || post.createdAt || new Date().toISOString();
              const date = new Date(createdAt);

              return {
                slug: post.slug || post.id,
                title: post.title,
                excerpt: post.shortDesc || post.description || "",
                content: [post.content || post.description || ""],
                date: String(date.getDate()).padStart(2, "0"),
                month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
                year: String(date.getFullYear()),
                fullDate: date.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }),
                comments: 0,
                image: post.image?.url || "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=800",
                category: post.category?.name || "Pet Care",
                author: post.author?.displayName || post.author?.firstName || "Simply Diego's",
                authorAvatar: post.author?.avatar?.url || "https://i.pravatar.cc/150?img=12",
              };
            }),
          );
        }
      } catch {
        // Static blog content is used when CMS content is unavailable.
      }
    }

    loadPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full">
      <BlogHeroBanner
        title="Our"
        highlightedWord="Blog"
        description="At Simply Diego's, we go beyond just selling food. We provide tips, stories, and expert advice for keeping your furry friends happy, healthy, and loved."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      {/* Blog Grid + Sidebar */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 paw-pattern opacity-30" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
            {/* Left: Blog Cards */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post, i) => (
                  <BlogCard key={post.slug} post={post} index={i} />
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <PawIcon className="w-16 h-16 text-primary/20 mx-auto mb-4" />
                  <p className="text-secondary/50 text-lg font-semibold">
                    No posts found.
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory("All");
                      setSearchQuery("");
                    }}
                    className="mt-4 text-primary font-semibold hover:underline"
                  >
                    View all posts
                  </button>
                </motion.div>
              )}
            </div>

            {/* Right: Sidebar */}
            <BlogSidebar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
