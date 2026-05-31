"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { joinUsApi } from "@/lib/api/joinUs";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

// Fallback high-fidelity Unsplash images
const fallbackImages = [
  { url: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=600", link: "https://instagram.com/simplydiegos" },
  { url: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=600", link: "https://instagram.com/simplydiegos" },
  { url: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=600", link: "https://instagram.com/simplydiegos" },
  { url: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=600", link: "https://instagram.com/simplydiegos" },
  { url: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=600", link: "https://instagram.com/simplydiegos" },
];

const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/simplydiegos";

export function InstagramFeed() {
  const [instagramData, setInstagramData] = useState<any>({
    title: "JOIN US ON INSTAGRAM",
    description:
      "Like Simply Diego's on Instagram for great photos of our local dogs, pet food & supply deals, upcoming events in Albuquerque, and more!",
    instagramHandle: "🐾 Follow us @simplydiegos",
    joinUsImages: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInstagram() {
      try {
        const res = await joinUsApi.get();
        const record = res?.data && Array.isArray(res.data)
          ? res.data[0]
          : res?.data;

        if (record) {
          setInstagramData({
            title: record.title || "JOIN US ON INSTAGRAM",
            description: record.description || "Like Simply Diego's on Instagram for great photos of our local dogs, pet food & supply deals, upcoming events in Albuquerque, and more!",
            instagramHandle: record.instagramHandle || "🐾 Follow us @simplydiegos",
            joinUsImages: record.joinUsImages || []
          });
        }

        const socialRes = await fetch("/api/social/instagram");
        const socialPayload = await socialRes.json();
        if (Array.isArray(socialPayload?.data) && socialPayload.data.length > 0) {
          setInstagramData((current: any) => ({
            ...current,
            joinUsImages: socialPayload.data,
          }));
        }
      } catch (e) {
        console.error("Failed to load dynamic Instagram feed data:", e);
      } finally {
        setLoading(false);
      }
    }
    loadInstagram();
  }, []);

  const renderTitle = (titleText: string) => {
    const keyword = "INSTAGRAM";
    const upperTitle = titleText.toUpperCase();
    if (upperTitle.includes(keyword)) {
      const parts = upperTitle.split(keyword);
      return (
        <>
          {parts[0]}
          <span className="text-primary">{keyword}</span>
          {parts.slice(1).join(keyword)}
        </>
      );
    }
    const words = titleText.split(" ");
    if (words.length > 1) {
      const mainPart = words.slice(0, -1).join(" ");
      const lastWord = words.slice(-1)[0];
      return (
        <>
          {mainPart} <span className="text-primary">{lastWord}</span>
        </>
      );
    }
    return titleText;
  };

  if (loading) {
    return (
      <section className="py-24 relative overflow-hidden animate-pulse">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="mb-16 max-w-3xl mx-auto space-y-4">
            <div className="h-4 bg-gray-200 rounded-[5px] w-36 mx-auto animate-pulse" />
            <div className="h-10 bg-gray-200 rounded-[5px] w-64 mx-auto animate-pulse" />
            <div className="h-4 bg-gray-200 rounded-[5px] w-full max-w-lg mx-auto animate-pulse" />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 max-w-full mx-auto rounded overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Determine which list of images to render (dynamic or resilient fallback)
  const displayImages = instagramData.joinUsImages.length > 0 
    ? instagramData.joinUsImages 
    : fallbackImages;

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-green/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="mb-16 max-w-3xl mx-auto">
          <p className="text-secondary/50 text-sm font-bold uppercase tracking-wider mb-2">
            {instagramData.instagramHandle}
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-secondary uppercase mb-4">
            {renderTitle(instagramData.title)}
          </h2>
          <p className="text-lg text-secondary/60 leading-relaxed">
            {instagramData.description}
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 max-w-full mx-auto overflow-hidden rounded-[5px] shadow-lg border border-gray-100">
          {displayImages.map((img: any, i: number) => {
            const content = (
              <div className="w-full h-full relative">
                <img 
                  src={img.url}
                  alt={`Instagram Post ${i + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <InstagramIcon className="text-white h-8 w-8" />
                </div>
              </div>
            );

            return (
              <motion.div 
                key={img.id || i} 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative aspect-square overflow-hidden bg-gray-50"
              >
                {img.link ? (
                  <Link href={img.link} target="_blank" rel="noopener noreferrer">
                    {content}
                  </Link>
                ) : (
                  <Link href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                    {content}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button asChild variant="outline" size="lg" className="rounded-[5px] px-10 font-bold border-2 border-secondary/20 text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
            <Link href={INSTAGRAM_URL} target="_blank" className="flex items-center gap-2">
              <span>View More on Instagram</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
