"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Edit3, Loader2, ArrowRight } from "lucide-react";
import { joinUsApi } from "@/lib/api/joinUs";
import { useAppStore } from "@/lib/store";
import Image from "next/image";

// const Instagram = ({ className }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
// );

import { Skeleton } from "@/components/admin/Skeleton";
import { Modal } from "@/components/admin/Modal";

export default function AdminInstagramPage() {
  const user = useAppStore((state: any) => state.user);


  // Database States
  const [instagramData, setInstagramData] = useState<any>({
    title: "JOIN US ON INSTAGRAM",
    description:
      "Like Simply Diego's on Instagram for great photos of our local dogs, pet food & supply deals, upcoming events in Albuquerque, and more!",
    instagramHandle: "🐾 Follow us @simplydiegos",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeModal, setActiveModal] = useState<"content" | null>(null);

  // Form States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");

  useEffect(() => {
    fetchInstagram();
  }, []);

  const fetchInstagram = async () => {
    try {
      setLoading(true);
      const res = await joinUsApi.get();
      if (res.data && res.data.length > 0) {
        // joinUsApi returns array, retrieve first one
        const record = res.data[0];
        setInstagramData({
          ...record,
          instagramHandle:
            record.instagramHandle || "🐾 Follow us @simplydiegos",
        });
      }
    } catch (e) {
      console.error("Failed to load Instagram section data:", e);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = () => {
    if (!user) return alert("Please login first to edit Instagram section");
    setTitle(instagramData.title);
    setDescription(instagramData.description || "");
    setInstagramHandle(instagramData.instagramHandle || "");
    setActiveModal("content");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Unauthorized");

    setSaving(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    // Custom field
    formData.append("instagramHandle", instagramHandle);

    try {
      const res = await joinUsApi.upsert(formData);
      if (res.data) {
        setInstagramData({
          ...res.data,
          instagramHandle:
            res.data.instagramHandle || "🐾 Follow us @simplydiegos",
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
        title="Manage Homepage Instagram Section"
        description="Click the edit icons on the preview below to update the Instagram handle, follow headers, and descriptive callouts."
      />

      <div className="bg-gray-100 p-8 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Live Preview (Hover to Edit)
          </span>
          <span className="text-xs text-gray-400">
            Instagram Feed Header Component
          </span>
        </div>

        {/* REPLICA INSTAGRAM BANNER */}
        <div className="w-full bg-white rounded-xl shadow-lg border border-gray-200 p-8 sm:p-12 text-center relative">
          {/* Main content (editable) */}
          <div
            onClick={openEditModal}
            className="group/content cursor-pointer border border-transparent hover:border-blue-300 hover:bg-blue-50/50 rounded-lg p-6 transition-all duration-200 relative max-w-3xl mx-auto"
            title="Click to edit follow header and handle details"
          >
            <p className="text-secondary/50 text-xs font-bold uppercase tracking-wider mb-2">
              {instagramData.instagramHandle}
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-secondary uppercase mb-4">
              {instagramData.title.replace("INSTAGRAM", "")}
              <span className="text-primary">INSTAGRAM</span>
            </h2>
            <p className="text-sm sm:text-base text-secondary/60 leading-relaxed">
              {instagramData.description}
            </p>

            {/* Floating Edit Icon */}
            <span className="absolute -top-2 -left-2 bg-blue-600 text-white rounded-full p-1.5 opacity-0 group-hover/content:opacity-100 transition-opacity shadow-md">
              <Edit3 className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Grid Mockup */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-8 max-w-4xl mx-auto rounded overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-100 relative group overflow-hidden border border-gray-200"
              >
                <Image
                  src={
                    i % 2 === 0
                      ? "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=200"
                      : "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=200"
                  }
                  height={200}
                  width={200}
                  alt="Post preview"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                {/* <div className="absolute inset-0 bg-primary/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="text-white h-5 w-5" />
                </div> */}
              </div>
            ))}
          </div>

          {/* Static CTA Button Mockup */}
          <div className="mt-8">
            <Button
              disabled
              className="h-10 px-8 rounded border border-secondary/20 text-secondary bg-white hover:bg-secondary/5 font-bold flex items-center gap-2 cursor-default opacity-90 mx-auto"
            >
              <span>View More on Instagram</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      <Modal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        title="Update Instagram Promo Details"
        onSubmit={handleSubmit}
        isSaving={saving}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Instagram Handle Indicator
            </label>
            <input
              type="text"
              value={instagramHandle}
              onChange={(e) => setInstagramHandle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Section Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Section Subtitle / Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
