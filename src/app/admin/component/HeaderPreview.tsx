"use client";

import React from "react";
import { Phone, Edit3, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface HeaderPreviewProps {
  navBarData: {
    contactNumber: string;
    timeLine: string;
    deliveryOffer: string;
    navLogoUrl: string;
  };
  openEditModal: (type: "logo" | "info" | "promo") => void;
}

export function HeaderPreview({ navBarData, openEditModal }: HeaderPreviewProps) {
  return (
    <div className="bg-gray-100 p-8 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Live Preview (Hover to Edit)
        </span>
        <span className="text-xs text-gray-400">
          Website Header Component
        </span>
      </div>

      {/* REPLICA HEADER CONTAINER */}
      <div className="w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        {/* Top Info Bar (editable) */}
        <div className="bg-primary text-white text-[11px] sm:text-xs font-medium">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 relative">
            {/* Info section (editable) */}
            <div
              onClick={() => openEditModal("info")}
              className="group/item flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 cursor-pointer border border-transparent hover:border-white/50 hover:bg-white/10 rounded px-3 py-1 transition-all duration-200 relative"
              title="Click to edit Phone and Hours"
            >
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" />
                {navBarData.contactNumber}
              </span>
              <span>{navBarData.timeLine}</span>

              {/* Floating Edit Icon */}
              <span className="absolute -top-2 -left-2 bg-blue-600 text-white rounded-full p-1 opacity-0 group-hover/item:opacity-100 transition-opacity shadow-md">
                <Edit3 className="h-3 w-3" />
              </span>
            </div>

            {/* Offer section (editable) */}
            <div
              onClick={() => openEditModal("promo")}
              className="group/promo flex items-center cursor-pointer border border-transparent hover:border-white/50 hover:bg-white/10 rounded px-3 py-1 transition-all duration-200 relative text-accent-green font-bold"
              title="Click to edit delivery promotion"
            >
              <span>
                🐾{" "}
                {navBarData.deliveryOffer
                  ? navBarData.deliveryOffer.replace(/^[🐾\s]+/, "")
                  : ""}
              </span>

              {/* Floating Edit Icon */}
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-1 opacity-0 group-hover/promo:opacity-100 transition-opacity shadow-md">
                <Edit3 className="h-3 w-3" />
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Nav Bar */}
        <div className="bg-white px-4 sm:px-6 py-4 flex items-center justify-between border-b border-gray-100">
          {/* Logo area (editable) */}
          <div
            onClick={() => openEditModal("logo")}
            className="group/logo cursor-pointer border border-transparent hover:border-blue-300 hover:bg-blue-50/50 rounded-lg p-2 transition-all duration-200 relative flex items-center"
            title="Click to change logo image"
          >
            <Image
              src={navBarData.navLogoUrl}
              alt="Brand Logo"
              width={100}
              height={100}
              className="h-12 w-auto object-contain"
            />

            {/* Floating Edit Icon */}
            <span className="absolute -top-1 -left-1 bg-blue-600 text-white rounded-full p-1 opacity-0 group-hover/logo:opacity-100 transition-opacity shadow-md">
              <Edit3 className="h-3 w-3" />
            </span>
          </div>

          {/* Static Navigation Links (Show design only) */}
          <div className="hidden md:flex items-center space-x-6">
            {["Services", "Gallery", "Blog", "Reviews", "Contact"].map(
              (item) => (
                <span
                  key={item}
                  className="text-gray-600 font-semibold text-sm hover:text-primary transition-colors cursor-default"
                >
                  {item}
                </span>
              ),
            )}
          </div>

          {/* Static CTA Button (Show design only) */}
          <div className="flex items-center gap-2">
            <Button
              disabled
              className="bg-primary hover:bg-primary/95 text-white flex items-center gap-2 font-bold px-4 py-2 text-sm rounded cursor-default opacity-85"
            >
              <ShoppingCart className="h-4 w-4" />
              Shop Online
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
