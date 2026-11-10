"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

interface PolicySection {
  title: string;
  content: string | string[];
}

interface PolicyContentProps {
  sections: PolicySection[];
}

export function PolicyContent({ sections }: PolicyContentProps) {
  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-black/5 p-8 md:p-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-10 last:mb-0"
            >
              <h2 className="text-2xl font-black text-secondary mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                </span>
                {section.title}
              </h2>
              <div className="space-y-4">
                {Array.isArray(section.content) ? (
                  section.content.map((para, i) => (
                    <p key={i} className="text-secondary/70 leading-relaxed font-sans">
                      {para.startsWith("Website: ") ? (
                        <>
                          Website:{" "}
                          <a
                            href="https://www.simplydiegos.com"
                            className="hover:underline"
                          >
                            www.simplydiegos.com
                          </a>
                        </>
                      ) : (
                        para
                      )}
                    </p>
                  ))
                ) : (
                  <p className="text-secondary/70 leading-relaxed font-sans">
                    {section.content}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
