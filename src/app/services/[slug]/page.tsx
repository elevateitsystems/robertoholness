"use client";

import Link from "next/link";
import { CheckCircle2, Info, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { servicesData, iconMap } from "@/lib/services-data";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";

const themeClasses: Record<string, any> = {
  primary: {
    bg: "bg-primary",
    bgLight: "bg-primary/10",
    text: "text-primary",
    badge: "bg-primary/15 text-primary",
    shadow: "shadow-primary/25",
    hover: "hover:bg-primary/90",
    border: "border-primary/20",
    from: "from-primary",
    gradientText: "gradient-text",
  },
  secondary: {
    bg: "bg-secondary",
    bgLight: "bg-secondary/10",
    text: "text-secondary",
    badge: "bg-secondary/15 text-secondary",
    shadow: "shadow-secondary/25",
    hover: "hover:bg-secondary/90",
    border: "border-secondary/20",
    from: "from-secondary",
    gradientText: "gradient-text",
  },
  "accent-green": {
    bg: "bg-accent-green",
    bgLight: "bg-accent-green/10",
    text: "text-accent-green",
    badge: "bg-accent-green/15 text-accent-green",
    shadow: "shadow-accent-green/25",
    hover: "hover:bg-accent-green/90",
    border: "border-accent-green/20",
    from: "from-accent-green",
    gradientText: "gradient-text-green",
  },
  "warm-orange": {
    bg: "bg-warm-orange",
    bgLight: "bg-warm-orange/10",
    text: "text-warm-orange",
    badge: "bg-warm-orange/15 text-warm-orange",
    shadow: "shadow-warm-orange/25",
    hover: "hover:bg-warm-orange/90",
    border: "border-warm-orange/20",
    from: "from-warm-orange",
    gradientText: "gradient-text",
  },
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  const themePrimary = service.metadata?.theme?.primary || "primary";
  const theme = themeClasses[themePrimary] || themeClasses.primary;

  const Icon = iconMap[service.icon || ""] || iconMap.store;
  const ActionIcon = iconMap[service.actionType || ""] || ChevronRight;

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--warm-cream)] via-[var(--warm-peach)] to-[var(--warm-cream)] py-24">
        <div className="absolute inset-0 paw-pattern opacity-40" />
        <div
          className={`absolute top-0 right-0 w-96 h-96 ${theme.bgLight} rounded-full blur-[100px]`}
        />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 space-y-8"
            >
              {service.metadata?.badge && (
                <div
                  className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full ${theme.badge} text-xs font-bold uppercase tracking-wider border ${theme.border}`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{service.metadata.badge}</span>
                </div>
              )}
              <h1 className="text-5xl md:text-6xl font-heading font-black text-secondary leading-tight">
                {service.name} <br />
                <span className={theme.gradientText}>
                  {service.metadata?.gradientTitle}
                </span>
              </h1>
              <p className="text-xl text-secondary/60 leading-relaxed max-w-2xl">
                {service.fullDescription}
              </p>
              <div className="flex flex-col sm:row gap-4">
                {/* <Button
                  asChild
                  size="lg"
                  className={`h-14 px-8 rounded-full text-lg font-bold shadow-lg ${theme.shadow} hover:scale-105 transition-all ${theme.bg} ${theme.hover} text-white`}
                >
                  <Link
                    href={service.actionUrl || "#"}
                    target={
                      service.actionUrl?.startsWith("http")
                        ? "_blank"
                        : undefined
                    }
                    className="flex items-center gap-2"
                  >
                    <ActionIcon className="h-5 w-5" />
                    <span>{service.actionLabel || "Learn More"}</span>
                  </Link>
                </Button> */}
                {/* {service.availabilityType && (
                  <div className="flex w-fit items-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-primary/15 text-secondary font-medium">
                    <Clock className="mr-2 h-5 w-5 text-primary" />
                    {service.availabilityType.replace("_", " ")}
                  </div>
                )} */}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 w-full max-w-xl"
            >
              <div className="relative">
                <div
                  className={`absolute -inset-3 bg-gradient-to-br ${service.metadata?.theme?.gradient || "from-primary/10 to-primary/5"} rounded-3xl rotate-2`}
                />
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-primary/15 border-4 border-white">
                  {service.imageUrl && (
                    <Image
                      src={service.imageUrl}
                      alt={service.name}
                      fill
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-${themePrimary}/20 via-transparent to-transparent`}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 60"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              fill="var(--background)"
              d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
            />
          </svg>
        </div>
      </section>

      {/* Features Grid Section */}
      {service.metadata?.features && (
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 paw-pattern opacity-20" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-heading font-black text-secondary mb-6">
                Expertise You Can Trust
              </h2>
              <p className="text-lg text-secondary/60">
                We pride ourselves on providing the highest quality care and
                convenience for both you and your furry companions.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.metadata.features.map((feature: any, i: number) => {
                const FeatureIcon = iconMap[feature.icon] || CheckCircle2;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-10 rounded-2xl bg-white/80 backdrop-blur-sm border border-primary/10 flex flex-col items-center text-center space-y-6 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${themePrimary} to-primary shadow-lg flex items-center justify-center text-white`}
                    >
                      <FeatureIcon className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-black text-secondary">
                      {feature.title}
                    </h3>
                    <p className="text-secondary/60">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* How It Works / Steps Section (Conditional) */}
      {service.metadata?.steps && (
        <section className="py-24 bg-gradient-to-br from-secondary to-deep-teal text-white overflow-hidden relative">
          <div className="absolute inset-0 paw-pattern-light" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl font-heading font-black">
                  How It Works
                </h2>
                <div className="space-y-8">
                  {service.metadata.steps.map((item: any, index: number) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="flex gap-6"
                    >
                      <div className="shrink-0 text-3xl font-heading font-black text-primary/80">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xl font-bold">{item.title}</h4>
                        <p className="text-white/50 text-sm leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />
                <div className="relative p-10 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-md">
                  <h3 className="text-2xl font-bold mb-6">
                    Ready to get started?
                  </h3>
                  <p className="text-white/70 mb-8">
                    Join hundreds of happy pet parents in Albuquerque who trust
                    us with their pet's needs.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="w-full h-14 rounded-full font-bold bg-primary text-white hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
                  >
                    <Link
                      href={service.actionUrl || "#"}
                      target={
                        service.actionUrl?.startsWith("http")
                          ? "_blank"
                          : undefined
                      }
                    >
                      {service.actionLabel || "Get Started"}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pricing / Included Items Section */}
      {(service.metadata?.pricing || service.metadata?.includedItems) && (
        <section className="py-24 relative overflow-hidden bg-[var(--warm-peach)]/10">
          <div className="absolute inset-0 paw-pattern opacity-10" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Included Items */}
              {service.metadata?.includedItems && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <h2 className="text-3xl font-heading font-black text-secondary">
                    {service.metadata.includedListTitle || "What's Included?"}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {service.metadata.includedItems.map((item: string) => (
                      <div
                        key={item}
                        className="flex items-start space-x-3 text-secondary/80"
                      >
                        <CheckCircle2 className="h-6 w-6 text-accent-green shrink-0" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                  {service.metadata?.proTip && (
                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/15 flex items-start space-x-4">
                      <Info className="h-6 w-6 text-primary shrink-0 mt-1" />
                      <p className="text-sm text-secondary/60">
                        <strong className="text-secondary">Pro Tip:</strong>{" "}
                        {service.metadata.proTip}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Pricing Card */}
              {service.metadata?.pricing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-secondary/15 rounded-3xl blur-sm" />
                  <div className="relative bg-gradient-to-br from-secondary to-deep-teal rounded-3xl p-10 text-white shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 paw-pattern-light" />
                    <h2 className="text-3xl font-heading font-black mb-8 relative z-10">
                      Pricing
                    </h2>
                    <div className="space-y-6 relative z-10">
                      {service.metadata.pricing.map((tier: any) => (
                        <div
                          key={tier.label}
                          className="flex justify-between items-center py-4 border-b border-white/10 last:border-0"
                        >
                          <span className="text-lg font-bold">
                            {tier.label}
                          </span>
                          <span className="text-3xl font-heading font-black text-warm-orange">
                            {tier.price}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-10 p-6 rounded-2xl bg-white/10 border border-white/10 text-center relative z-10">
                      <p className="text-sm text-white/60">
                        * All prices are subject to change. Contact store for
                        latest rates.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary-dark to-[#800040] text-white relative overflow-hidden">
        <div className="absolute inset-0 paw-pattern-light" />
        <div className="container mx-auto px-4 md:px-6 text-center space-y-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-heading font-black"
          >
            Still Have Questions?
          </motion.h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Our team of pet enthusiasts is here to help you choose the best
            services for your furry friend.
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-lg bg-white text-primary border-none hover:bg-white/90 font-bold h-14 px-10 text-lg shadow-xl shadow-black/10 hover:scale-105 transition-all"
          >
            <Link href="/contact">Contact Our Team</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
