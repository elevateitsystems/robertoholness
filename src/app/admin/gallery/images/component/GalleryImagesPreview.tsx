"use client";

import React from "react";
import { Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryImagesPreviewProps {
  images: any[];
  handleDelete: (id: string) => void;
}

export function GalleryImagesPreview({ images, handleDelete }: GalleryImagesPreviewProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-gray-400">
          <ImageIcon className="h-12 w-12 mb-2 text-gray-300" />
          <p>No gallery images uploaded. Click 'Add Gallery Image' to start.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {images.map((img) => (
            <div key={img.id} className="group relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50 shadow-sm hover:shadow-md transition-all">
              <img 
                src={img.url} 
                alt="Gallery Item" 
                className="w-full h-full object-cover transition-transform group-hover:scale-105" 
              />
              
              {/* Overlay details */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center">
                {img.link && (
                  <span className="text-[10px] text-white/95 font-bold mb-2 truncate max-w-full">
                    Link: {img.link}
                  </span>
                )}
                <Button 
                  onClick={() => handleDelete(img.id)} 
                  variant="destructive" 
                  size="sm" 
                  className="rounded px-2.5 py-1 text-xs flex items-center gap-1.5"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
