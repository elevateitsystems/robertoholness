'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const GOOGLE_BUSINESS_URL =
  "https://www.google.com/maps/search/?api=1&query=Simply%20Diego%27s%203301%20Menaul%20Blvd%20NE%20Suite%2010%20Albuquerque%20NM%2087107";

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

const PawIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <ellipse cx="12" cy="17" rx="4" ry="5" opacity="0.9"/>
    <ellipse cx="6" cy="11" rx="2.5" ry="3" opacity="0.9"/>
    <ellipse cx="18" cy="11" rx="2.5" ry="3" opacity="0.9"/>
    <ellipse cx="8.5" cy="6" rx="2" ry="2.5" opacity="0.9"/>
    <ellipse cx="15.5" cy="6" rx="2" ry="2.5" opacity="0.9"/>
  </svg>
);

const contactInfo = [
  { icon: MapPinIcon, title: 'Address', text: '7321 San Antonio Dr NE\nAlbuquerque, NM 87109', color: 'from-primary to-warm-orange' },
  { icon: PhoneIcon, title: 'Phone', text: '505-990-0099', color: 'from-secondary to-deep-teal' },
  { icon: MailIcon, title: 'Email', text: 'info@simplydlegos.com', color: 'from-accent-green to-[#6BA033]' },
  { icon: ClockIcon, title: 'Store Hours', text: 'Mon - Fri: 9am - 7pm\nSat: 9am - 6pm\nSun: 10am - 6pm', color: 'from-warm-orange to-primary', href: GOOGLE_BUSINESS_URL },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--warm-cream)] via-[var(--warm-peach)] to-[var(--warm-cream)] py-24 border-b border-primary/10">
        <div className="absolute inset-0 paw-pattern opacity-40" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-green/8 rounded-full blur-[80px]" />
        
        <motion.div
          animate={{ y: [-5, 8, -5], rotate: [-5, 10, -5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 right-[15%] text-primary/15 hidden lg:block"
        >
          <PawIcon className="w-14 h-14" />
        </motion.div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs tracking-widest uppercase mb-6 border border-primary/20"
          >
            🐾 Contact Us
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-black text-secondary mb-8"
          >
            Get in <span className="gradient-text">Touch.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-secondary/60 max-w-2xl mx-auto leading-relaxed"
          >
            Have a question about nutrition? Need to book a wash? Our team of pet experts is here to help you and your furry friends.
          </motion.p>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path fill="var(--background)" d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 paw-pattern opacity-20" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-10">
                <h2 className="text-4xl font-heading font-black text-secondary">Visit Our Market</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {contactInfo.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start space-x-5 group"
                    >
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                        <item.icon />
                      </div>
                      <div>
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-lg font-black text-secondary mb-1 hover:text-primary transition-colors"
                          >
                            {item.title}
                          </a>
                        ) : (
                          <h4 className="text-lg font-black text-secondary mb-1">{item.title}</h4>
                        )}
                        <p className="text-secondary/60 leading-relaxed whitespace-pre-line">{item.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-br from-primary/15 to-secondary/10 rounded-3xl rotate-1" />
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
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
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent-green/15 rounded-3xl blur-sm" />
              <div className="relative bg-white/90 backdrop-blur-sm p-10 md:p-14 rounded-3xl border border-primary/10 shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent-green/5 rounded-full blur-3xl" />
                
                <h2 className="text-4xl font-heading font-black text-secondary mb-10 relative z-10">Send a Message</h2>
                <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-black text-secondary uppercase tracking-widest">Full Name</label>
                      <input type="text" className="w-full h-14 px-6 rounded-xl border-2 border-primary/15 bg-[var(--warm-cream)]/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all shadow-sm" placeholder="Your Name" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-black text-secondary uppercase tracking-widest">Email Address</label>
                      <input type="email" className="w-full h-14 px-6 rounded-xl border-2 border-primary/15 bg-[var(--warm-cream)]/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all shadow-sm" placeholder="email@example.com" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-secondary uppercase tracking-widest">What are you looking for?</label>
                    <select className="w-full h-14 px-6 rounded-xl border-2 border-primary/15 bg-[var(--warm-cream)]/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all shadow-sm appearance-none cursor-pointer">
                      <option>General Inquiry</option>
                      <option>DIY Wash Booking</option>
                      <option>Nutritional Counseling</option>
                      <option>Product Question</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-secondary uppercase tracking-widest">Message</label>
                    <textarea className="w-full h-40 p-6 rounded-xl border-2 border-primary/15 bg-[var(--warm-cream)]/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all resize-none shadow-sm" placeholder="Tell us how we can help your pet..."></textarea>
                  </div>
                  <Button className="w-full h-16 rounded-xl text-xl font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all bg-primary hover:bg-primary/90 flex items-center justify-center space-x-3">
                    <SendIcon />
                    <span>Send Message</span>
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
