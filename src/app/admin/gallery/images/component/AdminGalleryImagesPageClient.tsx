"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { galleryApi } from "@/lib/api/gallery";
import { useAppStore } from "@/lib/store";
import { Skeleton } from "@/components/admin/Skeleton";
import { Modal } from "@/components/admin/Modal";
import { GalleryImagesPreview } from "./GalleryImagesPreview";
import { GalleryImagesModalContent } from "./GalleryImagesModalContent";

export default function AdminGalleryImagesPageClient() {
  const user = useAppStore((state: any) => state.user);

  const [gallery, setGallery] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form States
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [link, setLink] = useState("");

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await galleryApi.get();
      if (res.data) {
        setGallery(res.data);
        setImages(res.data.galleryImages || []);
      } else {
        // Create first singleton if empty
        const init = await galleryApi.upsert({ title: "Main Gallery", description: "Our Pet Store Gallery" });
        if (init.data) {
          setGallery(init.data);
          setImages([]);
        }
      }
    } catch (e) {
      console.error("Failed to load gallery:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = () => {
    if (!user) return alert("Please login first to manage gallery images");
    setImageFile(null);
    setImagePreview(null);
    setLink("");
    setIsFormOpen(true);
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
    if (!user || !gallery || !imageFile) return alert("Please fill out all fields");

    setSaving(true);
    const formData = new FormData();
    formData.append("image", imageFile);
    if (link) formData.append("link", link);

    try {
      await galleryApi.addImage(gallery.id, formData);
      setIsFormOpen(false);
      fetchGallery();
    } catch (e) {
      console.error(e);
      alert("Failed to add gallery image");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (imageId: string) => {
    if (!user) return alert("Unauthorized");
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      await galleryApi.deleteImage(imageId);
      fetchGallery();
    } catch (e) {
      console.error(e);
      alert("Failed to delete image");
    }
  };

  if (loading) {
    return <Skeleton type="grid" />;
  }

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Manage Gallery Images" 
        description="Upload showcase images of your store, DIY washes, and client pets to display in the main website gallery."
        action={
          <Button onClick={handleOpenForm} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 rounded-lg">
            <Plus className="h-4 w-4" /> Add Gallery Image
          </Button>
        }
      />

      <GalleryImagesPreview
        images={images}
        handleDelete={handleDelete}
      />

      {/* ADD MODAL */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Add New Gallery Image"
        onSubmit={handleSubmit}
        isSaving={saving}
        submitText="Upload Image"
      >
        <GalleryImagesModalContent
          imagePreview={imagePreview}
          handleImageChange={handleImageChange}
          link={link}
          setLink={setLink}
        />
      </Modal>
    </div>
  );
}
