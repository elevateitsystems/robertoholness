"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Truck } from "lucide-react";
import { motion } from "framer-motion";

const SHOP_URL = "https://shop.simplydiegos.com/products/shop/";

const deliveryDetails = [
  "Deliveries are available Monday through Saturday.",
  "Orders placed by 10:30 AM qualify for same-day delivery.",
  "Westside Albuquerque, Rio Rancho, Corrales, and Bernalillo deliveries run every Tuesday and Friday.",
];

export function DeliveryInfoSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="absolute inset-x-0 top-0 h-1 bg-secondary" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="space-y-7"
          >
            <div className="inline-flex items-center gap-3 rounded-[5px] border border-secondary/20 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.22em] shadow-lg shadow-secondary/10">
              <Truck className="h-5 w-5" />
              <span className="text-primary">Local</span>
              <span className="text-secondary">Delivery</span>
            </div>

            <div className="space-y-4">
              <h2 className="max-w-3xl text-3xl font-black leading-tight text-foreground sm:text-4xl md:text-5xl">
                Get your pet&apos;s food delivered right to your door!
              </h2>
              <p className="text-lg font-semibold text-muted-foreground md:text-xl">
                Place your order today and let Simply Diego&apos;s handle the rest.
              </p>
            </div>

            <ul className="space-y-4 text-base text-foreground md:text-lg">
              {deliveryDetails.map((detail) => (
                <li key={detail} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-secondary" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              size="lg"
              className="h-14 rounded-[5px] bg-secondary px-8 text-base font-black uppercase tracking-wide text-white shadow-xl shadow-secondary/25 hover:bg-deep-teal hover:shadow-secondary/35 focus-visible:ring-secondary md:h-16 md:px-10 md:text-lg"
            >
              <Link href={SHOP_URL} target="_blank" rel="noopener noreferrer">
                ORDER NOW
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative min-h-[280px] overflow-hidden rounded-[5px] border border-secondary/20 bg-gradient-to-br from-secondary/10 via-white to-primary/10 shadow-2xl shadow-secondary/10 md:min-h-[420px]"
            aria-label="Simply Diego's delivery service image"
          >
            <Image
              src="/assets/hero-dog.png"
              alt="Happy dog waiting for local pet food delivery"
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-secondary/15" />
            <div className="absolute bottom-5 left-5 right-5 rounded-[5px] bg-white/90 p-4 shadow-xl backdrop-blur-sm">
              <p className="text-sm font-black uppercase tracking-wide text-secondary">
                Same-day delivery available
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
