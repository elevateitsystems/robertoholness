'use client';

import { motion } from 'framer-motion';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const images = [
  'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1591768793355-74d75b060e9b?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=600',
];

export function InstagramFeed() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 text-secondary mb-4"
        >
          <InstagramIcon className="h-6 w-6" />
          <span className="font-bold tracking-wider uppercase text-sm">Follow us @simplydiegos</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-heading font-black text-slate-900 mb-12"
        >
          Smiles from Our <span className="text-primary">Furry Customers.</span>
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {images.map((src, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-lg bg-slate-100 shadow"
            >
              <img 
                src={src} 
                alt={`Customer Pet ${i + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <InstagramIcon className="text-white h-8 w-8" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
