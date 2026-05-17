"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Edit3, Loader2, Play, ShoppingCart, Calendar, Upload } from "lucide-react";
import { heroApi } from "@/lib/api/hero";
import { useAppStore } from "@/lib/store";
import { Skeleton } from "@/components/admin/Skeleton";

export default function AdminHeroBannerPage() {

  const user = useAppStore((state: any) => state.user);
  
  // Database States
  const [heroData, setHeroData] = useState<any>({
    title: "Find Out Your Companion On Pet Adorin.",
    description: "Premium natural pet food, DIY dog wash stations, and expert nutritional counseling. We're more than a store – we're a community for pet lovers.",
    imageUrl: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeModal, setActiveModal] = useState<"content" | "image" | null>(null);
  
  // Form States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      setLoading(true);
      const res = await heroApi.get();
      if (res.data) {
        setHeroData({
          ...res.data,
          imageUrl: res.data.image?.url || "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800"
        });
      }
    } catch (e) {
      console.error("Failed to load Hero data:", e);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (type: "content" | "image") => {
    if (!user) return alert("Please login first to edit home page");
    
    if (type === "content") {
      setTitle(heroData.title);
      setDescription(heroData.description || "");
    } else if (type === "image") {
      setImageFile(null);
      setImagePreview(heroData.imageUrl);
    }
    setActiveModal(type);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Unauthorized");
    
    setSaving(true);
    const formData = new FormData();
    
    if (activeModal === "content") {
      formData.append("title", title);
      formData.append("description", description);
    } else if (activeModal === "image") {
      formData.append("title", heroData.title);
      formData.append("description", heroData.description || "");
      if (imageFile) {
        formData.append("image", imageFile);
      }
    }

    try {
      const res = await heroApi.upsert(formData);
      if (res.data) {
        setHeroData({
          ...res.data,
          imageUrl: res.data.image?.url || "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800"
        });
      }
      setActiveModal(null);
    } catch (e) {
      console.error(e);
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Skeleton type="preview" />;
  }

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Manage Homepage Banner" 
        description="Click the edit icons on the preview below to update the title, description text, and background images."
      />

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

      {/* EDIT MODAL */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100">
            
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">
                {activeModal === "content" ? "Update Hero Title & Text" : "Replace Hero Banner Image"}
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              
              {activeModal === "content" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Hero Title</label>
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
                      value={description} 
                      onChange={e => setDescription(e.target.value)} 
                      rows={4} 
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all" 
                    />
                  </div>
                </div>
              )}

              {activeModal === "image" && (
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
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button type="button" onClick={() => setActiveModal(null)} variant="outline">Cancel</Button>
                <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
