"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/blogData";

const FolderIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M2 6a2 2 0 0 1 2-2h5l2 2h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6z" />
  </svg>
);

interface BlogPostHeroProps {
  post: BlogPost;
}

export function BlogPostHero({ post }: BlogPostHeroProps) {
  return (
    <div className="relative w-full aspect-[16/9] rounded-[5px] overflow-hidden shadow-xl">
      <Image
        src={post.image}
        alt={post.title}
        fill
        sizes="(max-width: 768px) 100vw, 900px"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl lg:text-4xl font-heading font-black text-white leading-[1.1] mb-3"
        >
          {post.title}
        </motion.h2>

        <div className="flex items-center gap-2 mb-5">
          <FolderIcon className="w-4 h-4 text-white/70" />
          <span className="text-sm font-semibold text-white/90">
            {post.category}
          </span>
        </div>

        <div className="w-12 h-[2px] bg-primary mb-5" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden relative border-2 border-white/30">
              <Image
                src={post.authorAvatar}
                alt={post.author}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <span className="text-sm font-semibold text-white">
              {post.author}
            </span>
          </div>
          <div className="text-sm text-white/80">
            <span>{post.fullDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
