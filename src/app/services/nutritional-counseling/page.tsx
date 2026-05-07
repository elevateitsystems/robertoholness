'use client';

import Link from 'next/link';
import { HeartPulse, ClipboardCheck, Apple, BrainCircuit, CheckCircle2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function CounselingFeature({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center space-y-4 p-8 rounded-xl bg-white shadow-sm border border-slate-100 hover:shadow-lg transition-all"
    >
      <div className="w-16 h-16 rounded-xl bg-accent-green/10 text-accent-green flex items-center justify-center mb-2">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default function NutritionalCounselingPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 space-y-8"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-xl bg-accent-green/10 text-accent-green text-xs font-bold uppercase tracking-wider">
                <HeartPulse className="h-4 w-4" />
                <span>Expert Guidance</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-heading font-black text-slate-900 leading-tight">
                Nutritional <br />
                <span className="text-secondary">Counseling.</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                What you put in their bowl matters. Our experts help you unlock your pet's full potential through science-backed, natural nutrition.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="h-14 px-8 rounded-xl text-lg font-bold shadow-xl transition-all hover:scale-105">
                  <Link href="/contact">
                    Book a Consultation
                  </Link>
                </Button>
                <div className="flex items-center px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 font-medium">
                  <Phone className="mr-2 h-5 w-5 text-primary" />
                  Call for Immediate Help
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 w-full max-w-xl"
            >
              <div className="aspect-square rounded-xl bg-slate-200 overflow-hidden shadow-2xl border-[12px] border-white relative">
                 <img 
                  src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=1200" 
                  alt="Pet nutrition expert"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-heading font-black text-slate-900 mb-6">Expertise You Can Trust</h2>
            <p className="text-lg text-slate-600">
              We take the guesswork out of pet food. Our approach is holistic, evidence-based, and focused on the long-term well-being of your dog or cat.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CounselingFeature 
              icon={ClipboardCheck} 
              title="Tailored Analysis" 
              description="We evaluate your pet's age, breed, weight, and activity level to create a custom profile." 
            />
            <CounselingFeature 
              icon={Apple} 
              title="Ingredient Clarity" 
              description="We explain exactly what's in the food and why it matters for your pet's specific health goals." 
            />
            <CounselingFeature 
              icon={BrainCircuit} 
              title="Problem Solving" 
              description="From allergies and skin issues to weight management, we address specific health concerns." 
            />
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-heading font-black">How It Works</h2>
              <div className="space-y-8">
                {[
                  { step: '01', title: 'Schedule a Call', text: 'Book a 15-minute introductory call to discuss your pet\'s current diet and any concerns.' },
                  { step: '02', title: 'In-Depth Review', text: 'We perform a deep dive into your pet\'s history and current health markers.' },
                  { step: '03', title: 'Custom Roadmap', text: 'Receive a detailed nutrition plan including recommended foods, supplements, and portions.' },
                  { step: '04', title: 'Ongoing Support', text: 'We\'re with you every step of the way with follow-up check-ins and adjustments.' },
                ].map((item) => (
                  <motion.div 
                    key={item.step} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-6"
                  >
                    <div className="shrink-0 text-3xl font-heading font-black text-secondary/40">{item.step}</div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold">{item.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-10 rounded-xl bg-white/5 border border-white/10 space-y-8"
            >
              <h3 className="text-2xl font-bold">What We Address:</h3>
              <ul className="space-y-4">
                {[
                  'Food Sensitivities & Allergies',
                  'Weight Management (Gain/Loss)',
                  'Digestive Health Issues',
                  'Joint & Mobility Support',
                  'Dull Coat & Skin Irritations',
                  'Picky Eaters & Appetite Loss',
                  'Life Stage Transitions (Puppy/Senior)'
                ].map((item) => (
                  <li key={item} className="flex items-center space-x-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-accent-green" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="w-full h-14 rounded-xl font-bold bg-accent-green text-slate-900 hover:bg-accent-green/90 transition-all hover:scale-105">
                <Link href="/contact">Book Your Free Consult</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
