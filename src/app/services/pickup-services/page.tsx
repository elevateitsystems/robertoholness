'use client';

import Link from 'next/link';
import { Store, ShoppingBag, Clock, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function PickupServicesPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 space-y-8"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-xl bg-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
                <Store className="h-4 w-4" />
                <span>Fast & Contactless</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-heading font-black text-slate-900 leading-tight">
                Pickup Services <br />
                <span className="text-secondary">On Your Schedule.</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                Order from your couch and grab it on the go. Choose between quick in-store pickup or our convenient contactless curbside service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="h-14 px-8 rounded-xl text-lg font-bold shadow-xl hover:scale-105 transition-all">
                  <Link href="https://shop.simplydlegos.com" target="_blank">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Shop for Pickup
                  </Link>
                </Button>
                <div className="flex items-center px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 font-medium">
                  <Clock className="mr-2 h-5 w-5 text-secondary" />
                  Ready in 60 Minutes
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 w-full max-w-xl"
            >
              <div className="aspect-[4/3] rounded-xl bg-slate-200 overflow-hidden shadow-2xl border-8 border-white relative">
                 <img 
                  src="https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=1200" 
                  alt="Pet store storefront"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Two Ways to Pickup */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Way 1: In-Store */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-12 rounded-xl bg-slate-50 border border-slate-100 space-y-6 hover:shadow-xl transition-shadow group"
            >
              <div className="w-16 h-16 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Store className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-heading font-black text-slate-900">In-Store Pickup</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Swing by and say hi! Your order will be waiting at our dedicated pickup counter. Perfect if you want to browse for a last-minute treat.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-center space-x-3 font-medium text-slate-700">
                  <ShieldCheck className="h-5 w-5 text-accent-green" />
                  <span>Secure storage for fresh food</span>
                </li>
                <li className="flex items-center space-x-3 font-medium text-slate-700">
                  <ShieldCheck className="h-5 w-5 text-accent-green" />
                  <span>No waiting in line</span>
                </li>
              </ul>
            </motion.div>

            {/* Way 2: Curbside */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-12 rounded-xl bg-slate-900 text-white space-y-6 hover:shadow-xl transition-shadow group relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="w-16 h-16 rounded-xl bg-white/10 text-white flex items-center justify-center group-hover:scale-110 transition-transform relative z-10">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-heading font-black relative z-10">Curbside Pickup</h3>
              <p className="text-lg text-slate-400 leading-relaxed relative z-10">
                The ultimate convenience. Park in our designated spots, give us a call, and we'll bring your order right to your car – hands-free!
              </p>
              <ul className="space-y-4 pt-4 relative z-10">
                <li className="flex items-center space-x-3 font-medium">
                  <ShieldCheck className="h-5 w-5 text-secondary" />
                  <span>100% Contactless available</span>
                </li>
                <li className="flex items-center space-x-3 font-medium">
                  <ShieldCheck className="h-5 w-5 text-secondary" />
                  <span>Perfect for busy schedules</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Guide */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-16">
          <h2 className="text-4xl font-heading font-black text-slate-900">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: ShoppingBag, title: 'Shop Online', text: 'Select "Store Pickup" at checkout.' },
              { icon: Clock, title: 'We Prep', text: 'We pick and pack your items with care.' },
              { icon: ShieldCheck, title: 'Get Notified', text: 'Receive an email when it\'s ready.' },
              { icon: MapPin, title: 'Pick It Up', text: 'Swing by and grab your gear!' }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-4"
              >
                 <div className="w-12 h-12 rounded-full bg-white shadow-md mx-auto flex items-center justify-center text-secondary">
                  <item.icon className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-slate-900">{item.title}</h4>
                <p className="text-sm text-slate-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
          <div className="pt-8">
             <Button asChild size="lg" className="rounded-xl font-bold h-14 px-10 shadow-xl transition-all hover:scale-105">
              <Link href="https://shop.simplydlegos.com" target="_blank">
                Start Shopping Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
