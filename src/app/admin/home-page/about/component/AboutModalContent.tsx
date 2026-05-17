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
        <label className="block text-sm font-semibold text-gray-700">Choose New Image File</label>
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors bg-gray-50/50">
          {imagePreview ? (
            <div className="mb-4 relative">
              <img src={imagePreview} alt="Preview" className="h-32 w-auto object-contain rounded" />
            </div>
          ) : (
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
          )}
          <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Select Image File
            <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
          </label>
        </div>
      </div>
    );
  }

  return null;
}
