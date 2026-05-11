'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const instagramImages = Array(10).fill('/assets/placeholder.svg');

export function InstagramFeed() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-green/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="mb-16 max-w-3xl mx-auto">
          <p className="text-secondary/50 text-sm font-bold uppercase tracking-wider mb-2">🐾 Follow us @simplydiegos</p>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-secondary uppercase mb-4">
            JOIN US ON <span className="text-primary">INSTAGRAM</span>
          </h2>
          <p className="text-lg text-secondary/60">
            Like Simply Diego&apos;s on Instagram for great photos of our local dogs, pet food & supply deals, upcoming events in Albuquerque, and more!
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 max-w-full mx-auto overflow-hidden rounded-[5px]">
          {instagramImages.map((src, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative aspect-square overflow-hidden"
            >
              <img 
                src={src} 
                alt={`Instagram Post ${i + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <InstagramIcon className="text-white h-8 w-8" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button asChild variant="outline" size="lg" className="rounded-[5px] px-10 font-bold border-2 border-secondary/20 text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
            <Link href="https://instagram.com/simplydiegos" target="_blank" className="flex items-center gap-2">
              <span>View More on Instagram</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
