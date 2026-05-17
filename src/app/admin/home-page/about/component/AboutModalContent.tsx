"use client";

import React from "react";
import { Upload } from "lucide-react";

interface AboutModalContentProps {
  activeModal: "content" | "testimonial" | "image" | null;
  title: string;
  setTitle: (val: string) => void;
  description1: string;
  setDescription1: (val: string) => void;
  description2: string;
  setDescription2: (val: string) => void;
  footerText: string;
  setFooterText: (val: string) => void;
  imagePreview: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AboutModalContent({
  activeModal,
  title,
  setTitle,
  description1,
  setDescription1,
  description2,
  setDescription2,
  footerText,
  setFooterText,
  imagePreview,
  handleImageChange,
}: AboutModalContentProps) {
  if (activeModal === "content") {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
          <textarea 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            rows={2}
            required 
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all" 
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Description Paragraph</label>
          <textarea 
            value={description1} 
            onChange={e => setDescription1(e.target.value)} 
            rows={4} 
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all" 
          />
        </div>
      </div>
    );
  }

  if (activeModal === "testimonial") {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Testimonial Quote</label>
          <textarea 
            value={description2} 
            onChange={e => setDescription2(e.target.value)} 
            rows={3} 
            required 
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all" 
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Testimonial Author</label>
          <input 
            type="text" 
            value={footerText} 
            onChange={e => setFooterText(e.target.value)} 
            required 
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all" 
          />
        </div>
      </div>
    );
  }

  if (activeModal === "image") {
    return (
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-700">
          About Welcome Banner Photo
        </label>
        <div
          onClick={() => document.getElementById("about-file-input")?.click()}
          className="group relative border-2 border-dashed border-gray-300 hover:border-primary bg-gray-50/50 hover:bg-primary/[0.02] transition-all rounded-xl p-6 text-center cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-3"
        >
          <input
            id="about-file-input"
            type="file"
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />
          
          {imagePreview ? (
            <div className="relative aspect-square w-32 rounded-lg overflow-hidden border border-gray-200 shadow-md">
              <img
                src={imagePreview}
                alt="About Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-semibold px-2 py-1 bg-black/60 rounded">Change Image</span>
              </div>
            </div>
          ) : (
            <>
              <div className="p-3 bg-white rounded-full shadow-sm text-gray-400 group-hover:text-primary transition-colors border border-gray-100">
                <Upload className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-700 group-hover:text-primary transition-colors">
                  Click to upload welcome photo
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  or drag and drop your file here
                </p>
              </div>
            </>
          )}

          {/* Guidelines */}
          <div className="mt-2 pt-3 border-t border-gray-200/60 w-full text-[11px] text-gray-400 text-left space-y-1">
            <p className="font-semibold text-gray-500 uppercase tracking-wider text-[9px] mb-1">
              💡 Image Guidelines:
            </p>
            <p>• <strong>Formats</strong>: PNG, JPG, JPEG, or WebP.</p>
            <p>• <strong>Max Size</strong>: Up to <strong>5MB</strong> file size.</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
