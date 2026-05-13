"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface ReviewCardProps {
  author: string;
  avatar: string;
  date: string;
  rating: number;
  comment: string;
  images?: string[];
  index: number;
}

export function ReviewCard({
  author,
  avatar,
  date,
  rating,
  comment,
  images,
  index,
}: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="py-10 border-t border-black/5"
    >
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-black/5">
              <Image
                src={avatar}
                alt={author}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div>
              <h4 className="text-base font-black text-secondary">{author}</h4>
              <p className="text-xs font-bold text-secondary/40">{date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-secondary">
              {rating.toFixed(1)}
            </span>
            <div className="flex gap-0.5 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.floor(rating) ? "currentColor" : "none"}
                  className={i < Math.floor(rating) ? "" : "text-secondary/20"}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Comment */}
        <p className="text-secondary/70 leading-relaxed font-sans">{comment}</p>

        {/* Images */}
        {images && images.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative w-24 h-24 rounded-lg overflow-hidden border border-black/5"
              >
                <Image
                  src={img}
                  alt={`Review attachment ${i + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                  sizes="96px"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
