"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function SalesSection() {
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
            <Image
              src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=1200"
              alt="Happy golden retriever"
              fill
              className="object-cover"
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
              Early Deal
            </p>

            <div className="flex flex-col items-center justify-center mb-6">
              <h2 className="text-5xl md:text-7xl font-black font-heading uppercase tracking-tighter flex items-end">
                BLACK
                <span className="text-4xl md:text-6xl italic font-serif font-light lowercase tracking-normal -ml-1 text-white/90">
                  friday
                </span>
              </h2>
            </div>

            <div className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              20% OFF
            </div>

            <p className="text-lg md:text-xl font-bold tracking-widest mb-10 text-white/80">
              USE CODE: ED200FF
            </p>

            <Button
              variant="outline"
              className="border-2 rounded-[5px] border-white/50 text-white hover:bg-white hover:text-black bg-transparent px-12 py-6 text-sm font-bold tracking-widest uppercase transition-all duration-300"
            >
              Shop Now
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
