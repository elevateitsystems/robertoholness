'use client';

import Link from 'next/link';
import { Truck, MapPin, DollarSign, Package, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function LocalDeliveryPage() {
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
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-xl bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider">
                <Truck className="h-4 w-4" />
                <span>Convenient & Reliable</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-heading font-black text-slate-900 leading-tight">
                Local Delivery <br />
                <span className="text-primary">Right to Your Porch.</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                Albuquerque's fastest way to get natural pet food. Skip the trip and let us bring the best supplies directly to you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="h-14 px-8 rounded-xl text-lg font-bold shadow-xl bg-secondary hover:bg-secondary/90 transition-all hover:scale-105">
                  <Link href="https://shop.simplydlegos.com" target="_blank">
                    Start Your Order
                  </Link>
                </Button>
                <div className="flex items-center px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 font-medium">
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
              <div className="aspect-video rounded-xl bg-slate-200 overflow-hidden shadow-2xl border-8 border-white relative">
                 <img 
                  src="https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&q=80&w=1200" 
                  alt="Delivery van"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Details Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Package, title: '1. Order Online', color: 'text-secondary', text: 'Browse our full selection of food, treats, and toys on our online store. Select "Local Delivery" at checkout.' },
              { icon: DollarSign, title: '2. Free Over $50', color: 'text-primary', text: 'Delivery is FREE for orders over $50. For orders under $50, we charge a small flat fee of $5.99.' },
              { icon: CheckCircle2, title: '3. Same-Day Delivery', color: 'text-accent-green', text: 'Order by 12 PM for guaranteed same-day delivery. Orders placed later will be delivered the next business day.' }
            ].map((step, i) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center space-y-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className={`w-16 h-16 rounded-xl bg-white shadow-md flex items-center justify-center ${step.color}`}>
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{step.title}</h3>
                <p className="text-slate-600">
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
