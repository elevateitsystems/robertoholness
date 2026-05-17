"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

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

interface PageHeroProps {
  title: string;
  highlightedWord: string;
  badge?: string;
  description?: string;
  breadcrumbs: { label: string; href?: string }[];
}

export function PageHero({
  title,
  highlightedWord,
  badge = "🐾 Simply Diego's",
  description,
  breadcrumbs,
}: PageHeroProps) {
  const [localData, setLocalData] = useState({
    title,
    highlightedWord,
    badge,
    description
  });

  useEffect(() => {
    let key = "";
    const isGallery = breadcrumbs.some(c => c.label.toLowerCase() === "gallery") || highlightedWord.toLowerCase() === "gallery";
    const isBlog = breadcrumbs.some(c => c.label.toLowerCase() === "blog") || highlightedWord.toLowerCase() === "blog";
    const isContact = breadcrumbs.some(c => c.label.toLowerCase() === "contact") || highlightedWord.toLowerCase().includes("contact") || highlightedWord.toLowerCase() === "us";

    if (isGallery) key = "banner_gallery";
    else if (isBlog) key = "banner_blog";
    else if (isContact) key = "banner_contact";

    if (key) {
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setLocalData({
            title: parsed.title || title,
            highlightedWord: parsed.highlightedWord || highlightedWord,
            badge: parsed.badge !== undefined ? parsed.badge : badge,
            description: parsed.description !== undefined ? parsed.description : description
          });
        } catch (e) {
          console.error("Failed to parse local banner data for key:", key, e);
        }
      }
    }
  }, [title, highlightedWord, badge, description, breadcrumbs]);
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--warm-cream)] via-[var(--warm-peach)] to-[var(--warm-cream)] py-20 border-b border-primary/10">
      <div className="absolute inset-0 paw-pattern opacity-40" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/8 rounded-full blur-[80px]" />

      <motion.div
        animate={{ y: [-5, 8, -5], rotate: [-5, 10, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 right-[15%] text-primary/15 hidden lg:block"
      >
        <PawIcon className="w-14 h-14" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-2 mb-6 text-sm text-secondary/50"
        >
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              )}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-primary transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-secondary font-semibold">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </motion.div>

        {localData.badge && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-primary/10 text-primary font-semibold text-xs tracking-widest uppercase mb-6 border border-primary/20"
          >
            {localData.badge}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-heading font-black text-secondary mb-6"
        >
          {localData.title} <span className="gradient-text">{localData.highlightedWord}</span>
        </motion.h1>

        {localData.description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-secondary/60 max-w-3xl mx-auto leading-relaxed"
          >
            {localData.description}
          </motion.p>
        )}
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            fill="var(--background)"
            d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
          />
        </svg>
      </div>
    </section>
  );
}
