'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
    title: 'Natural Food Counseling',
    description: 'Expert guidance on biology-based diets tailored to your pet\'s unique health needs and age.',
    icon: ({ className }: { className?: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 20A7 7 0 0 1 11 6a7 7 0 0 1 0 14Zm0-11v4m0 4h.01"/><path d="M12 2a10 10 0 1 1-10 10A10 10 0 0 1 12 2Z"/></svg>
    ),
    gradient: 'from-[#FFF9F0] to-[#FFF1DE]',
    iconBg: 'bg-warm-orange',
    borderColor: 'border-warm-orange/20',
    hoverShadow: 'hover:shadow-warm-orange/20',
  },
  {
    title: 'DIY Dog Wash',
    description: 'Stress-free, easy-to-use professional washing stations with premium natural shampoos provided.',
    icon: ({ className }: { className?: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4Z"/></svg>
    ),
    gradient: 'from-[#F0F7FF] to-[#DEEDFF]',
    iconBg: 'bg-primary',
    borderColor: 'border-primary/20',
    hoverShadow: 'hover:shadow-primary/20',
  },
  {
    title: 'Curbside Pickup',
    description: 'Order online or by phone and we\'ll bring your pet supplies right to your car door.',
    icon: ({ className }: { className?: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M13 18l5-5-5-5"/><path d="M6 13h12"/><path d="M3 13h1"/></svg>
    ),
    gradient: 'from-[#F0FFF4] to-[#DEFFE9]',
    iconBg: 'bg-accent-green',
    borderColor: 'border-accent-green/20',
    hoverShadow: 'hover:shadow-accent-green/20',
  },
  {
    title: 'Local Delivery',
    description: 'Fast, reliable local delivery across Albuquerque so you never run out of your pet\'s favorites.',
    icon: ({ className }: { className?: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="16" height="13" x="2" y="6" rx="2"/><path d="M16 9h4l2 3v6h-4M7 18h.01M17 18h.01"/></svg>
    ),
    gradient: 'from-[#FFF0F0] to-[#FFDEDE]',
    iconBg: 'bg-[#ed107c]',
    borderColor: 'border-[#ed107c]/20',
    hoverShadow: 'hover:shadow-[#ed107c]/20',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export function ServicesOverview() {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Subtle paw pattern background */}
      <div className="absolute inset-0 paw-pattern opacity-40" />

      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-[100px]" />

      {/* Floating paw */}
      <motion.div
        animate={{ y: [-6, 8, -6], rotate: [-3, 8, -3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-32 right-[8%] text-primary/8 hidden lg:block"
      >
        <PawIcon className="w-14 h-14" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-secondary/50 text-sm font-bold uppercase tracking-wider mb-2">🐾 Our Services</p>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-secondary">
            Professional <span className="text-[#ed107c]">Pet</span> Services
          </h2>
          <p className="text-lg text-secondary/60 mt-4">
            From nutrition to hygiene, we provide premium services designed to keep your furry friends healthy, happy, and smelling great.
          </p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              className={`group p-7 rounded-[5px] border ${service.borderColor} bg-gradient-to-b ${service.gradient} backdrop-blur-sm hover:shadow-2xl ${service.hoverShadow} transition-all duration-500 relative overflow-hidden`}
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${service.iconBg} opacity-60 group-hover:opacity-100 transition-opacity`} />
              
              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`w-14 h-14 rounded-[5px] ${service.iconBg} flex items-center justify-center mb-6 text-white shadow-lg`}
              >
                <service.icon className="h-7 w-7" />
              </motion.div>
              
              <h3 className="text-xl font-black text-secondary mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              
              <p className="text-secondary/70 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button asChild variant="outline" size="lg" className="rounded-[5px] px-10 font-bold border-2 border-secondary/20 text-secondary hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-300">
            <Link href="/services" className="flex items-center gap-2">
              <span>View All Services</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
