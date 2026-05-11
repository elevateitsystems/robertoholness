'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

export function WelcomeSection() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Side: Image with Blob Shape */}
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square max-w-[500px] mx-auto"
            >
              {/* Decorative Dots */}
              <div className="absolute -top-10 -left-10 text-primary/20">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
                  <circle cx="10" cy="10" r="3"/><circle cx="30" cy="10" r="3"/><circle cx="50" cy="10" r="3"/><circle cx="70" cy="10" r="3"/><circle cx="90" cy="10" r="3"/>
                  <circle cx="10" cy="30" r="3"/><circle cx="30" cy="30" r="3"/><circle cx="50" cy="30" r="3"/><circle cx="70" cy="30" r="3"/><circle cx="90" cy="30" r="3"/>
                  <circle cx="10" cy="50" r="3"/><circle cx="30" cy="50" r="3"/><circle cx="50" cy="50" r="3"/><circle cx="70" cy="50" r="3"/><circle cx="90" cy="50" r="3"/>
                  <circle cx="10" cy="70" r="3"/><circle cx="30" cy="70" r="3"/><circle cx="50" cy="70" r="3"/><circle cx="70" cy="70" r="3"/><circle cx="90" cy="70" r="3"/>
                </svg>
              </div>
              <div className="absolute -bottom-10 -right-10 text-primary/20">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
                  <circle cx="10" cy="10" r="3"/><circle cx="30" cy="10" r="3"/><circle cx="50" cy="10" r="3"/><circle cx="70" cy="10" r="3"/><circle cx="90" cy="10" r="3"/>
                  <circle cx="10" cy="30" r="3"/><circle cx="30" cy="30" r="3"/><circle cx="50" cy="30" r="3"/><circle cx="70" cy="30" r="3"/><circle cx="90" cy="30" r="3"/>
                  <circle cx="10" cy="50" r="3"/><circle cx="30" cy="50" r="3"/><circle cx="50" cy="50" r="3"/><circle cx="70" cy="50" r="3"/><circle cx="90" cy="50" r="3"/>
                  <circle cx="10" cy="70" r="3"/><circle cx="30" cy="70" r="3"/><circle cx="50" cy="70" r="3"/><circle cx="70" cy="70" r="3"/><circle cx="90" cy="70" r="3"/>
                </svg>
              </div>
              
              {/* Main Image with Mask */}
              <div className="relative w-full h-full overflow-hidden border-[8px] border-primary/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800"
                  alt="Simply Diego's Store"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Side: Content */}
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-black text-secondary leading-tight">
                Welcome to Simply Diego&apos;s <span className="text-primary">Local Healthy Pet Store!</span>
              </h2>
              
              <p className="text-lg text-secondary/70 leading-relaxed">
                We are your premier Pet Food Store in the Albuquerque/New Mexico area. We offer a wide selection of natural pet food, supplies, toys and treats for your four-legged friend. Be sure to stop by if you&apos;re looking for a DIY dog wash! We look forward to seeing you soon.
              </p>

              <div className="bg-primary/5 p-6 border-l-4 border-primary rounded-[5px]">
                <p className="text-secondary/80 italic text-lg leading-relaxed">
                  &quot;Simply Diego’s has a great selection of pet products and a clean, well-organized store. Their staff is friendly and helpful, and the prices are reasonable. They also have a rewards program.&quot; 
                  <span className="block mt-4 font-bold text-secondary">— Pet News Daily (Top Pet Store in Albuquerque)</span>
                </p>
              </div>

              <h3 className="text-2xl font-black text-secondary pt-4">
                24/7 Online Ordering With Local Delivery and In-Store Pickup.
              </h3>

              <Button asChild size="lg" className="rounded-[5px] bg-primary hover:bg-primary/90 text-white font-bold h-14 px-10 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20">
                <Link href="https://shop.simplydlegos.com" target="_blank" className="flex items-center gap-2">
                  <span>Shop Now</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
