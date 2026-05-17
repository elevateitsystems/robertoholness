"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { aboutApi } from "@/lib/api/about";
import { useAppStore } from "@/lib/store";
import { Skeleton } from "@/components/admin/Skeleton";
import { Modal } from "@/components/admin/Modal";
import { AboutPreview } from "./AboutPreview";
import { AboutModalContent } from "./AboutModalContent";

export default function AdminAboutSectionPageClient() {
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

      <AboutPreview
        aboutData={aboutData}
        openEditModal={openEditModal}
      />

      {/* EDIT MODAL */}
      <Modal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        title={
          activeModal === "content"
            ? "Update Welcome Title & Text"
            : activeModal === "testimonial"
            ? "Update Testimonial & Quote"
            : "Replace About Section Image"
        }
        onSubmit={handleSubmit}
        isSaving={saving}
      >
        <AboutModalContent
          activeModal={activeModal}
          title={title}
          setTitle={setTitle}
          description1={description1}
          setDescription1={setDescription1}
          description2={description2}
          setDescription2={setDescription2}
          footerText={footerText}
          setFooterText={setFooterText}
          imagePreview={imagePreview}
          handleImageChange={handleImageChange}
        />
      </Modal>
    </div>
  );
}
