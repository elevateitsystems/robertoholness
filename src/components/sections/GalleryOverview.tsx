'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const CameraIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
);

const PawIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <ellipse cx="12" cy="17" rx="4" ry="5" opacity="0.9"/>
    <ellipse cx="6" cy="11" rx="2.5" ry="3" opacity="0.9"/>
    <ellipse cx="18" cy="11" rx="2.5" ry="3" opacity="0.9"/>
    <ellipse cx="8.5" cy="6" rx="2" ry="2.5" opacity="0.9"/>
    <ellipse cx="15.5" cy="6" rx="2" ry="2.5" opacity="0.9"/>
  </svg>
);

const galleryItems = [
  {
    src: '/assets/placeholder.svg',
    alt: 'Happy dog at Simply Diego\'s',
    label: 'Our Friends',
    span: 'md:col-span-2 md:row-span-2',
    aspect: 'aspect-square',
  },
  {
    src: '/assets/placeholder.svg',
    alt: 'Dog grooming session',
    label: 'DIY Wash',
    span: '',
    aspect: 'aspect-square',
  },
  {
    src: '/assets/placeholder.svg',
    alt: 'Cat relaxing at store',
    label: 'Cat Corner',
    span: '',
    aspect: 'aspect-square',
  },
  {
    src: '/assets/placeholder.svg',
    alt: 'Natural pet treats',
    label: 'Treats',
    span: '',
    aspect: 'aspect-square',
  },
  {
    src: '/assets/placeholder.svg',
    alt: 'Puppies playing',
    label: 'Puppy Love',
    span: '',
    aspect: 'aspect-square',
  },
  {
    src: '/assets/placeholder.svg',
    alt: 'Pet family outing',
    label: 'Happy Families',
    span: 'md:col-span-2',
    aspect: 'aspect-[2/1]',
  },
];

export function GalleryOverview() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[var(--warm-peach)]/30 to-[var(--warm-cream)]">
      {/* Background decoration */}
      <div className="absolute inset-0 paw-pattern opacity-25" />
      <div className="absolute top-20 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-accent-green/5 rounded-full blur-[100px]" />

      {/* Top wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path fill="var(--background)" d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-secondary/50 text-sm font-bold uppercase tracking-wider mb-2">📸 Our Gallery</p>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-secondary">
            Smiles from Our <span className="text-[#ed107c]">Community</span>
          </h2>
          <p className="text-lg text-secondary/60 mt-4">
            A glimpse into our store, our community, and the happy pets we serve every day.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
              className={`group relative ${item.span} ${item.aspect} overflow-hidden rounded-[5px] shadow-lg border border-white/80 cursor-pointer`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end pb-5">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  className="text-center"
                >
                  <p className="text-white font-bold text-lg drop-shadow-lg">{item.label}</p>
                  <div className="w-8 h-0.5 bg-[#ed107c] mx-auto mt-2 rounded-full" />
                </motion.div>
              </div>
              {/* Subtle border glow on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/40 rounded-[5px] transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Button asChild variant="outline" size="lg" className="rounded-[5px] px-10 font-bold border-2 border-secondary/20 text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
            <Link href="/gallery" className="flex items-center gap-2">
              <span>View Full Gallery</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
