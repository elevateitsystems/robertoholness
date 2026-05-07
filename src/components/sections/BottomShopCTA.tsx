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

export function BottomShopCTA() {
  return (
    <section className="py-24 bg-slate-900 overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/20 rounded-full blur-[120px] opacity-50" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex p-4 rounded-lg bg-white/10 text-white mb-4">
            <ShoppingBagIcon className="h-8 w-8" />
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-white leading-tight">
            Ready to Give Your Pet <br />
            The <span className="text-secondary">Very Best?</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Browse our full catalog of natural food, healthy treats, and premium supplies. Fast local delivery and easy pickup available.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Button asChild size="lg" className="h-16 px-12 rounded-lg text-xl font-bold shadow bg-secondary hover:bg-secondary/90 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
              <Link href="https://shop.simplydlegos.com/products/list/" target="_blank" className="flex items-center gap-3">
                <ShoppingBagIcon className="h-6 w-6" />
                <span>Shop Online Now</span>
              </Link>
            </Button>
            <Link href="/contact" className="group flex items-center text-white font-bold text-lg hover:text-secondary transition-colors">
              Find Our Store <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
