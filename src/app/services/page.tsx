'use client';

import Link from 'next/link';
import { Bath, Truck, HeartPulse, Store, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const PawIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <ellipse cx="12" cy="17" rx="4" ry="5" opacity="0.9"/>
    <ellipse cx="6" cy="11" rx="2.5" ry="3" opacity="0.9"/>
    <ellipse cx="18" cy="11" rx="2.5" ry="3" opacity="0.9"/>
    <ellipse cx="8.5" cy="6" rx="2" ry="2.5" opacity="0.9"/>
    <ellipse cx="15.5" cy="6" rx="2" ry="2.5" opacity="0.9"/>
  </svg>
);

const services = [
  {
    title: 'DIY Dog Wash',
    description: 'Our state-of-the-art DIY dog wash stations make bath time a breeze. No more backaches or messy bathrooms – we provide the professional-grade tubs, premium shampoos, brushes, and towels. Just bring your dog and we\'ll handle the cleanup!',
    icon: Bath,
    href: '/services/diy-dog-wash',
    features: ['Professional Tubs', 'Premium Shampoos', 'Towels Provided', 'No Cleanup for You'],
    gradient: 'from-primary/10 to-primary/5',
    iconBg: 'bg-gradient-to-br from-primary to-warm-orange',
    borderColor: 'border-primary/20',
  },
  {
    title: 'Local Delivery',
    description: 'Can\'t make it to the store? No problem! We offer fast, reliable local delivery across Albuquerque. Get your pet\'s favorite food, treats, and supplies delivered right to your porch.',
    icon: Truck,
    href: '/services/local-delivery',
    features: ['Fast Turnaround', 'Albuquerque Area', 'Free Over $50', 'Contactless Option'],
    gradient: 'from-secondary/10 to-secondary/5',
    iconBg: 'bg-gradient-to-br from-secondary to-deep-teal',
    borderColor: 'border-secondary/20',
  },
  {
    title: 'Nutritional Counseling',
    description: 'Every pet is unique. Our expert counselors help you navigate the complex world of pet nutrition to find the perfect diet for your dog or cat\'s age, breed, and health requirements.',
    icon: HeartPulse,
    href: '/services/nutritional-counseling',
    features: ['Expert Guidance', 'Allergy Support', 'Weight Management', 'Custom Meal Plans'],
    gradient: 'from-accent-green/10 to-accent-green/5',
    iconBg: 'bg-gradient-to-br from-accent-green to-[#6BA033]',
    borderColor: 'border-accent-green/20',
  },
  {
    title: 'Pickup Services',
    description: 'Short on time? Order through our online store and select "Pickup". We\'ll have your items ready and waiting. Choose from quick in-store pickup or our convenient curbside service.',
    icon: Store,
    href: '/services/pickup-services',
    features: ['Easy Online Ordering', 'Curbside Available', 'Ready in Minutes', 'No Extra Fees'],
    gradient: 'from-warm-orange/10 to-warm-orange/5',
    iconBg: 'bg-gradient-to-br from-warm-orange to-primary',
    borderColor: 'border-warm-orange/20',
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--warm-cream)] via-[var(--warm-peach)] to-[var(--warm-cream)] py-20 border-b border-primary/10">
        <div className="absolute inset-0 paw-pattern opacity-40" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/8 rounded-full blur-[80px]" />
        
        {/* Floating paw */}
        <motion.div
          animate={{ y: [-5, 8, -5], rotate: [-5, 10, -5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 right-[15%] text-primary/15 hidden lg:block"
        >
          <PawIcon className="w-14 h-14" />
        </motion.div>

        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-primary/10 text-primary font-bold text-xs tracking-widest uppercase mb-6 border border-primary/20"
          >
            🐾 What We Offer
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-heading font-black text-secondary mb-6"
          >
            Our <span className="gradient-text">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-secondary/60 max-w-3xl mx-auto leading-relaxed"
          >
            At Simply Diego's, we go beyond just selling food. We provide a full suite of services to support your pet's health, hygiene, and happiness.
          </motion.p>
        </div>
        
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path fill="var(--background)" d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 paw-pattern opacity-30" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Content */}
                <div className="flex-1 space-y-8">
                  <div className={`w-16 h-16 rounded-lg ${service.iconBg} flex items-center justify-center mb-6 text-white shadow-lg`}>
                    <service.icon className="h-8 w-8" />
                  </div>
                  <h2 className="text-4xl font-heading font-black text-secondary">{service.title}</h2>
                  <p className="text-lg text-secondary/60 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2 text-secondary/80 font-medium">
                        <CheckCircle2 className="h-5 w-5 text-accent-green" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4">
                    <Button asChild size="lg" className="rounded-lg font-bold h-12 px-8 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 transition-all hover:scale-105">
                      <Link href={service.href} className="flex items-center gap-2">
                        <span>Full Service Details</span>
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Visual */}
                <div className="flex-1 w-full">
                  <div className="relative">
                    <div className={`absolute -inset-3 bg-gradient-to-br ${service.gradient} rounded-lg ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'}`} />
                    <div className={`relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl border-4 border-white ${service.borderColor}`}>
                      <img 
                        src={`https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800&sig=${index}`} 
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary via-primary/95 to-warm-orange text-white relative overflow-hidden">
        <div className="absolute inset-0 paw-pattern-light" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
        
        {/* Floating paw */}
        <motion.div
          animate={{ y: [-8, 8, -8], rotate: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 right-[10%] text-white/10 hidden lg:block"
        >
          <PawIcon className="w-16 h-16" />
        </motion.div>

        <div className="container mx-auto px-4 md:px-6 text-center space-y-8 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-heading font-black"
          >
            Need Something Else?
          </motion.h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Our team is always here to help. Whether you have questions about nutrition or need a special order, just let us know.
          </p>
          <Button asChild variant="outline" size="lg" className="rounded-lg bg-white text-primary border-none hover:bg-white/90 font-bold h-14 px-10 text-lg shadow-xl shadow-black/10 hover:scale-105 transition-all">
            <Link href="/contact">Contact Our Team</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
