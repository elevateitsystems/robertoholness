'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const QuoteIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ed107c" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/></svg>
);

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);

const testimonials = [
  {
    name: 'Lindsay Wind',
    role: 'Pet Owner',
    text: 'And taped a amazingly lazily far gosh oh bald oh raffishly ouch ladybug far that the and alas slapped alas far brusque pridefully kneeled python horse alas sound because more prodigiously',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    dogImage: '/assets/placeholder.svg',
  },
  {
    name: 'Sarah M.',
    role: 'Cat Parent',
    text: 'Simply Diego\'s is the only place I trust for my dog\'s food. The staff is incredibly knowledgeable and the DIY wash is a lifesaver!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    dogImage: '/assets/placeholder.svg',
  },
  {
    name: 'James R.',
    role: 'Dog Lover',
    text: 'Great local shop with a fantastic selection. The delivery service is prompt and always comes with a friendly smile.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    dogImage: '/assets/placeholder.svg',
  },
];

export function GoogleReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 relative overflow-hidden bg-secondary">
      {/* Background Dots */}
      <div className="absolute inset-0 opacity-5 dot-pattern" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <p className="text-white/40 text-sm font-bold uppercase tracking-wider mb-2">🐾 Loved by Pets, Trusted by Owners.</p>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-white">
            Amazing <span className="text-primary">Feedback</span>
          </h2>
        </div>

        <div className="relative flex flex-col lg:flex-row items-stretch justify-center gap-12 max-w-6xl mx-auto min-h-[500px]">
          {/* Static Dog Image */}
          <div className="flex-1 flex justify-center items-center relative h-[400px] lg:h-[500px]">
            <div className="relative w-full h-full rounded-[5px] overflow-hidden">
              <Image
                src={testimonials[0].dogImage}
                alt="Happy Dog"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Testimonial Box (Sliding Content) */}
          <div className="flex-1 relative flex h-auto lg:h-[500px]">
            <div className="bg-white rounded-[5px] p-8 md:p-12 text-center relative shadow-2xl flex flex-col justify-center items-center w-full h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full flex flex-col items-center"
                >
                  <div className="flex justify-center mb-6">
                    <QuoteIcon className="opacity-20" />
                  </div>
                  
                  <div className="w-12 h-[2px] bg-primary/20 mx-auto mb-6" />

                  <p className="text-secondary/80 text-lg leading-relaxed mb-8 italic">
                    {testimonials[currentIndex].text}
                  </p>

                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-[5px] overflow-hidden relative border-2 border-primary/10">
                      <Image
                        src={testimonials[currentIndex].avatar}
                        alt={testimonials[currentIndex].name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-accent-green font-black text-xl">{testimonials[currentIndex].name}</h4>
                      <p className="text-primary font-bold text-sm uppercase tracking-wider">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button 
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-20"
              >
                <ChevronLeft />
              </button>
              <button 
                onClick={next}
                className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-20"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button asChild variant="outline" size="lg" className="rounded-[5px] px-10 font-bold bg-transparent border-2 border-white/20 text-white/80 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
            <Link href="/reviews" className="flex items-center gap-2">
              <span>View All Feedback</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
