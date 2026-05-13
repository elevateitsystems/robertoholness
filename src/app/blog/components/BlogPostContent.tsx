"use client";

import { motion } from "framer-motion";

interface BlogPostContentProps {
  content: string[];
}

export function BlogPostContent({ content }: BlogPostContentProps) {
  return (
    <article className="mt-12">
      {content.map((paragraph, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.03 }}
          className="text-secondary/70 text-base md:text-[17px] leading-[1.85] mb-6 font-sans"
        >
          {paragraph}
        </motion.p>
      ))}
    </article>
  );
}
