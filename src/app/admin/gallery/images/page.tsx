"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Loader2, Image as ImageIcon, Upload } from "lucide-react";
import { galleryApi } from "@/lib/api/gallery";
import { useAppStore } from "@/lib/store";
import { Skeleton } from "@/components/admin/Skeleton";

export default function AdminGalleryImagesPage() {

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

      {/* Grid of Images */}
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

      {/* ADD MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100">
            
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">Add New Gallery Image</h3>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
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

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button type="button" onClick={() => setIsFormOpen(false)} variant="outline">Cancel</Button>
                <Button type="submit" disabled={saving || !imageFile} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {saving ? "Uploading..." : "Upload Image"}
                </Button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
