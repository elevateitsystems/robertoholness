"use client";

import React from "react";
import { Edit3, ShoppingCart, Calendar, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BannerPreviewProps {
  heroData: {
    title: string;
    description: string;
    imageUrl: string;
  };
  openEditModal: (type: "content" | "image") => void;
}

export function BannerPreview({ heroData, openEditModal }: BannerPreviewProps) {
  return (
    <div className="bg-gray-100 p-8 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Live Preview (Hover to Edit)</span>
        <span className="text-xs text-gray-400">Homepage Hero Component</span>
      </div>

      {/* REPLICA HERO CONTAINER */}
      <div className="relative min-h-[500px] w-full bg-gradient-to-br from-primary via-primary-dark to-[#800040] rounded-xl overflow-hidden shadow-lg p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        
        {/* Background overlay details */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-40 pointer-events-none" />

        {/* Left Text Column */}
        <div className="flex-1 text-center lg:text-left space-y-6 relative z-10">
          <div 
            onClick={() => openEditModal("content")}
            className="group/text cursor-pointer border border-transparent hover:border-white/40 hover:bg-white/5 rounded-lg p-4 transition-all duration-200 relative inline-block text-left w-full"
            title="Click to edit title and description text"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
              {heroData.title}
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
              {heroData.description}
            </p>

            {/* Floating Edit Icon */}
            <span className="absolute -top-2 -left-2 bg-blue-600 text-white rounded-full p-1.5 opacity-0 group-hover/text:opacity-100 transition-opacity shadow-md">
              <Edit3 className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Static Action Buttons Mockup */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <Button disabled className="h-11 px-6 rounded bg-secondary hover:bg-secondary/90 text-white font-bold flex items-center gap-2 cursor-default opacity-90">
              <ShoppingCart className="h-4 w-4" />
              Shop Online Now
            </Button>
            <Button disabled className="h-11 px-6 rounded border border-white/20 text-white bg-white/5 hover:bg-white/10 font-bold flex items-center gap-2 cursor-default opacity-90">
              <Calendar className="h-4 w-4" />
              Book DIY Wash
            </Button>
          </div>
        </div>

        {/* Right Image Column */}
        <div className="flex-1 w-full max-w-sm lg:max-w-md relative z-10">
          <div 
            onClick={() => openEditModal("image")}
            className="group/img cursor-pointer border-2 border-transparent hover:border-blue-400 hover:bg-blue-50/15 rounded-xl p-3 transition-all duration-200 relative"
            title="Click to replace hero banner image"
          >
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-2xl border-4 border-white/10 bg-gray-900/50">
              <img 
                src={heroData.imageUrl || "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800"} 
                alt="Hero Image" 
                className="w-full h-full object-cover"
              />
              
              {/* Visual badge mockups overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur px-4 py-3 rounded shadow flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Watch Our Story</p>
                  <p className="text-[10px] text-gray-500">Learn about Simply Diego's</p>
                </div>
              </div>
            </div>

            {/* Floating Edit Icon */}
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full p-1.5 opacity-0 group-hover/img:opacity-100 transition-opacity shadow-md z-20">
              <Edit3 className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
