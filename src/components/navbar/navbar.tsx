"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { navBarApi } from "@/lib/api/navBar";
import Image from "next/image";

const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const ShoppingCartIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const navItems = [
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Reviews", href: "/reviews" },
  { name: "Contact", href: "/contact" },
];

const GOOGLE_BUSINESS_URL =
  "https://www.google.com/maps/search/?api=1&query=Simply%20Diego%27s%203301%20Menaul%20Blvd%20NE%20Suite%2010%20Albuquerque%20NM%2087107";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  
  const [navBarData, setNavBarData] = React.useState({
    contactNumber: "505-990-0099",
    timeLine: "Mon-Fri: 9am-7pm | Sat: 9am-6pm | Sun: 10am-6pm",
    deliveryOffer: "Free Delivery on Orders Over $49",
    navLogoUrl: "/assets/logo-without-bg.png"
  });

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    const fetchNavBar = async () => {
      try {
        const res = await navBarApi.get();
        if (res && res.data) {
          setNavBarData({
            contactNumber: "505-990-0099",
            timeLine: "Mon-Fri: 9am-7pm | Sat: 9am-6pm | Sun: 10am-6pm",
            deliveryOffer: "Free Delivery on Orders Over $49",
            navLogoUrl: res.data.navLogoUrl || "/assets/logo-without-bg.png"
          });
        }
      } catch {
        // Static navbar content is used when database content is unavailable.
      }
    };
    fetchNavBar();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled || pathname !== "/"
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-primary/5 border-b border-primary/10"
          : "bg-transparent border-b border-transparent",
      )}
    >
      {/* Top info bar */}
      <div className="hidden lg:block bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex min-h-9 items-center justify-between gap-4 py-1 text-sm font-bold">
            <div className="flex items-center gap-7">
              <a href="tel:+15059900099" className="flex items-center gap-2 text-base hover:text-accent-green transition-colors">
                <PhoneIcon className="h-4 w-4" />
                {navBarData.contactNumber}
              </a>
              <Link
                href={GOOGLE_BUSINESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-accent-green transition-colors"
                aria-label="View Simply Diego's current business hours on Google"
              >
                {navBarData.timeLine}
              </Link>
            </div>
            <span className="rounded-[5px] px-4 py-1.5 text-sm font-black uppercase tracking-wide text-white">
              🐾 {navBarData.deliveryOffer}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex min-h-16 items-center justify-between py-1 lg:min-h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image
              src={navBarData.navLogoUrl}
              alt="Simply Diego's Logo"
              width={220}
              height={80}
              className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-16 lg:h-20"
              style={{ width: "auto" }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-3 text-sm font-semibold transition-all rounded-[5px]",
                  pathname === item.href
                    ? "text-primary"
                    : scrolled || pathname !== "/"
                      ? "text-secondary hover:text-primary hover:bg-primary/5"
                      : "text-white hover:text-secondary hover:bg-white/10",
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0  border-b border-primary/50"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              asChild
              size="lg"
              className="rounded-[5px] bg-secondary font-black text-white shadow-lg shadow-secondary/25 transition-all hover:scale-105 hover:bg-deep-teal hover:shadow-xl hover:shadow-secondary/35 active:scale-95 focus-visible:ring-secondary flex items-center gap-2"
            >
              <Link
                href="https://shop.simplydiegos.com/products/shop/"
                target="_blank"
                className="flex items-center gap-2"
              >
                <ShoppingCartIcon className="h-4 w-4" />
                <span>Shop Online</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "lg:hidden p-2.5 rounded-[5px] transition-all",
              isOpen
                ? "bg-primary text-white"
                : scrolled || pathname !== "/"
                  ? "text-secondary hover:bg-primary/10"
                  : "text-white hover:bg-white/10",
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-primary/10 bg-gradient-to-b from-[var(--warm-cream)] to-white overflow-hidden"
          >
            <div className="p-5 space-y-2">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block text-base font-bold p-3 rounded-[5px] transition-all",
                      pathname === item.href
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-secondary hover:bg-primary/5",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 border-t border-primary/10">
                <Button
                  asChild
                  className="w-full rounded-[5px] bg-secondary font-black text-white h-14 shadow-lg shadow-secondary/25 hover:bg-deep-teal focus-visible:ring-secondary flex items-center justify-center gap-2"
                >
                  <Link
                    href="https://shop.simplydiegos.com/products/shop/"
                    target="_blank"
                    className="flex items-center gap-2"
                  >
                    <ShoppingCartIcon className="h-4 w-4" />
                    <span>Shop Online</span>
                  </Link>
                </Button>
                <div className="mt-4 rounded-[5px] bg-white p-4 text-sm font-bold text-foreground shadow-sm">
                  <a href="tel:+15059900099" className="flex items-center gap-2 text-base text-secondary">
                    <PhoneIcon className="h-4 w-4" />
                    505-990-0099
                  </a>
                  <Link
                    href={GOOGLE_BUSINESS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-muted-foreground hover:text-secondary"
                  >
                    Mon-Fri: 9am-7pm | Sat: 9am-6pm | Sun: 10am-6pm
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
