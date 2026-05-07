'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const BathIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-2.12 0 1.5 1.5 0 0 0 0 2.12L7 8.5"/><path d="M2 11h20"/><path d="M19 11v5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-5"/><path d="M5 18v2"/><path d="M19 20v-2"/></svg>
);

const TruckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-5h-7v7Z"/><path d="M13 9h4"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
);

const HeartPulseIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg>
);

const StoreIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const services = [
  {
    title: 'DIY Dog Wash',
    description: 'Professional-grade tubs and shampoos. We provide everything, you just bring the dog!',
    icon: BathIcon,
    href: '/services/diy-dog-wash',
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Local Delivery',
    description: 'Fresh food and supplies delivered right to your doorstep in the Albuquerque area.',
    icon: TruckIcon,
    href: '/services/local-delivery',
    color: 'bg-secondary/10 text-secondary',
  },
  {
    title: 'Nutritional Counseling',
    description: 'Expert guidance to help you choose the best diet for your pet\'s unique needs.',
    icon: HeartPulseIcon,
    href: '/services/nutritional-counseling',
    color: 'bg-accent-green/10 text-accent-green',
  },
  {
    title: 'Pickup Services',
    description: 'Order online and swing by for quick, contactless curbside or in-store pickup.',
    icon: StoreIcon,
    href: '/services/pickup-services',
    color: 'bg-slate-100 text-slate-600',
  },
];

export function ServicesOverview() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-heading font-black text-slate-900 mb-4"
          >
            Everything Your Pet Needs, <span className="text-primary">In One Place.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            From nutrition to hygiene, we provide premium services designed to keep your furry friends healthy, happy, and smelling great.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                {service.description}
              </p>
              <Link 
                href={service.href} 
                className="inline-flex items-center text-sm font-bold text-secondary hover:underline group-hover:gap-2 transition-all"
              >
                Learn More <ArrowRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-xl px-8 font-bold border-2 hover:bg-slate-100 transition-all">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
