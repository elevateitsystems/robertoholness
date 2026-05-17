"use client";

import React from "react";

interface ServiceModalContentProps {
  title: string;
  setTitle: (val: string) => void;
  slug: string;
  setSlug: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
  setImage: (file: File | null) => void;
}

export function ServiceModalContent({
  title,
  setTitle,
  slug,
  setSlug,
  description,
  setDescription,
  status,
  setStatus,
  setImage,
}: ServiceModalContentProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Slug</label>
        <input type="text" value={slug} onChange={e => setSlug(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
        <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white">
          <option value="active">Active</option>
          <option value="draft">Draft</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Image</label>
        <input type="file" onChange={e => setImage(e.target.files?.[0] || null)} className="mt-1 block w-full text-sm" />
      </div>
    </div>
  );
}
