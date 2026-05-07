'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CustomCursor } from '@/components/ui/CustomCursor';

const ShoppingCartIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-32 cursor-none">
      <CustomCursor />
      
      {/* Background Decorative Elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" 
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1.5 rounded-lg bg-accent-green/10 text-accent-green font-bold text-sm tracking-wide uppercase"
            >
              Albuquerque's #1 Pet Market
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-heading font-black text-slate-900 leading-[1.1]"
            >
              Natural Care for Your <span className="text-secondary">Best Friend.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Premium natural pet food, DIY dog wash stations, and expert nutritional counseling. We're more than a store – we're a community for pet lovers.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <Button asChild size="lg" className="h-14 px-8 rounded-lg text-lg font-bold shadow hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                <Link href="https://shop.simplydlegos.com/products/list/" target="_blank" className="flex items-center gap-3">
                  <ShoppingCartIcon className="h-5 w-5" />
                  <span>Shop Online Now</span>
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="h-14 px-8 rounded-lg text-lg font-bold border-2 hover:bg-slate-100 transition-all flex items-center gap-3">
                <Link href="/services/diy-dog-wash" className="flex items-center gap-3">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  <span>Book DIY Wash</span>
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="flex-1 relative"
          >
            <div className="relative w-full aspect-square max-w-xl mx-auto rounded-lg overflow-hidden shadow border-8 border-white bg-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=1200" 
                alt="Happy Dog" 
                className="w-full h-full object-cover opacity-80"
              />
              
              {/* Floating Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1, type: "spring" }}
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow hidden md:block"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white">
                    <ShoppingCartIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Local Delivery</div>
                    <div className="text-xs text-slate-500">Free on orders over $50</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
