'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3 1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
);

export function SeasonalBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-xl bg-secondary p-8 md:p-12 shadow-2xl"
        >
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-xl bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                <SparklesIcon className="h-3 w-3" />
                <span>Special Promotion</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight">
                Seasonal Savings: <br className="hidden md:block" /> 
                <span className="text-accent-green">15% Off</span> All Natural Chews!
              </h2>
              <p className="text-white/80 text-lg max-w-xl">
                Keep them busy and healthy with our curated selection of all-natural, long-lasting chews. Discount applied automatically at checkout.
              </p>
            </div>
            <div className="shrink-0">
              <Button asChild size="lg" className="bg-white text-secondary hover:bg-slate-100 h-14 px-10 rounded-xl text-lg font-bold shadow-xl transition-all hover:scale-105 active:scale-95">
                <Link href="https://shop.simplydlegos.com/products/list/" target="_blank">
                  Shop the Sale
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
