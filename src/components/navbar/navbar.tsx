"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

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
  { name: "Reviews", href: "/reviews" },
  { name: "Sales", href: "/sales" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
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
          <div className="flex items-center justify-between h-9 text-xs font-medium">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <PhoneIcon className="h-3 w-3" />
                (505) 990-2014
              </span>
              <span>Mon-Fri: 9am-7pm | Sat: 9am-6pm | Sun: 10am-5pm</span>
            </div>
            <span className="text-accent-green font-bold">
              🐾 Free delivery on orders over $50!
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image
              src="/assets/logo-without-bg.png"
              alt="Simply Diego's Logo"
              width={180}
              height={60}
              className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
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
                  "relative px-4 py-2 text-sm font-bold transition-all rounded-[5px]",
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
                    className="absolute inset-0 rounded-[5px] bg-primary/10 border border-primary/20"
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
              className="rounded-[5px] font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 bg-primary hover:bg-primary/90"
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
                  className="w-full rounded-[5px] font-bold h-14 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
