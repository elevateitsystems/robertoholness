'use client';

import { motion } from 'framer-motion';

const StarIcon = ({ className, fill }: { className?: string, fill?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={fill || "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);

const QuoteIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/></svg>
);

const reviews = [
  {
    name: 'Sarah M.',
    text: 'Simply Diego\'s is the only place I trust for my dog\'s food. The staff is incredibly knowledgeable and the DIY wash is a lifesaver!',
    rating: 5,
    date: '2 weeks ago',
  },
  {
    name: 'James R.',
    text: 'Great local shop with a fantastic selection. The delivery service is prompt and always comes with a friendly smile.',
    rating: 5,
    date: '1 month ago',
  },
  {
    name: 'Linda K.',
    text: 'The nutritional counseling helped me find a diet that finally fixed my puppy\'s allergies. Truly grateful for their expertise!',
    rating: 5,
    date: '3 days ago',
  },
];

export function GoogleReviews() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6 text-center md:text-left">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-heading font-black text-slate-900 mb-4"
            >
              Loved by Pets, <span className="text-secondary">Trusted by Owners.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-600"
            >
              Join hundreds of happy Albuquerque pet parents who choose Simply Diego's for natural care and expert advice.
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center md:items-end space-y-2"
          >
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-6 w-6" fill="currentColor" />
              ))}
            </div>
            <div className="text-sm font-bold text-slate-900">4.9 / 5.0 Rating on Google</div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-8 rounded-xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <QuoteIcon className="absolute top-6 right-6 h-8 w-8 text-slate-100" />
              <div className="flex text-yellow-400 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" fill="currentColor" />
                ))}
              </div>
              <p className="text-slate-700 italic mb-6 leading-relaxed">
                "{review.text}"
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                <span className="font-bold text-slate-900">{review.name}</span>
                <span className="text-xs text-slate-400">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
