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

const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5"/></svg>
);

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white cursor-none pt-20">
      <CustomCursor />
      
      {/* Background Abstract Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Content */}
          <div className="space-y-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-sm font-bold shadow-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-accent-green animate-pulse" />
              <span>Locally Owned Since 2008</span>
            </motion.div>

            <div className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-8xl font-heading font-black text-slate-900 leading-[0.95] tracking-tight"
              >
                Simply <span className="text-secondary">Best.</span> <br />
                Naturally <span className="text-primary">Better.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-xl md:text-2xl text-slate-500 max-w-xl leading-relaxed font-medium"
              >
                Elevate your pet's life with premium nutrition, expert care, and our signature DIY wash experience.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4"
            >
              <Button asChild size="lg" className="h-16 px-10 rounded-xl text-xl font-bold bg-primary hover:bg-primary/90 shadow-2xl hover:scale-105 active:scale-95 transition-all group">
                <Link href="https://shop.simplydlegos.com/products/list/" target="_blank" className="flex items-center gap-3">
                  <ShoppingCartIcon className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                  <span>Shop Online Now</span>
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild className="h-16 px-10 rounded-xl text-xl font-bold border-2 border-slate-200 hover:bg-slate-50 transition-all group">
                <Link href="/services/diy-dog-wash" className="flex items-center gap-3">
                  <CalendarIcon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                  <span>Book DIY Wash</span>
                </Link>
              </Button>
            </motion.div>

            {/* Quick Stats/Features */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-6 border-t border-slate-100"
            >
              {['Premium Food', 'Expert Staff', 'Local Delivery'].map((feature, i) => (
                <div key={i} className="flex items-center space-x-2 text-slate-400 font-bold text-sm uppercase tracking-widest">
                  <CheckIcon className="h-4 w-4 text-accent-green" />
                  <span>{feature}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Visuals */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=1200" 
                alt="Happy Dog in Store" 
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Floating Glass Cards */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -left-10 bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl border border-white/50 hidden md:block"
            >
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-accent-green rounded-2xl flex items-center justify-center text-white text-2xl">
                  🦴
                </div>
                <div>
                  <div className="text-lg font-black text-slate-900 leading-none">Fresh Treats</div>
                  <div className="text-sm font-bold text-slate-500">Baked daily</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -right-10 bg-secondary/90 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white/20 text-white hidden md:block"
            >
              <div className="flex flex-col space-y-2">
                <div className="text-4xl font-black">4.9/5</div>
                <div className="text-sm font-bold uppercase tracking-widest opacity-80">Google Rating</div>
                <div className="flex text-yellow-400">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
