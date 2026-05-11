'use client';

import Link from 'next/link';
import { Truck, MapPin, DollarSign, Package, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function LocalDeliveryPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--warm-cream)] via-[var(--warm-peach)] to-[var(--warm-cream)] py-24">
        <div className="absolute inset-0 paw-pattern opacity-40" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 space-y-8"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs font-bold uppercase tracking-wider border border-secondary/20">
                <Truck className="h-4 w-4" />
                <span>Convenient & Reliable</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-heading font-black text-secondary leading-tight">
                Local Delivery <br />
                <span className="gradient-text">Right to Your Porch.</span>
              </h1>
              <p className="text-xl text-secondary/60 leading-relaxed max-w-2xl">
                Albuquerque&apos;s fastest way to get natural pet food. Skip the trip and let us bring the best supplies directly to you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="h-14 px-8 rounded-full text-lg font-bold shadow-lg shadow-secondary/20 bg-secondary hover:bg-secondary/90 transition-all hover:scale-105">
                  <Link href="https://shop.simplydlegos.com" target="_blank" className="flex items-center justify-center">
                    Start Your Order
                  </Link>
                </Button>
                <div className="flex items-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-primary/15 text-secondary font-medium">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  Albuquerque Area Only
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
                <div className="absolute -inset-3 bg-gradient-to-br from-secondary/20 to-accent-green/15 rounded-3xl -rotate-2" />
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-secondary/15 border-4 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&q=80&w=1200" 
                    alt="Delivery van"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 via-transparent to-transparent" />
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

      {/* Details Grid */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 paw-pattern opacity-20" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Package, title: '1. Order Online', gradient: 'from-secondary to-deep-teal', text: 'Browse our full selection of food, treats, and toys on our online store. Select "Local Delivery" at checkout.' },
              { icon: DollarSign, title: '2. Free Over $50', gradient: 'from-primary to-warm-orange', text: 'Delivery is FREE for orders over $50. For orders under $50, we charge a small flat fee of $5.99.' },
              { icon: CheckCircle2, title: '3. Same-Day Delivery', gradient: 'from-accent-green to-[#6BA033]', text: 'Order by 12 PM for guaranteed same-day delivery. Orders placed later will be delivered the next business day.' }
            ].map((step, i) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-2xl bg-white/80 backdrop-blur-sm border border-primary/10 flex flex-col items-center text-center space-y-6 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} shadow-lg flex items-center justify-center text-white`}>
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black text-secondary">{step.title}</h3>
                <p className="text-secondary/60">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
