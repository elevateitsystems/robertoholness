"use client";

import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "Facebook",
    color: "#3b5998",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    color: "#1da1f2",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    name: "Pinterest",
    color: "#bd081c",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 15c-1.3 0-2.4-.5-3.2-1.3l.6-2.5c.5.7 1.4 1.3 2.6 1.3 1.5 0 2.4-.8 2.4-1.8 0-2.7-4.4-2.3-4.4-5.8 0-2 1.5-3.4 3.6-3.4 1 0 1.9.3 2.5.8l-.7 2.2c-.4-.4-1-.7-1.7-.7-1 0-1.6.5-1.6 1.3 0 2.3 4.4 1.9 4.4 5.7 0 2.2-1.6 3.7-4 3.7z" />
      </svg>
    ),
  },
  {
    name: "Google Plus",
    color: "#dd4b39",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
      </svg>
    ),
  },
];

interface BlogPostFooterProps {
  category: string;
}

export function BlogPostFooter({ category }: BlogPostFooterProps) {
  const tags = [category, "Pets", "Care"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-10 pt-8 border-t border-black/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
    >
      {/* Tag pills — using secondary color as seen in the third reference image (darker gray/blue) */}
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-5 py-2 rounded-[5px] bg-secondary text-white text-sm font-semibold"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Share it: with colored circle icons */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-secondary/60">
          Share it:
        </span>
        <div className="flex gap-2">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href="#"
              style={{ backgroundColor: social.color }}
              className="w-9 h-9 rounded-full text-white flex items-center justify-center hover:scale-110 transition-transform"
              title={`Share on ${social.name}`}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
