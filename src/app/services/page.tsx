"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { servicesData, iconMap } from "@/lib/services-data";

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

export default function ServicesPage() {
  const services = Object.values(servicesData);

  const [bannerData, setBannerData] = useState<any>({
    title: "Our Professional",
    highlightedWord: "Services",
    badge: "🐾 Simply Diego's",
    description: "Discover our premium grooming, DIY washing stations, nutritional counseling, and high-quality natural supplies tailored to keep your pet happy and thriving."
  });

  useEffect(() => {
    const saved = localStorage.getItem("banner_service");
    if (saved) {
      try {
        setBannerData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse services banner:", e);
      }
    }
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--warm-cream)] via-[var(--warm-peach)] to-[var(--warm-cream)] py-20 border-b border-primary/10">
        <div className="absolute inset-0 paw-pattern opacity-40" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/8 rounded-full blur-[80px]" />

        {/* Floating paw */}
        <motion.div
          animate={{ y: [-5, 8, -5], rotate: [-5, 10, -5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 right-[15%] text-primary/15 hidden lg:block"
        >
          <PawIcon className="w-14 h-14" />
        </motion.div>

        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          {bannerData.badge && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-primary/10 text-primary font-bold text-xs tracking-widest uppercase mb-6 border border-primary/20"
            >
              {bannerData.badge}
            </motion.div>
          )}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-heading font-black text-secondary mb-6"
          >
            {bannerData.title} <span className="gradient-text">{bannerData.highlightedWord}</span>
          </motion.h1>
          {bannerData.description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-secondary/60 max-w-3xl mx-auto leading-relaxed"
            >
              {bannerData.description}
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

      {/* Services List */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 paw-pattern opacity-30" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="space-y-32">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon || ""] || iconMap.store;
              const theme = service.metadata?.theme;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
                >
                  {/* Content */}
                  <div className="flex-1 space-y-8">
                    <div
                      className={`w-16 h-16 rounded-lg ${theme?.iconBg || "bg-primary"} flex items-center justify-center mb-6 text-white shadow-lg`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <h2 className="text-4xl font-heading font-black text-secondary">
                      {service.name}
                    </h2>
                    <p className="text-lg text-secondary/60 leading-relaxed">
                      {service.shortDescription}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.metadata?.listingFeatures?.map(
                        (feature: string) => (
                          <div
                            key={feature}
                            className="flex items-center space-x-2 text-secondary/80 font-medium"
                          >
                            <CheckCircle2 className="h-5 w-5 text-accent-green" />
                            <span>{feature}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Visual */}
                  <div className="flex-1 w-full">
                    <div className="relative">
                      <div
                        className={`absolute -inset-3 bg-gradient-to-br ${theme?.gradient || "from-primary/10 to-primary/5"} rounded-lg ${index % 2 === 0 ? "rotate-2" : "-rotate-2"}`}
                      />
                      <div
                        className={`relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl border-4 border-white ${theme?.borderColor || "border-primary/20"}`}
                      >
                        {service.imageUrl && (
                          <Image
                            src={service.imageUrl}
                            alt={service.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-transparent to-transparent" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary-dark to-[#800040] text-white relative overflow-hidden">
        <div className="absolute inset-0 paw-pattern-light" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />

        {/* Floating paw */}
        <motion.div
          animate={{ y: [-8, 8, -8], rotate: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 right-[10%] text-white/10 hidden lg:block"
        >
          <PawIcon className="w-16 h-16" />
        </motion.div>

        <div className="container mx-auto px-4 md:px-6 text-center space-y-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-heading font-black"
          >
            Need Something Else?
          </motion.h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Our team is always here to help. Whether you have questions about
            nutrition or need a special order, just let us know.
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-lg bg-white text-primary border-none hover:bg-white/90 font-bold h-14 px-10 text-lg shadow-xl shadow-black/10 hover:scale-105 transition-all"
          >
            <Link href="/contact">Contact Our Team</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
