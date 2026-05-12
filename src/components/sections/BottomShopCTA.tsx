'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const ShoppingBagIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const PawIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <ellipse cx="12" cy="17" rx="4" ry="5" opacity="0.9"/>
    <ellipse cx="6" cy="11" rx="2.5" ry="3" opacity="0.9"/>
    <ellipse cx="18" cy="11" rx="2.5" ry="3" opacity="0.9"/>
    <ellipse cx="8.5" cy="6" rx="2" ry="2.5" opacity="0.9"/>
    <ellipse cx="15.5" cy="6" rx="2" ry="2.5" opacity="0.9"/>
  </svg>
);

export function BottomShopCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary-dark to-[#800040] overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute inset-0 paw-pattern-light" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-primary/15 rounded-full blur-[150px] opacity-60" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent-green/10 rounded-full blur-[100px]" />
      
      {/* Floating paws */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] text-white/8 hidden lg:block"
      >
        <PawIcon className="w-20 h-20" />
      </motion.div>
      <motion.div
        animate={{ y: [10, -10, 10], rotate: [10, -10, 10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-20 right-[10%] text-white/8 hidden lg:block"
      >
        <PawIcon className="w-16 h-16" />
      </motion.div>
      <motion.div
        animate={{ y: [-5, 12, -5], rotate: [-5, 8, -5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-1/2 right-[25%] text-white/5 hidden lg:block"
      >
        <PawIcon className="w-12 h-12" />
      </motion.div>

      {/* Top wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path fill="var(--background)" d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex p-4 rounded-[5px] bg-primary/20 text-white mb-4 animate-pulse-glow">
            <ShoppingBagIcon className="h-8 w-8" />
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-white leading-tight">
            Ready to Give Your Pet <br />
            The <span className="text-warm-orange">Very Best?</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Browse our full catalog of natural food, healthy treats, and premium supplies. Fast local delivery and easy pickup available.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Button asChild size="lg" className="h-16 px-12 rounded-[5px] text-xl font-bold shadow-xl shadow-primary/30 bg-primary hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
              <Link href="https://shop.simplydlegos.com/products/list/" target="_blank" className="flex items-center gap-3">
                <ShoppingBagIcon className="h-6 w-6" />
                <span>Shop Online Now</span>
              </Link>
            </Button>
            <Link href="/contact" className="group flex items-center text-white font-bold text-lg hover:text-warm-orange transition-colors">
              Find Our Store <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
