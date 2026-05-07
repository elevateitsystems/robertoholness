'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const MenuIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

const ShoppingCartIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
);

const navItems = [
  { name: 'Services', href: '/services' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'Sales', href: '/sales' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const { scrollY } = useScroll();
  
  const navBackground = useTransform(scrollY, [0, 50], ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)']);
  const navPadding = useTransform(scrollY, [0, 50], ['2rem', '1rem']);
  const navWidth = useTransform(scrollY, [0, 50], ['100%', '90%']);
  const navRadius = useTransform(scrollY, [0, 50], ['0px', '2rem']);
  const navShadow = useTransform(scrollY, [0, 50], ['none', '0 10px 30px -10px rgba(0,0,0,0.1)']);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.nav 
        style={{ 
          backgroundColor: navBackground,
          paddingTop: navPadding,
          paddingBottom: navPadding,
          width: navWidth,
          borderRadius: navRadius,
          boxShadow: navShadow,
          marginTop: useTransform(scrollY, [0, 50], ['0rem', '1rem'])
        }}
        className="backdrop-blur-md border-b border-transparent transition-colors pointer-events-auto"
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 shrink-0">
              <Image 
                src="/assets/logo-without-bg.png" 
                alt="Simply Diego's Logo" 
                width={160} 
                height={50} 
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center bg-slate-100/50 p-1 rounded-xl">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'text-sm font-bold px-4 py-2 rounded-lg transition-all relative',
                      pathname === item.href ? 'text-white bg-secondary shadow-sm' : 'text-slate-600 hover:text-secondary'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              <Button asChild size="lg" className="rounded-xl font-bold bg-primary text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-2">
                <Link href="https://shop.simplydlegos.com/products/list/" target="_blank" className="flex items-center">
                  <ShoppingCartIcon className="h-4 w-4" />
                  <span>Shop Online</span>
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-slate-900 bg-slate-100 rounded-xl"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="lg:hidden bg-white/95 backdrop-blur-xl mt-4 mx-4 rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
            >
              <div className="p-6 space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'block text-lg font-bold p-3 rounded-xl transition-all',
                      pathname === item.href ? 'bg-secondary text-white' : 'text-slate-600 bg-slate-50'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4">
                  <Button asChild className="w-full rounded-xl font-bold h-14 bg-primary shadow-xl flex items-center justify-center space-x-2">
                    <Link href="https://shop.simplydlegos.com/products/list/" target="_blank" className="flex items-center">
                      <ShoppingCartIcon className="h-5 w-5" />
                      <span>Shop Online</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
