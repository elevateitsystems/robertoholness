"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { footerApi } from "@/lib/api/footer";

const GOOGLE_BUSINESS_URL =
  "https://www.google.com/maps/search/?api=1&query=Simply%20Diego%27s%203301%20Menaul%20Blvd%20NE%20Suite%2010%20Albuquerque%20NM%2087107";

const HOME_FOOTER_DESCRIPTION =
  "Albuquerque's premier natural pet food market. We focus on providing the best nutrition and care for your furry family members since 2016.";

const HOME_FOOTER_LOCATION =
  "3301 Menaul Blvd NE, Suite 10, Albuquerque, NM 87107";

const homeQuickLinks = [
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PawIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-white/60"
  >
    <ellipse cx="12" cy="17" rx="4" ry="5" opacity="0.9" />
    <ellipse cx="6" cy="11" rx="2.5" ry="3" opacity="0.9" />
    <ellipse cx="18" cy="11" rx="2.5" ry="3" opacity="0.9" />
    <ellipse cx="8.5" cy="6" rx="2" ry="2.5" opacity="0.9" />
    <ellipse cx="15.5" cy="6" rx="2" ry="2.5" opacity="0.9" />
  </svg>
);

export function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [footerData, setFooterData] = useState<any>({
    description:
      "Albuquerque's premier natural pet food market. We focus on providing the best nutrition and care for your furry family members since 2008.",
    location: "3301 Menaul Blvd NE, Suite 10, Albuquerque, NM 87107",
    phoneNumber: "505-990-0099",
    email: "info@simplydlegos.com",
  });

  useEffect(() => {
    async function loadFooter() {
      try {
        const res = await footerApi.get();
        if (res?.data) {
          // If array, grab the first element
          const record = Array.isArray(res.data) ? res.data[0] : res.data;
          if (record) {
            setFooterData({
              ...record,
              phoneNumber: "505-990-0099",
            });
          }
        }
      } catch {
        // Static footer content is used when database content is unavailable.
      }
    }
    loadFooter();
  }, []);

  const displayFooterData = isHomePage
    ? {
        ...footerData,
        description: HOME_FOOTER_DESCRIPTION,
        location: HOME_FOOTER_LOCATION,
        phoneNumber: "505-990-0099",
      }
    : footerData;

  const quickLinks = isHomePage
    ? homeQuickLinks
    : [
        { label: "Our Services", href: "/services" },
        { label: "Customer Reviews", href: "/reviews" },
        { label: "Pet Gallery", href: "/gallery" },
        { label: "Pet Care Blog", href: "/blog" },
        {
          label: "Shop Online Store",
          href: "https://shop.simplydiegos.com/products/shop/",
          external: true,
        },
      ];

  return (
    <footer className="bg-gradient-to-b from-primary to-[#600030] text-white/80 relative overflow-hidden">
      {/* Paw pattern overlay */}
      <div className="absolute inset-0 paw-pattern-light opacity-50" />

      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-green/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 py-16 md:px-6 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Social */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/assets/logo-without-bg.png"
                alt="Simply Diego's Logo"
                width={isHomePage ? 300 : 180}
                height={isHomePage ? 120 : 60}
                className={
                  isHomePage
                    ? "h-36 w-auto object-contain"
                    : "h-24 w-auto object-contain"
                }
                style={{ width: "auto" }}
              />
            </Link>
            <p className="text-base leading-relaxed text-white/50">
              {displayFooterData.description}
            </p>
            <div className="flex space-x-3">
              <Link
                href={
                  process.env.NEXT_PUBLIC_FACEBOOK_URL ||
                  "https://www.facebook.com/SimplyDiegos"
                }
                className="w-11 h-11 rounded-[5px] bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white hover:scale-110 transition-all duration-300 border border-white/5"
              >
                <FacebookIcon />
              </Link>
              <Link
                href={
                  process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
                  "https://www.instagram.com/simplydiegos"
                }
                className="w-11 h-11 rounded-[5px] bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white hover:scale-110 transition-all duration-300 border border-white/5"
              >
                <InstagramIcon />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-8 text-sm font-bold uppercase tracking-[0.2em] text-white flex items-center gap-2">
              <PawIcon />
              Quick Links
            </h3>
            <ul className="space-y-4 text-base">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    target={
                      "external" in item && item.external ? "_blank" : undefined
                    }
                    rel={
                      "external" in item && item.external
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="hover:text-accent-green transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-accent-green group-hover:scale-125 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Info */}
          <div>
            <h3 className="mb-8 text-sm font-bold uppercase tracking-[0.2em] text-white flex items-center gap-2">
              <PawIcon />
              Visit Us
            </h3>
            <ul className="space-y-6 text-base">
              <li className="flex items-start space-x-4">
                <div className="mt-1 w-10 h-10 rounded-[5px] bg-white/10 text-white flex items-center justify-center shrink-0">
                  <MapPinIcon />
                </div>
                <span>{displayFooterData.location}</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-[5px] bg-white/10 text-white flex items-center justify-center shrink-0">
                  <PhoneIcon />
                </div>
                <span>{displayFooterData.phoneNumber}</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-[5px] bg-white/10 text-white flex items-center justify-center shrink-0">
                  <MailIcon />
                </div>
                <span>{displayFooterData.email}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <Link
              href={GOOGLE_BUSINESS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-8 text-sm font-bold uppercase tracking-[0.2em] text-white flex items-center gap-2 hover:text-accent-green transition-colors"
              aria-label="View Simply Diego's store hours on Google Business"
            >
              <PawIcon />
              Store Hours
            </Link>
            <ul className="space-y-3 text-base">
              <li className="flex justify-between border-b border-white/10 pb-3">
                <span>Mon - Fri</span>{" "}
                <span className="text-warm-orange font-bold">
                  9:00 AM - 7:00 PM
                </span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-3">
                <span>Saturday</span>{" "}
                <span className="text-warm-orange font-bold">
                  9:00 AM - 6:00 PM
                </span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-3">
                <span>Sunday</span>{" "}
                <span className="text-warm-orange font-bold">
                  10:00 AM - 6:00 PM
                </span>
              </li>
            </ul>
            {/* Fun CTA */}
            <div className="mt-6 p-4 rounded-[5px] bg-white/15 border border-white/30">
              <p className="text-lg font-black text-white">
                Bring your furry friend in for a visit!
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40">
          <p>
            © {new Date().getFullYear()} Simply Diego's. Locally owned &
            operated.
          </p>
          <div className="flex gap-8">
            <Link
              href="/privacy-policy"
              className="hover:text-warm-orange transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-warm-orange transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
