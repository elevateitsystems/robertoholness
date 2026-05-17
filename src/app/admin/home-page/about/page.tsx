"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Edit3, Loader2, ArrowRight, Upload } from "lucide-react";
import { aboutApi } from "@/lib/api/about";
import { useAppStore } from "@/lib/store";
import { Skeleton } from "@/components/admin/Skeleton";

export default function AdminAboutSectionPage() {

  const user = useAppStore((state: any) => state.user);
  
  // Database States
  const [aboutData, setAboutData] = useState<any>({
    title: "Welcome to Simply Diego's Local Healthy Pet Store!",
    description1: "We are your premier Pet Food Store in the Albuquerque/New Mexico area. We offer a wide selection of natural pet food, supplies, toys and treats for your four-legged friend. Be sure to stop by if you're looking for a DIY dog wash! We look forward to seeing you soon.",
    description2: "\"Simply Diego’s has a great selection of pet products and a clean, well-organized store. Their staff is friendly and helpful, and the prices are reasonable. They also have a rewards program.\"",
    footerText: "— Pet News Daily (Top Pet Store in Albuquerque)",
    imageUrl: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeModal, setActiveModal] = useState<"content" | "testimonial" | "image" | null>(null);
  
  // Form States
  const [title, setTitle] = useState("");
  const [description1, setDescription1] = useState("");
  const [description2, setDescription2] = useState("");
  const [footerText, setFooterText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      setLoading(true);
      const res = await aboutApi.get();
      if (res.data) {
        setAboutData({
          ...res.data,
          imageUrl: res.data.image?.url || "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800"
        });
      }
    } catch (e) {
      console.error("Failed to load About Us data:", e);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (type: "content" | "testimonial" | "image") => {
    if (!user) return alert("Please login first to edit about page");
    
    if (type === "content") {
      setTitle(aboutData.title);
      setDescription1(aboutData.description1 || "");
    } else if (type === "testimonial") {
      setDescription2(aboutData.description2 || "");
      setFooterText(aboutData.footerText || "");
    } else if (type === "image") {
      setImageFile(null);
      setImagePreview(aboutData.imageUrl);
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
      formData.append("description1", description1);
      formData.append("description2", aboutData.description2 || "");
      formData.append("footerText", aboutData.footerText || "");
    } else if (activeModal === "testimonial") {
      formData.append("title", aboutData.title);
      formData.append("description1", aboutData.description1 || "");
      formData.append("description2", description2);
      formData.append("footerText", footerText);
    } else if (activeModal === "image") {
      formData.append("title", aboutData.title);
      formData.append("description1", aboutData.description1 || "");
      formData.append("description2", aboutData.description2 || "");
      formData.append("footerText", aboutData.footerText || "");
      if (imageFile) {
        formData.append("image", imageFile);
      }
    }

    try {
      const res = await aboutApi.upsert(formData);
      if (res.data) {
        setAboutData({
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
        title="Manage Homepage Welcome (About)" 
        description="Click the edit icons on the preview below to update the title, welcome description, testimonial quote, and blob image."
      />

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

      {/* EDIT MODAL */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100">
            
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">
                {activeModal === "content" && "Update Welcome Title & Text"}
                {activeModal === "testimonial" && "Update Testimonial & Quote"}
                {activeModal === "image" && "Replace About Section Image"}
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              
              {activeModal === "content" && (
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
              )}

              {activeModal === "testimonial" && (
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
