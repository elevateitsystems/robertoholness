'use client';

import Link from 'next/link';
import { Bath, Calendar, CheckCircle2, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function DIYDogWashPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--warm-cream)] via-[var(--warm-peach)] to-[var(--warm-cream)] py-24">
        <div className="absolute inset-0 paw-pattern opacity-40" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 space-y-8"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
                <Bath className="h-4 w-4" />
                <span>Our Most Popular Service</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-heading font-black text-secondary leading-tight">
                DIY Dog Wash <br />
                <span className="gradient-text">Stress-Free Bathing.</span>
              </h1>
              <p className="text-xl text-secondary/60 leading-relaxed max-w-2xl">
                Keep your home clean and your pup fresh. Our professional-grade tubs are designed for comfort and safety, making bath time a fun bonding experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="h-14 px-8 rounded-full text-lg font-bold shadow-lg shadow-primary/25 hover:scale-105 transition-all bg-primary hover:bg-primary/90">
                  <Link href="https://shop.simplydlegos.com" target="_blank" className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>Book Your Spot</span>
                  </Link>
                </Button>
                <div className="flex items-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-primary/15 text-secondary font-medium">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  No Appointment Needed
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 w-full max-w-xl"
            >
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 to-warm-orange/15 rounded-3xl rotate-2" />
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-primary/15 border-4 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80&w=1200" 
                    alt="Dog in bath"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path fill="var(--background)" d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Pricing & Features */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 paw-pattern opacity-20" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Features */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-heading font-black text-secondary">What&apos;s Included?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  'Professional Waist-High Tubs',
                  'Aprons for Humans',
                  'Natural Shampoos & Conditioners',
                  'Variety of Brushes & Combs',
                  'High-Velocity Dryers',
                  'Fluffy Towels',
                  'Ear Cleaner & Cotton Balls',
                  'The Best Part: We Clean Up!'
                ].map((item) => (
                  <div key={item} className="flex items-start space-x-3 text-secondary/80">
                    <CheckCircle2 className="h-6 w-6 text-accent-green shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/15 flex items-start space-x-4">
                <Info className="h-6 w-6 text-primary shrink-0 mt-1" />
                <p className="text-sm text-secondary/60">
                  <strong className="text-secondary">Pro Tip:</strong> We recommend bringing your dog&apos;s favorite treats to keep them happy during the bath. Or, feel free to grab some from our selection in-store!
                </p>
              </div>
            </motion.div>

            {/* Pricing Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-secondary/15 rounded-3xl blur-sm" />
              <div className="relative bg-gradient-to-br from-secondary to-deep-teal rounded-3xl p-10 text-white shadow-2xl overflow-hidden">
                <div className="absolute inset-0 paw-pattern-light" />
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                <h2 className="text-3xl font-heading font-black mb-8 relative z-10">Pricing</h2>
                <div className="space-y-6 relative z-10">
                  {[
                    { label: 'Small Dogs (under 25lbs)', price: '$15' },
                    { label: 'Medium Dogs (25-50lbs)', price: '$18' },
                    { label: 'Large Dogs (50-90lbs)', price: '$22' },
                    { label: 'Extra Large Dogs (90lbs+)', price: '$25' },
                  ].map((tier) => (
                    <div key={tier.label} className="flex justify-between items-center py-4 border-b border-white/10 last:border-0">
                      <span className="text-lg font-bold">{tier.label}</span>
                      <span className="text-3xl font-heading font-black text-warm-orange">{tier.price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-10 p-6 rounded-2xl bg-white/10 border border-white/10 text-center relative z-10">
                  <p className="text-sm text-white/60">
                    * Pricing includes 45 minutes of tub time and all supplies listed above.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
