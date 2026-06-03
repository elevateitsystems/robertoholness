"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.49 0-1.956.93-1.956 1.884v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="instagram-gradient" x1="2" x2="22" y1="22" y2="2">
        <stop offset="0" stopColor="#F58529" />
        <stop offset="0.35" stopColor="#DD2A7B" />
        <stop offset="0.7" stopColor="#8134AF" />
        <stop offset="1" stopColor="#515BD4" />
      </linearGradient>
    </defs>
    <rect width="20" height="20" x="2" y="2" rx="5" fill="url(#instagram-gradient)" />
    <circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="2" />
    <circle cx="17.5" cy="6.5" r="1.3" fill="white" />
  </svg>
);

const socialLinks = [
  {
    label: "Facebook",
    href: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/SimplyDiegos",
    icon: FacebookIcon,
    iconClassName: "h-8 w-8 text-[#1877F2] transition-transform group-hover:scale-110",
  },
  {
    label: "Instagram",
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/simplydiegos",
    icon: InstagramIcon,
    iconClassName: "h-9 w-9 transition-transform group-hover:scale-110",
  },
];

export function SocialMediaSection() {
  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-20">

      <div className="pink-paw-pattern absolute inset-0 opacity-[0.045]" />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mx-auto inline-flex rounded-[5px] border border-primary/15 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.22em] text-secondary shadow-lg shadow-primary/5">
            Stay Connected
          </p>
          <h2 className="mt-3 text-2xl font-black sm:text-3xl md:text-5xl">
            <span className="text-secondary">
              Follow Simply Diego&apos;s for pet care tips, updates, and{" "}
            </span>
            <span className="text-primary">local favorites.</span>
          </h2>

          <div className="mt-9 flex justify-center gap-4">
            {socialLinks.map(({ label, href, icon: Icon, iconClassName }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-16 w-16 items-center justify-center rounded-[5px] border border-primary/10 bg-white shadow-lg shadow-primary/5 transition-all hover:-translate-y-1 hover:border-secondary/30 hover:shadow-xl hover:shadow-secondary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                aria-label={`Follow Simply Diego's on ${label}`}
                title={label}
              >
                <Icon className={iconClassName} />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
