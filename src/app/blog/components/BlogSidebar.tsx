"use client";

import { blogCategories, blogPosts } from "@/lib/blogData";

const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const categoryCounts = blogCategories
  .filter((c) => c !== "All")
  .map((cat) => ({
    name: cat,
    count: blogPosts.filter((p) => p.category === cat).length,
  }));

interface BlogSidebarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function BlogSidebar({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}: BlogSidebarProps) {
  return (
    <div className="w-full lg:w-[320px] shrink-0 space-y-8">
      {/* Search */}
      <div className="bg-white rounded-[5px] shadow-sm border border-black/5 p-5">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 text-sm text-secondary bg-transparent outline-none placeholder:text-secondary/40 font-sans"
          />
          <SearchIcon className="text-primary shrink-0" />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-[5px] shadow-sm border border-black/5 p-6">
        <h3 className="text-lg font-black text-secondary mb-5">Categories</h3>
        <ul className="space-y-3">
          {categoryCounts.map((cat) => (
            <li key={cat.name}>
              <button
                onClick={() =>
                  onCategoryChange(
                    activeCategory === cat.name ? "All" : cat.name
                  )
                }
                className={`w-full flex items-center justify-between text-sm transition-colors ${
                  activeCategory === cat.name
                    ? "text-primary font-bold"
                    : "text-secondary/70 hover:text-primary"
                }`}
              >
                <span className="font-medium">{cat.name}</span>
                <span className="font-bold text-primary">{cat.count}</span>
              </button>
              <div className="mt-2 border-b border-dashed border-black/5" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
