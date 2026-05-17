"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { heroApi } from "@/lib/api/hero";
import { useAppStore } from "@/lib/store";
import { Skeleton } from "@/components/admin/Skeleton";
import { Modal } from "@/components/admin/Modal";
import { BannerPreview } from "./BannerPreview";
import { BannerModalContent } from "./BannerModalContent";

export default function AdminHeroBannerPageClient() {
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

      <BannerPreview
        heroData={heroData}
        openEditModal={openEditModal}
      />

      {/* EDIT MODAL */}
      <Modal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        title={activeModal === "content" ? "Update Hero Title & Text" : "Replace Hero Banner Image"}
        onSubmit={handleSubmit}
        isSaving={saving}
      >
        <BannerModalContent
          activeModal={activeModal}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          imagePreview={imagePreview}
          handleImageChange={handleImageChange}
        />
      </Modal>

    </div>
  );
}
