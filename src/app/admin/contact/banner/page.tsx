"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Edit3, Loader2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Skeleton } from "@/components/admin/Skeleton";
import { Modal } from "@/components/admin/Modal";

export default function AdminContactBannerPage() {

  const user = useAppStore((state: any) => state.user);
  
  // LocalStorage Persisted States
  const [bannerData, setBannerData] = useState<any>({
    title: "Contact",
    highlightedWord: "Us",
    badge: "🐾 Simply Diego's",
    description: "Have questions about raw dog food options, organic puppy diets, DIY washing hours, or Albuquerque local pet delivery? Reach out to us below!"
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  
  // Form States
  const [title, setTitle] = useState("");
  const [highlightedWord, setHighlightedWord] = useState("");
  const [badge, setBadge] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("banner_contact");
    if (saved) {
      setBannerData(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const openEditModal = () => {
    if (!user) return alert("Please login first to edit banners");
    setTitle(bannerData.title);
    setHighlightedWord(bannerData.highlightedWord);
    setBadge(bannerData.badge);
    setDescription(bannerData.description || "");
    setActiveModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Unauthorized");
    
    setSaving(true);
    const updated = { title, highlightedWord, badge, description };
    localStorage.setItem("banner_contact", JSON.stringify(updated));
    setBannerData(updated);
    
    setTimeout(() => {
      setSaving(false);
      setActiveModal(false);
    }, 400);
  };

  if (loading) {
    return <Skeleton type="banner" />;
  }

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Manage Contact Banner" 
        description="Click the edit icons on the preview below to update the Contact Page hero headings, badges, and descriptions."
      />

      <div className="bg-gray-100 p-8 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Live Preview (Hover to Edit)</span>
          <span className="text-xs text-gray-400">PageHero Component (Contact Page)</span>
        </div>

        {/* REPLICA PAGE HERO */}
        <div className="w-full bg-gradient-to-br from-[#FFFDF9] via-[#FFF3EB] to-[#FFFDF9] py-16 px-6 rounded-xl border border-[#F2E5DC] text-center relative overflow-hidden shadow-md">
          
          {/* Paw decoration details */}
          <div className="absolute top-6 right-12 opacity-10 text-primary">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
              <ellipse cx="12" cy="17" rx="4" ry="5" />
              <ellipse cx="6" cy="11" rx="2.5" ry="3" />
              <ellipse cx="18" cy="11" rx="2.5" ry="3" />
            </svg>
          </div>

          <div 
            onClick={openEditModal}
            className="group/hero cursor-pointer border border-transparent hover:border-blue-300 hover:bg-blue-50/50 rounded-lg p-6 transition-all duration-200 relative max-w-3xl mx-auto z-10"
            title="Click to edit Page Hero"
          >
            {/* Breadcrumbs (Mocked) */}
            <div className="flex items-center justify-center gap-2 mb-4 text-xs text-secondary/50 font-medium">
              <span>Home</span>
              <span>&gt;</span>
              <span className="text-secondary font-semibold">Contact</span>
            </div>

            {bannerData.badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary/10 text-primary font-semibold text-[10px] tracking-wider uppercase mb-4 border border-primary/20">
                {bannerData.badge}
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-secondary mb-4 leading-tight">
              {bannerData.title} <span className="text-primary">{bannerData.highlightedWord}</span>
            </h1>

            {bannerData.description && (
              <p className="text-sm sm:text-base text-secondary/60 max-w-2xl mx-auto leading-relaxed">
                {bannerData.description}
              </p>
            )}

            {/* Floating Edit Icon */}
            <span className="absolute -top-2 -left-2 bg-blue-600 text-white rounded-full p-1.5 opacity-0 group-hover/hero:opacity-100 transition-opacity shadow-md">
              <Edit3 className="h-3.5 w-3.5" />
            </span>
          </div>

        </div>
      </div>

      {/* EDIT MODAL */}
      <Modal
        isOpen={activeModal}
        onClose={() => setActiveModal(false)}
        title="Update Contact Banner Hero"
        onSubmit={handleSubmit}
        isSaving={saving}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Badge Text</label>
            <input 
              type="text" 
              value={badge} 
              onChange={e => setBadge(e.target.value)} 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Title Main Heading</label>
            <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Highlighted Suffix Word</label>
            <input 
              type="text" 
              value={highlightedWord} 
              onChange={e => setHighlightedWord(e.target.value)} 
              required 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description Paragraph</label>
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              rows={3} 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
            />
          </div>
        </div>
      </Modal>

    </div>
  );
}
