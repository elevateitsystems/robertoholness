'use client';

import Link from 'next/link';
import { Bath, Truck, HeartPulse, Store, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'DIY Dog Wash',
    description: 'Our state-of-the-art DIY dog wash stations make bath time a breeze. No more backaches or messy bathrooms – we provide the professional-grade tubs, premium shampoos, brushes, and towels. Just bring your dog and we\'ll handle the cleanup!',
    icon: Bath,
    href: '/services/diy-dog-wash',
    features: ['Professional Tubs', 'Premium Shampoos', 'Towels Provided', 'No Cleanup for You'],
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Local Delivery',
    description: 'Can\'t make it to the store? No problem! We offer fast, reliable local delivery across Albuquerque. Get your pet\'s favorite food, treats, and supplies delivered right to your porch.',
    icon: Truck,
    href: '/services/local-delivery',
    features: ['Fast Turnaround', 'Albuquerque Area', 'Free Over $50', 'Contactless Option'],
    color: 'bg-secondary/10 text-secondary',
  },
  {
    title: 'Nutritional Counseling',
    description: 'Every pet is unique. Our expert counselors help you navigate the complex world of pet nutrition to find the perfect diet for your dog or cat\'s age, breed, and health requirements.',
    icon: HeartPulse,
    href: '/services/nutritional-counseling',
    features: ['Expert Guidance', 'Allergy Support', 'Weight Management', 'Custom Meal Plans'],
    color: 'bg-accent-green/10 text-accent-green',
  },
  {
    title: 'Pickup Services',
    description: 'Short on time? Order through our online store and select "Pickup". We\'ll have your items ready and waiting. Choose from quick in-store pickup or our convenient curbside service.',
    icon: Store,
    href: '/services/pickup-services',
    features: ['Easy Online Ordering', 'Curbside Available', 'Ready in Minutes', 'No Extra Fees'],
    color: 'bg-slate-100 text-slate-600',
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Header Section */}
      <section className="bg-slate-50 py-20 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-heading font-black text-slate-900 mb-6"
          >
            Our <span className="text-secondary">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            At Simply Diego's, we go beyond just selling food. We provide a full suite of services to support your pet's health, hygiene, and happiness.
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
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
                  <div className={`w-16 h-16 rounded-lg ${service.color} flex items-center justify-center mb-6`}>
                    <service.icon className="h-8 w-8" />
                  </div>
                  <h2 className="text-4xl font-heading font-black text-slate-900">{service.title}</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2 text-slate-700 font-medium">
                        <CheckCircle2 className="h-5 w-5 text-accent-green" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4">
                    <Button asChild size="lg" className="rounded-lg font-bold h-12 px-8 shadow hover:shadow transition-all">
                      <Link href={service.href} className="flex items-center gap-2">
                        <span>Full Service Details</span>
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Visual Placeholder */}
                <div className="flex-1 w-full">
                  <div className="aspect-[4/3] rounded-lg bg-slate-100 overflow-hidden shadow border-4 border-white relative">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold italic">
                      [ Placeholder for {service.title} Image ]
                    </div>
                    <img 
                      src={`https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800&sig=${index}`} 
                      alt={service.title}
                      className="w-full h-full object-cover opacity-60"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-8">
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
          <Button asChild variant="outline" size="lg" className="rounded-lg bg-white text-primary border-none hover:bg-slate-100 font-bold h-14 px-10 text-lg shadow">
            <Link href="/contact">Contact Our Team</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
