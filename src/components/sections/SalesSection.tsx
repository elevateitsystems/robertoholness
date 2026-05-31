"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { salesApi } from "@/lib/api/sales";

export function SalesSection() {
  const [salesData, setSalesData] = useState<any>({
    badgeText: "Early Deal",
    title: "BLACK friday",
    discountText: "20% OFF",
    codeText: "USE CODE: ED200FF",
    imageUrl:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=1200",
    isShow: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSales() {
      try {
        const res = await salesApi.get();
        if (res?.data) {
          setSalesData({
            ...res.data,
            isShow: res.data.isHidden !== true,
          });
        }
      } catch {
        // Static sales content is used when CMS content is unavailable.
      } finally {
        setLoading(false);
      }
    }

    loadSales();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 relative overflow-hidden bg-white animate-pulse">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="relative rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl h-[450px]">
            {/* Shimmer Left side */}
            <div className="md:w-1/2 bg-gray-200" />
            {/* Shimmer Right side */}
            <div className="md:w-1/2 bg-gray-300 flex flex-col justify-center items-center p-12 space-y-6">
              <div className="h-4 bg-white/20 rounded-[5px] w-24" />
              <div className="h-10 bg-white/20 rounded-[5px] w-48" />
              <div className="h-8 bg-white/20 rounded-[5px] w-36" />
              <div className="h-4 bg-white/20 rounded-[5px] w-40" />
              <div className="h-12 bg-white/20 rounded-[5px] w-32" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // HIDE SECTION COMPLETELY IF IS_SHOW FLAG IS FALSE
  if (salesData.isShow === false) {
    return null;
  }

  const titleFirstWord = salesData.title ? salesData.title.split(" ")[0] : "BLACK";
  const titleSecondWord = salesData.title ? salesData.title.split(" ").slice(1).join(" ") : "friday";

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
        >
          {/* Left Side: Image */}
          <div className="md:w-1/2 relative min-h-[300px] md:min-h-[500px]">
            <img
              src={salesData.imageUrl}
              alt="Promo dog"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Slanted overlay separator (visible on md+) */}
          <div className="hidden md:block absolute top-0 bottom-0 left-[48%] w-32 bg-primary -skew-x-12 z-10 transform origin-top-left"></div>

          {/* Right Side: Black Content Area */}
          <div className="md:w-1/2 bg-primary text-white p-12 md:p-16 flex flex-col justify-center items-center text-center relative z-20">
            {/* Top Right Dots */}
            <div className="absolute top-8 right-8 text-white/20 grid grid-cols-4 gap-2">
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-current"
                ></div>
              ))}
            </div>

            <p className="text-sm md:text-base font-bold tracking-[0.2em] mb-4 uppercase text-white/90">
              {salesData.badgeText}
            </p>

            <div className="flex flex-col items-center justify-center mb-6">
              <h2 className="text-5xl md:text-7xl font-black font-heading uppercase tracking-tighter flex items-end">
                {titleFirstWord}
                {titleSecondWord && (
                  <span className="text-4xl md:text-6xl italic font-serif font-light lowercase tracking-normal -ml-1 text-white/90">
                    {titleSecondWord}
                  </span>
                )}
              </h2>
            </div>

            <div className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              {salesData.discountText}
            </div>

            <p className="text-lg md:text-xl font-bold tracking-widest mb-10 text-white/80">
              {salesData.codeText}
            </p>

            <Button
              variant="outline"
              asChild
              className="border-2 rounded-[5px] border-white/50 text-white hover:bg-white hover:text-black bg-transparent px-12 py-6 text-sm font-bold tracking-widest uppercase transition-all duration-300"
            >
              <Link
                href="https://shop.simplydiegos.com/products/shop/"
                target="_blank"
                className="flex items-center gap-2"
              >
                Shop Now
              </Link>
            </Button>

            {/* Bottom Right Diagonal Lines */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-1 opacity-20">
              <div className="w-16 h-1 bg-white -rotate-45 transform origin-right"></div>
              <div className="w-16 h-1 bg-white -rotate-45 transform origin-right"></div>
              <div className="w-16 h-1 bg-white -rotate-45 transform origin-right"></div>
            </div>

            {/* Circular badge mockup */}
            <div className="hidden md:flex absolute bottom-8 left-8 w-24 h-24 rounded-full border border-white/20 items-center justify-center -rotate-12 animate-[spin_10s_linear_infinite]">
              <div className="text-[10px] uppercase font-bold tracking-widest text-white/60">
                SALE • SALE • SALE •
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
