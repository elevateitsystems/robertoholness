'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
);

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-slate-50 py-24 border-b border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-bold text-sm tracking-widest uppercase mb-6"
          >
            Contact Us
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-black text-slate-900 mb-8"
          >
            Get in <span className="text-secondary">Touch.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            Have a question about nutrition? Need to book a wash? Our team of pet experts is here to help you and your furry friends.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-10">
                <h2 className="text-4xl font-heading font-black text-slate-900">Visit Our Market</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="flex items-start space-x-5">
                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                      <MapPinIcon />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-900 mb-1">Address</h4>
                      <p className="text-slate-500 leading-relaxed">7321 San Antonio Dr NE<br/>Albuquerque, NM 87109</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <PhoneIcon />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-900 mb-1">Phone</h4>
                      <p className="text-slate-500 leading-relaxed">(505) 990-2014</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-5">
                    <div className="w-14 h-14 rounded-2xl bg-accent-green/10 text-accent-green flex items-center justify-center shrink-0">
                      <MailIcon />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-900 mb-1">Email</h4>
                      <p className="text-slate-500 leading-relaxed">info@simplydlegos.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-5">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                      <ClockIcon />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-900 mb-1">Store Hours</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        Mon - Fri: 9am - 7pm<br/>
                        Sat: 9am - 6pm<br/>
                        Sun: 10am - 5pm
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real Interactive Map */}
              <div className="aspect-video w-full rounded-lg overflow-hidden shadow border-8 border-slate-50 relative group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.2723382717757!2d-106.5645396!3d35.1747833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87227494f4c8034d%3A0x6b7b7b7b7b7b7b7b!2s7321%20San%20Antonio%20Dr%20NE%2C%20Albuquerque%2C%20NM%2087109!5e0!3m2!1sen!2sus!4v1715090000000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-10 md:p-14 rounded-lg border border-slate-100 shadow relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl" />
              <h2 className="text-4xl font-heading font-black text-slate-900 mb-10 relative z-10">Send a Message</h2>
              <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-900 uppercase tracking-widest">Full Name</label>
                    <input type="text" className="w-full h-14 px-6 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-secondary transition-all shadow" placeholder="Your Name" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-900 uppercase tracking-widest">Email Address</label>
                    <input type="email" className="w-full h-14 px-6 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-secondary transition-all shadow" placeholder="email@example.com" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-black text-slate-900 uppercase tracking-widest">What are you looking for?</label>
                  <select className="w-full h-14 px-6 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-secondary transition-all shadow appearance-none cursor-pointer">
                    <option>General Inquiry</option>
                    <option>DIY Wash Booking</option>
                    <option>Nutritional Counseling</option>
                    <option>Product Question</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-black text-slate-900 uppercase tracking-widest">Message</label>
                  <textarea className="w-full h-40 p-6 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-secondary transition-all resize-none shadow" placeholder="Tell us how we can help your pet..."></textarea>
                </div>
                <Button className="w-full h-16 rounded-lg text-xl font-bold shadow hover:scale-[1.02] active:scale-[0.98] transition-all bg-secondary hover:bg-secondary/90 flex items-center justify-center space-x-3">
                  <SendIcon />
                  <span>Send Message</span>
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
