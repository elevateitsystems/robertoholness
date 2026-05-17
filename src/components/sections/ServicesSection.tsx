"use client";

import { motion } from "framer-motion";
import { servicesData, iconMap } from "@/lib/services-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowRightIcon } from "lucide-react";

export function ServicesSection() {
  const services = Object.values(servicesData).slice(0, 4);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-black text-secondary mb-6">
            Our{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary">Services</span>
            </span>
          </h2>
          <p className="text-base md:text-lg text-secondary/70 max-w-2xl mx-auto leading-relaxed">
            At Simply Diego&apos;s, we go beyond just selling food. We provide a
            full suite of services to support your pet&apos;s health, hygiene,
            and happiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon || ""] || iconMap.store;
            const theme = service.metadata?.theme;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                className="bg-white rounded-[10px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col group relative"
              >
                <div
                  className={`w-12 h-12 rounded-full ${theme?.iconBg || "bg-primary"} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-4">
                  {service.name}
                </h3>
                <p className="text-secondary/60 mb-8 text-sm leading-relaxed flex-grow">
                  {service.shortDescription}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-[#ed107c] font-bold text-sm inline-flex items-center group-hover:underline"
                >
                  Read more <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-[5px] px-10 font-bold border-2 border-secondary/20 text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
          >
            <Link href="/services" className="flex items-center gap-2">
              <span>View All Services</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {/* <div className="text-center">
          <Link href="/services">
            <Button className="bg-[#ed107c] hover:bg-[#ed107c]/90 text-white rounded-md px-8 py-6 font-bold shadow-lg shadow-[#ed107c]/20 transition-transform hover:scale-105">
              View All Services <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div> */}
      </div>
    </section>
  );
}
