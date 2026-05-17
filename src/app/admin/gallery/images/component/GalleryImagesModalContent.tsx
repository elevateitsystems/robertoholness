"use client";

import React from "react";
import { Upload } from "lucide-react";

interface GalleryImagesModalContentProps {
  imagePreview: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  link: string;
  setLink: (val: string) => void;
}

export function GalleryImagesModalContent({
  imagePreview,
  handleImageChange,
  link,
  setLink,
}: GalleryImagesModalContentProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Image File</label>
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50/50 hover:border-blue-500 transition-colors">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="h-32 w-auto object-contain mb-3 rounded" />
          ) : (
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
          )}
          <label className="cursor-pointer bg-white px-4 py-1.5 border border-gray-300 rounded-md shadow-sm text-xs font-semibold hover:bg-gray-50 flex items-center gap-2">
            Select File
            <input type="file" onChange={handleImageChange} required className="hidden" accept="image/*" />
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Optional Link URL / Description</label>
        <input 
          type="text" 
          value={link} 
          placeholder="e.g. https://instagram.com/p/..."
          onChange={e => setLink(e.target.value)} 
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
        />
      </div>
    </div>
  );
}
