'use client';

import Link from 'next/link';
import { HeartPulse, ClipboardCheck, Apple, BrainCircuit, CheckCircle2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

function CounselingFeature({ icon: Icon, title, description }: { icon: React.ComponentType<{ className?: string }>, title: string, description: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="flex flex-col items-center text-center space-y-4 p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-accent-green/15 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-green to-[#6BA033] text-white flex items-center justify-center mb-2 shadow-lg">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-black text-secondary">{title}</h3>
      <p className="text-secondary/60 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

const steps = [
  { step: '01', title: 'Schedule a Call', text: "Book a 15-minute introductory call to discuss your pet's current diet and any concerns." },
  { step: '02', title: 'In-Depth Review', text: "We perform a deep dive into your pet's history and current health markers." },
  { step: '03', title: 'Custom Roadmap', text: 'Receive a detailed nutrition plan including recommended foods, supplements, and portions.' },
  { step: '04', title: 'Ongoing Support', text: "We're with you every step of the way with follow-up check-ins and adjustments." },
];

const issues = ['Food Sensitivities & Allergies','Weight Management (Gain/Loss)','Digestive Health Issues','Joint & Mobility Support','Dull Coat & Skin Irritations','Picky Eaters & Appetite Loss','Life Stage Transitions (Puppy/Senior)'];

export default function NutritionalCounselingPage() {
  return (
    <div className="flex flex-col w-full">
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--warm-cream)] via-[var(--warm-peach)] to-[var(--warm-cream)] py-24">
        <div className="absolute inset-0 paw-pattern opacity-40" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-green/10 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex-1 space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-accent-green/15 text-accent-green text-xs font-bold uppercase tracking-wider border border-accent-green/20">
                <HeartPulse className="h-4 w-4" /><span>Expert Guidance</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-heading font-black text-secondary leading-tight">Nutritional <br /><span className="gradient-text-green">Counseling.</span></h1>
              <p className="text-xl text-secondary/60 leading-relaxed max-w-2xl">What you put in their bowl matters. Our experts help you unlock your pet&apos;s full potential through science-backed, natural nutrition.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="h-14 px-8 rounded-full text-lg font-bold shadow-lg shadow-primary/25 transition-all hover:scale-105 bg-primary hover:bg-primary/90">
                  <Link href="/contact">Book a Consultation</Link>
                </Button>
                <div className="flex items-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-primary/15 text-secondary font-medium">
                  <Phone className="mr-2 h-5 w-5 text-primary" />Call for Immediate Help
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex-1 w-full max-w-xl">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-br from-accent-green/20 to-secondary/15 rounded-3xl rotate-2" />
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <img src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=1200" alt="Pet nutrition expert" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto"><path fill="var(--background)" d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" /></svg>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 paw-pattern opacity-20" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-heading font-black text-secondary mb-6">Expertise You Can Trust</h2>
            <p className="text-lg text-secondary/60">We take the guesswork out of pet food. Our approach is holistic, evidence-based, and focused on the long-term well-being of your dog or cat.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CounselingFeature icon={ClipboardCheck} title="Tailored Analysis" description="We evaluate your pet's age, breed, weight, and activity level to create a custom profile." />
            <CounselingFeature icon={Apple} title="Ingredient Clarity" description="We explain exactly what's in the food and why it matters for your pet's specific health goals." />
            <CounselingFeature icon={BrainCircuit} title="Problem Solving" description="From allergies and skin issues to weight management, we address specific health concerns." />
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-secondary to-deep-teal text-white overflow-hidden relative">
        <div className="absolute inset-0 paw-pattern-light" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-heading font-black">How It Works</h2>
              <div className="space-y-8">
                {steps.map((item) => (
                  <motion.div key={item.step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-6">
                    <div className="shrink-0 text-3xl font-heading font-black text-primary/40">{item.step}</div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold">{item.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="p-10 rounded-3xl bg-white/10 border border-white/10 space-y-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold">What We Address:</h3>
              <ul className="space-y-4">
                {issues.map((item) => (
                  <li key={item} className="flex items-center space-x-3 text-white/80">
                    <CheckCircle2 className="h-5 w-5 text-accent-green" /><span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="w-full h-14 rounded-full font-bold bg-accent-green text-secondary hover:bg-accent-green/90 transition-all hover:scale-105 shadow-lg">
                <Link href="/contact">Book Your Free Consult</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
