import Link from 'next/link';
import Image from 'next/image';

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Social */}
          <div className="space-y-8">
            <Link href="/" className="inline-block">
              <Image 
                src="/assets/logo-without-bg.png" 
                alt="Simply Diego's Logo" 
                width={180} 
                height={60} 
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-base leading-relaxed text-slate-400">
              Albuquerque's premier natural pet food market. We focus on providing the best nutrition and care for your furry family members since 2008.
            </p>
            <div className="flex space-x-5">
              <Link href="https://facebook.com" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-all">
                <FacebookIcon />
              </Link>
              <Link href="https://instagram.com" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-all">
                <InstagramIcon />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-8 text-sm font-bold uppercase tracking-[0.2em] text-white">Quick Links</h3>
            <ul className="space-y-4 text-base">
              <li><Link href="/services" className="hover:text-secondary transition-colors">Our Services</Link></li>
              <li><Link href="/reviews" className="hover:text-secondary transition-colors">Customer Reviews</Link></li>
              <li><Link href="/gallery" className="hover:text-secondary transition-colors">Pet Gallery</Link></li>
              <li><Link href="/blog" className="hover:text-secondary transition-colors">Pet Care Blog</Link></li>
              <li><Link href="https://shop.simplydlegos.com/products/list/" target="_blank" className="text-secondary font-bold hover:underline">Shop Online Store</Link></li>
            </ul>
          </div>

          {/* Business Info */}
          <div>
            <h3 className="mb-8 text-sm font-bold uppercase tracking-[0.2em] text-white">Visit Us</h3>
            <ul className="space-y-6 text-base">
              <li className="flex items-start space-x-4">
                <div className="mt-1 text-secondary"><MapPinIcon /></div>
                <span>7321 San Antonio Dr NE<br/>Albuquerque, NM 87109</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="text-secondary"><PhoneIcon /></div>
                <span>(505) 990-2014</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="text-secondary"><MailIcon /></div>
                <span>info@simplydlegos.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="mb-8 text-sm font-bold uppercase tracking-[0.2em] text-white">Store Hours</h3>
            <ul className="space-y-3 text-base">
              <li className="flex justify-between border-b border-white/5 pb-2"><span>Mon - Fri</span> <span className="text-white">9:00 - 7:00</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span>Saturday</span> <span className="text-white">9:00 - 6:00</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span>Sunday</span> <span className="text-white">10:00 - 5:00</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Simply Diego's. Locally owned & operated.</p>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
