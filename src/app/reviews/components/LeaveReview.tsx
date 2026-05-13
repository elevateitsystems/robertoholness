"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function LeaveReview() {
  return (
    <div className="bg-white rounded-[5px] shadow-sm border border-black/5 p-8 md:p-10 text-center space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-black text-secondary"
      >
        Leave Us a Review
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <p className="text-secondary/60 text-sm leading-relaxed">
          We&apos;ve found that customer reviews are very helpful in keeping our
          business thriving. We would truly appreciate a review from you!
        </p>
        <p className="text-secondary/40 text-[11px] font-medium uppercase tracking-wider">
          Visit your preferred site to leave a review or comment.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center gap-6"
      >
        <Link
          href="https://search.google.com/local/writereview?placeid=ChIJH3eXo5QeSscR14n4LJy5_l8"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer w-full flex gap-2 items-center justify-center px-8 py-3 bg-primary text-white rounded-[5px] font-bold text-base shadow-lg shadow-primary/10 hover:bg-primary/90 hover:scale-[1.02] transition-all duration-300"
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            className="shrink-0"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>{" "}
          <span className="">Write a Review</span>
        </Link>
      </motion.div>
    </div>
  );
}
