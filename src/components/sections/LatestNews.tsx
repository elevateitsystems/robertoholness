'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const ArrowRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);

const blogPosts = [
  {
    title: "How to Create a Pet's Patio, or Outdoor Space",
    excerpt: "Proin viverra nisi at nisl imperdiet auctor. Donec ornare, est sed tincidunt placerat, sem mi suscipit mi.",
    date: "09",
    month: "JUL",
    comments: "0 Comments",
    image: "/assets/placeholder.svg",
    href: "/blog/pet-patio"
  },
  {
    title: "Overload Is When A Girl Is Exhausted From Fun",
    excerpt: "Proin viverra nisi at nisl imperdiet auctor. Donec ornare, est sed tincidunt placerat, sem mi suscipit mi.",
    date: "09",
    month: "JUN",
    comments: "3 Comments",
    image: "/assets/placeholder.svg",
    href: "/blog/exhausted-from-fun"
  },
  {
    title: "Dog Flu – Does Your Dog Need Protecting?",
    excerpt: "Proin viverra nisi at nisl imperdiet auctor. Donec ornare, est sed tincidunt placerat, sem mi suscipit mi.",
    date: "07",
    month: "JUN",
    comments: "0 Comments",
    image: "/assets/placeholder.svg",
    href: "/blog/dog-flu"
  },
  {
    title: "The Best Natural Foods for Puppy Growth",
    excerpt: "Proin viverra nisi at nisl imperdiet auctor. Donec ornare, est sed tincidunt placerat, sem mi suscipit mi.",
    date: "12",
    month: "AUG",
    comments: "2 Comments",
    image: "/assets/placeholder.svg",
    href: "/blog/puppy-growth"
  },
  {
    title: "Winter Care Tips for Your Senior Dog",
    excerpt: "Proin viverra nisi at nisl imperdiet auctor. Donec ornare, est sed tincidunt placerat, sem mi suscipit mi.",
    date: "15",
    month: "DEC",
    comments: "5 Comments",
    image: "/assets/placeholder.svg",
    href: "/blog/winter-care"
  }
];

export function LatestNews() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsVisible = 3;
  const maxIndex = blogPosts.length - itemsVisible;

  const next = () => {
    setStartIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setStartIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="mb-16">
          <p className="text-secondary/50 text-sm font-bold uppercase tracking-wider mb-2">🐾 Recent Blog Post</p>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-secondary">
            Latest <span className="text-primary">News</span> & Articles
          </h2>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-12">
          {/* Navigation Arrows */}
          <button 
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all z-20"
          >
            <ChevronLeft />
          </button>
          <button 
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all z-20"
          >
            <ChevronRight />
          </button>

          <div className="overflow-hidden py-4">
            <motion.div 
              className="flex gap-6 md:gap-8"
              initial={false}
              animate={{ x: `-${startIndex * (100 / itemsVisible)}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {blogPosts.map((post, i) => (
                <div
                  key={i}
                  className="min-w-full md:min-w-[calc(33.333%-1.5rem)] lg:min-w-[calc(33.333%-1.5rem)]"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-[5px] shadow-md border border-black/5 overflow-hidden group text-left h-full"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Date Badge */}
                      <div className="absolute left-6 -bottom-6 bg-secondary text-white w-14 h-16 rounded-[5px] flex flex-col items-center justify-center z-10 shadow-lg">
                        <span className="text-xl font-black leading-none">{post.date}</span>
                        <span className="text-[10px] font-bold mt-1">{post.month}</span>
                      </div>
                    </div>

                    <div className="p-8 pt-10 flex flex-col h-[calc(100%-10rem)]">
                      <div className="flex justify-end mb-4">
                        <span className="text-accent-green text-xs font-bold uppercase tracking-wider">{post.comments}</span>
                      </div>
                      
                      <h3 className="text-xl font-black text-secondary mb-4 group-hover:text-primary transition-colors leading-tight min-h-[3.5rem]">
                        <Link href={post.href}>{post.title}</Link>
                      </h3>
                      
                      <p className="text-secondary/60 text-sm mb-8 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="mt-auto pt-6 border-t border-black/5">
                        <Link 
                          href={post.href}
                          className="inline-flex items-center gap-2 text-sm font-black text-secondary hover:text-primary transition-all group/link"
                        >
                          <span>Read More</span>
                          <div className="text-primary transition-transform group-hover/link:translate-x-1">
                            <ArrowRight />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="mt-16">
          <Button asChild variant="outline" size="lg" className="rounded-[5px] px-10 font-bold border-2 border-secondary/20 text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
            <Link href="/blog" className="flex items-center gap-2">
              <span>View All Blog</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
