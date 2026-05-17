"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroImg from "../../../assets/pet-store-Albuquerque (1).png";
import { heroApi } from "@/lib/api/hero";

const ShoppingCartIcon = ({ className }: { className?: string }) => (
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
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
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
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

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

const PlayIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

/* ── Floating particle component ── */
function FloatingParticle({
  delay,
  x,
  y,
  size,
}: {
  delay: number;
  x: string;
  y: string;
  size: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full bg-primary/20"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

export function HeroSection() {
  const [heroData, setHeroData] = useState<any>({
    title: "Find Out Your Companion On Pet Adorin.",
    description: "Premium natural pet food, DIY dog wash stations, and expert nutritional counseling. We're more than a store – we're a community for pet lovers.",
    imageUrl: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHero() {
      try {
        const res = await heroApi.get();
        if (res?.data) {
          setHeroData({
            title: res.data.title || "Find Out Your Companion On Pet Adorin.",
            description: res.data.description || "Premium natural pet food, DIY dog wash stations, and expert nutritional counseling. We're more than a store – we're a community for pet lovers.",
            imageUrl: res.data.image?.url || null
          });
        }
      } catch (e) {
        console.error("Failed to fetch dynamic hero data:", e);
      } finally {
        setLoading(false);
      }
    }
    loadHero();
  }, []);

  const renderTitle = (titleText: string) => {
    const parts = titleText.split(" ");
    if (parts.length > 2) {
      const lastWords = parts.slice(-2).join(" ");
      const mainWords = parts.slice(0, -2).join(" ");
      return (
        <>
          {mainWords}{" "}
          <motion.span
            className="inline-block gradient-text"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          >
            {lastWords}
          </motion.span>
        </>
      );
    }
    return titleText;
  };

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center pt-[90px] lg:pt-[110px] pb-20 overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#800040]">
        {/* Background Effects */}
        <div className="absolute inset-0 paw-pattern-light opacity-30" />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full">
            {/* Shimmer Content Side */}
            <div className="flex-1 text-center lg:text-left space-y-8 animate-pulse w-full">
              {/* Title Shimmer */}
              <div className="space-y-3 max-w-xl mx-auto lg:mx-0">
                <div className="h-10 md:h-14 bg-white/10 rounded-[5px] w-3/4" />
                <div className="h-10 md:h-14 bg-white/10 rounded-[5px] w-5/6" />
                <div className="h-10 md:h-14 bg-white/10 rounded-[5px] w-1/2" />
              </div>

              {/* Description Shimmer */}
              <div className="space-y-2.5 max-w-lg mx-auto lg:mx-0">
                <div className="h-4 bg-white/10 rounded-[5px] w-full" />
                <div className="h-4 bg-white/10 rounded-[5px] w-11/12" />
                <div className="h-4 bg-white/10 rounded-[5px] w-4/5" />
              </div>

              {/* Action Buttons Shimmer */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <div className="h-14 w-48 bg-white/10 rounded-[5px]" />
                <div className="h-14 w-44 bg-white/10 rounded-[5px]" />
              </div>

              {/* Trust Badges Shimmer */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-8 w-12 bg-white/10 rounded-[5px]" />
                    <div className="h-4 w-16 bg-white/10 rounded-[5px]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Shimmer Image Side */}
            <div className="flex-1 relative w-full max-w-xl lg:max-w-2xl animate-pulse">
              <div className="relative aspect-[4/5] md:aspect-square rounded-[5px] bg-white/10 border-2 border-white/5 shadow-2xl overflow-hidden w-full h-full flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path fill="var(--background)" d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center pt-[90px] lg:pt-[110px] pb-20 overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#800040]">
      {/* ── Background Effects ── */}
      <div className="absolute inset-0 paw-pattern-light opacity-30" />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-accent-green/15 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute top-[30%] left-[40%] w-[400px] h-[400px] bg-warm-orange/10 rounded-full blur-[100px]"
      />

      {/* Floating particles */}
      <FloatingParticle delay={0} x="10%" y="20%" size={8} />
      <FloatingParticle delay={1.5} x="80%" y="15%" size={6} />
      <FloatingParticle delay={3} x="25%" y="70%" size={10} />
      <FloatingParticle delay={2} x="70%" y="60%" size={7} />
      <FloatingParticle delay={4} x="50%" y="30%" size={5} />
      <FloatingParticle delay={1} x="90%" y="80%" size={9} />

      {/* Floating Decorative Paws */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [-10, 15, -10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[15%] text-white/10 hidden lg:block"
      >
        <PawIcon className="w-16 h-16" />
      </motion.div>
      <motion.div
        animate={{ y: [10, -10, 10], rotate: [10, -15, 10] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-32 left-[10%] text-accent-green/15 hidden lg:block"
      >
        <PawIcon className="w-12 h-12" />
      </motion.div>
      <motion.div
        animate={{ y: [-5, 15, -5], rotate: [5, -10, 5] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/3 left-[5%] text-primary/10 hidden lg:block"
      >
        <PawIcon className="w-10 h-10" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* ── Content Side ── */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[5px] bg-primary/15 text-primary font-bold text-sm tracking-wide uppercase border border-primary/25 backdrop-blur-sm"
            >
              <PawIcon className="h-4 w-4" />
              Albuquerque&apos;s #1 Pet Market
            </motion.div> */}

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-[1.05]"
            >
              {renderTitle(heroData.title)}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {heroData.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <Button
                asChild
                size="lg"
                className="h-14 px-8 rounded-[5px] text-lg font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 bg-secondary hover:bg-secondary/90"
              >
                <Link
                  href="https://shop.simplydiegos.com/products/shop/"
                  target="_blank"
                  className="flex items-center gap-3"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  <span>Shop Online Now</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="h-14 px-8 rounded-[5px] text-lg font-bold border-2 border-white/20 text-white bg-white/5 hover:bg-white/15 hover:border-white/40 hover:text-white backdrop-blur-sm transition-all flex items-center gap-3"
              >
                <a
                  href="https://simplydiegos.as.me/"
                  target="_blank"
                  className="flex items-center gap-3"
                >
                  <CalendarIcon className="h-5 w-5" />
                  <span>Book DIY Wash</span>
                </a>
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4"
            >
              {[
                { label: "Happy Pets", value: "2K+" },
                { label: "Years Serving", value: "17+" },
                { label: "Google Rating", value: "4.9★" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span className="text-2xl font-black text-secondary">
                    {stat.value}
                  </span>
                  <span className="text-xs text-white/70 font-medium uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Image Side ── */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="flex-1 relative w-full max-w-xl lg:max-w-2xl"
          >
            <div className="relative">
              {/* Decorative ring behind image */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-6 border-2 border-dashed border-primary/15 rounded-[2rem]"
              />

              {/* Glowing accent behind */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/25 via-transparent to-accent-green/15 rounded-[2rem] blur-lg" />

              {/* Main image container */}
              <div className="relative aspect-[4/5] md:aspect-square rounded-[5px] overflow-hidden shadow-2xl shadow-black/40 border-2 border-white/10 w-full h-full">
                {heroData.imageUrl ? (
                  <img
                    src={heroData.imageUrl}
                    alt="Simply Diego's Local Healthy Pet Store"
                    className="w-full h-full object-cover object-left-center"
                  />
                ) : (
                  <Image
                    src={heroImg}
                    alt="Simply Diego's Local Healthy Pet Store"
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover object-left-center"
                    priority
                  />
                )}
                {/* Warm overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-primary/10" />
              </div>

              {/* Decorative dots */}
              <motion.div
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/4 -right-10 flex flex-col gap-2 hidden lg:flex"
              >
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex gap-2">
                    {[...Array(3)].map((_, j) => (
                      <div
                        key={j}
                        className="w-2 h-2 rounded-full bg-primary/30"
                      />
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            fill="var(--background)"
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          />
        </svg>
      </div>
    </section>
  );
}
