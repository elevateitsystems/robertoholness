"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { galleryApi } from "@/lib/api/gallery";

const galleryCategories = ["All", "Birds", "Cats", "Dogs", "Kittens"];

const galleryImages = [
  {
    id: 1,
    category: "Dogs",
    src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800",
    alt: "Happy dog playing",
  },
  {
    id: 2,
    category: "Cats",
    src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800",
    alt: "Orange kitten",
  },
  {
    id: 3,
    category: "Dogs",
    src: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800",
    alt: "Dog with owner",
  },
  {
    id: 4,
    category: "Cats",
    src: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&q=80&w=800",
    alt: "Small kitten",
  },
  {
    id: 5,
    category: "Dogs",
    src: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800",
    alt: "Dog receiving treat",
  },
  {
    id: 6,
    category: "Birds",
    src: "https://images.unsplash.com/photo-1522858547137-f1dcec554f55?auto=format&fit=crop&q=80&w=800",
    alt: "Small bird on hand",
  },
  {
    id: 7,
    category: "Kittens",
    src: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=800",
    alt: "Fluffy kitten",
  },
  {
    id: 8,
    category: "Dogs",
    src: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800",
    alt: "Golden retriever",
  },
  {
    id: 9,
    category: "Kittens",
    src: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=800",
    alt: "Kitten looking up",
  },
];

export function GalleryContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [images, setImages] = useState(galleryImages);

  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await galleryApi.get();
        const dynamicImages = res?.data?.galleryImages;

        if (Array.isArray(dynamicImages) && dynamicImages.length > 0) {
          setImages(
            dynamicImages.map((image: any, index: number) => ({
              id: image.id || index,
              category: "Gallery",
              src: image.url,
              alt: image.title || `Gallery image ${index + 1}`,
            })),
          );
        }
      } catch {
        // Static gallery content is used when CMS content is unavailable.
      }
    }

    loadGallery();
  }, []);

  const categories = images === galleryImages ? galleryCategories : ["All", "Gallery"];

  const filteredImages = images.filter(
    (img) => activeCategory === "All" || img.category === activeCategory,
  );

  return (
    <div className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-secondary text-white shadow-lg shadow-accent-green/20 scale-105"
                  : "bg-secondary-10 border border-secondary/50 text-secondary/90 hover:text-primary hover:bg-primary/5"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Image Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-square rounded-[3px] overflow-hidden group shadow-md"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-white text-xs font-bold uppercase tracking-widest">
                    {img.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
