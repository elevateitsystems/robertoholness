"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/blogData";

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

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="blog-card-cursor"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="bg-white rounded-[5px] shadow-md border border-black/5 overflow-hidden group text-left h-full flex flex-col">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.2]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Date Badge */}
            <div className="absolute left-6 -bottom-6 bg-secondary text-white w-14 h-16 rounded-[5px] flex flex-col items-center justify-center z-10 shadow-lg">
              <span className="text-xl font-black leading-none">
                {post.date}
              </span>
              <span className="text-[10px] font-semibold mt-1">
                {post.month}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 pt-10 flex flex-col flex-1">
            <h3 className="text-xl font-black text-secondary mb-4 group-hover:text-primary transition-colors duration-300 leading-tight line-clamp-2 min-h-[3.5rem]">
              {post.title}
            </h3>

            <p className="text-secondary/60 text-sm leading-relaxed line-clamp-3 mb-6">
              {post.excerpt}
            </p>

            {/* Read More */}
            <div className="mt-auto pt-6 border-t border-black/5">
              <span className="inline-flex items-center gap-3 text-sm font-semibold text-secondary group-hover:text-primary transition-all duration-300">
                <span>Read More</span>
                <ArrowRight className="text-primary transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
