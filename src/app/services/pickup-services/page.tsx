'use client';

import Link from 'next/link';
import { Store, ShoppingBag, Clock, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function PickupServicesPage() {
  return (
    <div className="flex flex-col w-full">
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--warm-cream)] via-[var(--warm-peach)] to-[var(--warm-cream)] py-24">
        <div className="absolute inset-0 paw-pattern opacity-40" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-warm-orange/10 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex-1 space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-warm-orange/15 text-warm-orange text-xs font-bold uppercase tracking-wider border border-warm-orange/20">
                <Store className="h-4 w-4" /><span>Fast & Contactless</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-heading font-black text-secondary leading-tight">Pickup Services <br /><span className="gradient-text">On Your Schedule.</span></h1>
              <p className="text-xl text-secondary/60 leading-relaxed max-w-2xl">Order from your couch and grab it on the go. Choose between quick in-store pickup or our convenient contactless curbside service.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="h-14 px-8 rounded-full text-lg font-bold shadow-lg shadow-primary/25 hover:scale-105 transition-all bg-primary hover:bg-primary/90">
                  <Link href="https://shop.simplydlegos.com" target="_blank" className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" /><span>Shop for Pickup</span>
                  </Link>
                </Button>
                <div className="flex items-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-primary/15 text-secondary font-medium">
                  <Clock className="mr-2 h-5 w-5 text-primary" />Ready in 60 Minutes
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex-1 w-full max-w-xl">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-br from-warm-orange/20 to-primary/15 rounded-3xl -rotate-2" />
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <img src="https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=1200" alt="Pet store storefront" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto"><path fill="var(--background)" d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" /></svg>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 paw-pattern opacity-20" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-12 rounded-2xl bg-gradient-to-br from-secondary/5 to-secondary/10 border border-secondary/15 space-y-6 hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-deep-teal text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Store className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-heading font-black text-secondary">In-Store Pickup</h3>
              <p className="text-lg text-secondary/60 leading-relaxed">Swing by and say hi! Your order will be waiting at our dedicated pickup counter. Perfect if you want to browse for a last-minute treat.</p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-center space-x-3 font-medium text-secondary/80"><ShieldCheck className="h-5 w-5 text-accent-green" /><span>Secure storage for fresh food</span></li>
                <li className="flex items-center space-x-3 font-medium text-secondary/80"><ShieldCheck className="h-5 w-5 text-accent-green" /><span>No waiting in line</span></li>
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="p-12 rounded-2xl bg-gradient-to-br from-secondary to-deep-teal text-white space-y-6 hover:shadow-xl transition-shadow group relative overflow-hidden">
              <div className="absolute inset-0 paw-pattern-light" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="w-16 h-16 rounded-2xl bg-white/15 text-white flex items-center justify-center group-hover:scale-110 transition-transform relative z-10 shadow-lg">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-heading font-black relative z-10">Curbside Pickup</h3>
              <p className="text-lg text-white/60 leading-relaxed relative z-10">The ultimate convenience. Park in our designated spots, give us a call, and we&apos;ll bring your order right to your car – hands-free!</p>
              <ul className="space-y-4 pt-4 relative z-10">
                <li className="flex items-center space-x-3 font-medium"><ShieldCheck className="h-5 w-5 text-warm-orange" /><span>100% Contactless available</span></li>
                <li className="flex items-center space-x-3 font-medium"><ShieldCheck className="h-5 w-5 text-warm-orange" /><span>Perfect for busy schedules</span></li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-[var(--warm-peach)]/40 to-[var(--warm-cream)]">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-16 relative z-10">
          <h2 className="text-4xl font-heading font-black text-secondary">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: ShoppingBag, title: 'Shop Online', text: 'Select "Store Pickup" at checkout.', gradient: 'from-primary to-warm-orange' },
              { icon: Clock, title: 'We Prep', text: 'We pick and pack your items with care.', gradient: 'from-secondary to-deep-teal' },
              { icon: ShieldCheck, title: 'Get Notified', text: "Receive an email when it's ready.", gradient: 'from-accent-green to-[#6BA033]' },
              { icon: MapPin, title: 'Pick It Up', text: 'Swing by and grab your gear!', gradient: 'from-warm-orange to-primary' }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="space-y-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg mx-auto flex items-center justify-center text-white`}>
                  <item.icon className="h-7 w-7" />
                </div>
                <h4 className="font-black text-secondary">{item.title}</h4>
                <p className="text-sm text-secondary/60">{item.text}</p>
              </motion.div>
            ))}
          </div>
          <div className="pt-8">
            <Button asChild size="lg" className="rounded-full font-bold h-14 px-10 shadow-lg shadow-primary/25 transition-all hover:scale-105 bg-primary hover:bg-primary/90">
              <Link href="https://shop.simplydlegos.com" target="_blank" className="flex items-center gap-2">
                <span>Start Shopping Now</span><ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
