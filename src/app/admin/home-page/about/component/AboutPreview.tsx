"use client";

import React from "react";
import { Edit3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AboutPreviewProps {
  aboutData: {
    title: string;
    description1: string;
    description2: string;
    footerText: string;
    imageUrl: string;
  };
  openEditModal: (type: "content" | "testimonial" | "image") => void;
}

export function AboutPreview({ aboutData, openEditModal }: AboutPreviewProps) {
  return (
    <div className="bg-gray-100 p-8 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Live Preview (Hover to Edit)</span>
        <span className="text-xs text-gray-400">Welcome Section Component</span>
      </div>

      {/* REPLICA ABOUT CONTAINER */}
      <div className="w-full bg-white rounded-xl shadow-lg border border-gray-200 p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-12 sm:gap-16">
        
        {/* Left Image Column (editable) */}
        <div className="flex-1 w-full max-w-sm relative">
          <div 
            onClick={() => openEditModal("image")}
            className="group/img cursor-pointer border-2 border-transparent hover:border-blue-400 hover:bg-blue-50/10 rounded-2xl p-2 transition-all duration-200 relative flex items-center justify-center"
            title="Click to replace welcome section image"
          >
            {/* Blob style wrapper */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 overflow-hidden border-[6px] border-primary/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] shadow-xl">
              <img 
                src={aboutData.imageUrl || "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800"} 
                alt="Simply Diego's Welcome image" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Edit Icon */}
            <span className="absolute top-0 left-0 bg-blue-600 text-white rounded-full p-1.5 opacity-0 group-hover/img:opacity-100 transition-opacity shadow-md z-10">
              <Edit3 className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

        {/* Right Content Column */}
        <div className="flex-1 space-y-6 text-left">
          
          {/* Title & Welcome description (editable) */}
          <div 
            onClick={() => openEditModal("content")}
            className="group/text cursor-pointer border border-transparent hover:border-blue-300 hover:bg-blue-50/50 rounded-lg p-3.5 transition-all duration-200 relative w-full"
            title="Click to edit title and welcome text"
          >
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-secondary leading-snug mb-3">
              {aboutData.title.replace("Local Healthy Pet Store!", "")}
              <span className="text-primary">Local Healthy Pet Store!</span>
            </h2>
            <p className="text-sm text-secondary/70 leading-relaxed">
              {aboutData.description1}
            </p>

            {/* Floating Edit Icon */}
            <span className="absolute -top-2 -left-2 bg-blue-600 text-white rounded-full p-1.5 opacity-0 group-hover/text:opacity-100 transition-opacity shadow-md">
              <Edit3 className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Testimonial Quote (editable) */}
          <div 
            onClick={() => openEditModal("testimonial")}
            className="group/quote cursor-pointer border border-transparent hover:border-blue-300 hover:bg-blue-50/50 rounded-lg p-3.5 transition-all duration-200 relative w-full bg-primary/5 border-l-4 border-primary"
            title="Click to edit customer review / testimonial"
          >
            <p className="text-secondary/80 italic text-sm leading-relaxed mb-2">
              {aboutData.description2}
            </p>
            <span className="block font-bold text-xs text-secondary/95">
              {aboutData.footerText}
            </span>

            {/* Floating Edit Icon */}
            <span className="absolute -top-2 -left-2 bg-blue-600 text-white rounded-full p-1.5 opacity-0 group-hover/quote:opacity-100 transition-opacity shadow-md">
              <Edit3 className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Static Action Buttons Mockup */}
          <div className="pt-2">
            <Button disabled className="h-11 px-8 rounded bg-primary hover:bg-primary/95 text-white font-bold flex items-center gap-2 cursor-default opacity-85">
              <span>Shop Now</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

        </div>

      </div>
    </div>
  );
}
