"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Edit3, Loader2, ArrowRight, Trash2, Plus, Link as LinkIcon, Upload } from "lucide-react";
import { joinUsApi } from "@/lib/api/joinUs";
import { useAppStore } from "@/lib/store";
import Image from "next/image";
import { Skeleton } from "@/components/admin/Skeleton";
import { Modal } from "@/components/admin/Modal";
import { toast } from "react-toastify";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const fallbackImages = [
  { id: "fb-1", url: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=600", link: "https://instagram.com/simplydiegos" },
  { id: "fb-2", url: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=600", link: "https://instagram.com/simplydiegos" },
  { id: "fb-3", url: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=600", link: "https://instagram.com/simplydiegos" },
  { id: "fb-4", url: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=600", link: "https://instagram.com/simplydiegos" },
  { id: "fb-5", url: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=600", link: "https://instagram.com/simplydiegos" },
];

export default function AdminInstagramPage() {
  const user = useAppStore((state: any) => state.user);

  // Database States
  const [instagramData, setInstagramData] = useState<any>({
    id: "",
    title: "JOIN US ON INSTAGRAM",
    description:
      "Like Simply Diego's on Instagram for great photos of our local dogs, pet food & supply deals, upcoming events in Albuquerque, and more!",
    instagramHandle: "🐾 Follow us @simplydiegos",
    joinUsImages: [],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeModal, setActiveModal] = useState<"content" | "addImage" | null>(null);

  // Text Form States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");

  // New Image Form States
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [newImageLink, setNewImageLink] = useState("");

  useEffect(() => {
    fetchInstagram();
  }, []);

  const fetchInstagram = async () => {
    try {
      setLoading(true);
      const res = await joinUsApi.get();
      const record = res.data && Array.isArray(res.data)
        ? res.data[0]
        : res.data;

      if (record) {
        setInstagramData({
          id: record.id,
          title: record.title || "JOIN US ON INSTAGRAM",
          description: record.description || "",
          instagramHandle: record.instagramHandle || "🐾 Follow us @simplydiegos",
          joinUsImages: record.joinUsImages || [],
        });
      }
    } catch (e) {
      console.error("Failed to load Instagram section data:", e);
    } finally {
      setLoading(false);
    }
  };

  const openTextEditModal = () => {
    if (!user) {
      toast.error("Please login first to edit Instagram section");
      return;
    }
    setTitle(instagramData.title);
    setDescription(instagramData.description || "");
    setInstagramHandle(instagramData.instagramHandle || "");
    setActiveModal("content");
  };

  const openAddImageModal = () => {
    if (!user) {
      toast.error("Please login first to manage images");
      return;
    }
    setNewImageFile(null);
    setNewImagePreview(null);
    setNewImageLink("");
    setActiveModal("addImage");
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate Format
      const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error("Unsupported file format! Please upload a PNG, JPG, JPEG, or WebP image.");
        e.target.value = ""; // Clear file input
        setNewImageFile(null);
        setNewImagePreview(null);
        return;
      }

      // Validate Max Size (5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error("File is too large! Maximum allowed file size is 5MB.");
        e.target.value = ""; // Clear file input
        setNewImageFile(null);
        setNewImagePreview(null);
        return;
      }

      setNewImageFile(file);
      setNewImagePreview(URL.createObjectURL(file));
      toast.success("Image selected and validated successfully!");
    }
  };

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Unauthorized");
      return;
    }

    setSaving(true);
    const payload = {
      title,
      description,
      status: "active"
    };

    try {
      const res = await joinUsApi.upsert(payload);
      if (res.data) {
        setInstagramData((prev: any) => ({
          ...prev,
          title: res.data.title,
          description: res.data.description,
          instagramHandle: instagramHandle // Keep locally
        }));
        toast.success("Header texts updated successfully!");
      }
      setActiveModal(null);
    } catch (e) {
      console.error(e);
      toast.error("Failed to save header changes");
    } finally {
      setSaving(false);
    }
  };

  const handleAddImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Unauthorized");
      return;
    }
    if (!newImageFile) {
      toast.error("Please select an image file to upload");
      return;
    }

    setSaving(true);

    let activeId = instagramData.id;
    if (!activeId) {
      try {
        const payload = {
          title: instagramData.title,
          description: instagramData.description,
          status: "active"
        };
        const res = await joinUsApi.upsert(payload);
        if (res.data) {
          activeId = res.data.id;
          setInstagramData((prev: any) => ({
            ...prev,
            id: res.data.id
          }));
        } else {
          throw new Error("Failed to initialize JoinUs settings in database");
        }
      } catch (err: any) {
        console.error("Failed to initialize JoinUs:", err);
        toast.error("Failed to initialize Instagram section. Please try again.");
        setSaving(false);
        return;
      }
    }

    const formData = new FormData();
    formData.append("image", newImageFile);
    if (newImageLink) {
      formData.append("link", newImageLink);
    }

    try {
      await joinUsApi.addImage(activeId, formData);
      await fetchInstagram(); // Refresh the list of images
      toast.success("New Instagram post image uploaded successfully!");
      setActiveModal(null);
    } catch (e) {
      console.error(e);
      toast.error("Failed to add image. Make sure image file size is valid.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!user) {
      toast.error("Unauthorized");
      return;
    }
    if (!confirm("Are you sure you want to delete this image from your Instagram Feed?")) return;

    try {
      await joinUsApi.deleteImage(imageId);
      // Filter out deleted image from UI state instantly
      setInstagramData((prev: any) => ({
        ...prev,
        joinUsImages: prev.joinUsImages.filter((img: any) => img.id !== imageId)
      }));
      toast.success("Image removed from feed successfully!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete image");
    }
  };

  if (loading) {
    return <Skeleton type="preview" />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Manage Homepage Instagram Section"
        description="Click the header to edit promotional text. Manage dynamic grid photos and their landing links below."
      />

      <div className="bg-gray-100 p-8 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Live Preview (Hover to Edit Headers)
          </span>
          <span className="text-xs text-gray-400">
            Instagram Feed Component
          </span>
        </div>

        {/* REPLICA INSTAGRAM BANNER */}
        <div className="w-full bg-white rounded-xl shadow-lg border border-gray-200 p-8 sm:p-12 text-center relative">
          {/* Main Content Texts (editable) */}
          <div
            onClick={openTextEditModal}
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

            <span className="absolute -top-2 -left-2 bg-blue-600 text-white rounded-full p-1.5 opacity-0 group-hover/content:opacity-100 transition-opacity shadow-md">
              <Edit3 className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Dynamic Feed Header and Action Button */}
          <div className="mt-12 mb-6 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200 pb-4">
            <div className="text-left">
              <h3 className="text-lg font-bold text-gray-800">
                Upload the Instagram Photos
              </h3>
              <p className="text-xs text-gray-500">
                Manage Instagram photos displayed in the public grid section.
              </p>
            </div>
            <Button
              onClick={openAddImageModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Image</span>
            </Button>
          </div>

          {/* Dynamic Grid Layout */}
          {(() => {
            const isFallback = instagramData.joinUsImages.length === 0;
            const displayImages = isFallback ? fallbackImages : instagramData.joinUsImages;

            return (
              <div className="space-y-6 max-w-4xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                  {displayImages.map((img: any, i: number) => (
                    <div
                      key={img.id || i}
                      className="aspect-square bg-gray-50 relative group rounded-lg overflow-hidden border border-gray-200 shadow-sm"
                    >
                      <Image
                        src={img.url}
                        alt="Instagram Post"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />

                      {/* Hover Overlay Controls */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 gap-2 z-20">
                        {!isFallback ? (
                          <>
                            {img.link && (
                              <a
                                href={img.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/90 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-md text-xs font-semibold flex items-center gap-1 max-w-[90%]"
                                title={img.link}
                              >
                                <LinkIcon className="h-3 w-3 shrink-0" />
                                <span className="truncate text-[10px]">Visit Link</span>
                              </a>
                            )}
                            <button
                              onClick={() => handleDeleteImage(img.id)}
                              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-md transition-colors"
                              title="Delete Image"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </>
                        ) : (
                          <span className="text-white text-[10px] font-bold bg-black/60 px-2.5 py-1.5 rounded-full border border-white/20 select-none shadow">
                            Default Fallback
                          </span>
                        )}
                      </div>

                      {/* Tiny Link Indicator Icon if link exists */}
                      {img.link && (
                        <span className="absolute top-2 right-2 bg-emerald-500 text-white p-1 rounded-full shadow z-10">
                          <LinkIcon className="h-2.5 w-2.5" />
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {isFallback && (
                  <div className="border border-blue-100 bg-blue-50/40 rounded-xl p-4 text-center">
                    <p className="text-xs text-blue-600 font-medium">
                      💡 Currently displaying system fallback photos. Upload custom images using the &quot;Add New Image&quot; button above to personalize your live feed!
                    </p>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Static CTA Button Mockup */}
          <div className="mt-12">
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

      {/* MODAL 1: TEXT HEADERS EDIT */}
      <Modal
        isOpen={activeModal === "content"}
        onClose={() => setActiveModal(null)}
        title="Update Instagram Headers"
        onSubmit={handleTextSubmit}
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

      {/* MODAL 2: ADD NEW IMAGE */}
      <Modal
        isOpen={activeModal === "addImage"}
        onClose={() => setActiveModal(null)}
        title="Add New Instagram Image"
        onSubmit={handleAddImageSubmit}
        isSaving={saving}
      >
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Instagram Post Image
            </label>
            
            {/* Premium Drag & Drop Styled Clickable Box */}
            <div
              onClick={() => document.getElementById("instagram-file-input")?.click()}
              className="group relative border-2 border-dashed border-gray-300 hover:border-primary bg-gray-50/50 hover:bg-primary/[0.02] transition-all rounded-xl p-6 text-center cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-3"
            >
              <input
                id="instagram-file-input"
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                required={!newImagePreview}
                className="hidden"
              />
              
              {newImagePreview ? (
                <div className="relative aspect-square w-32 rounded-lg overflow-hidden border border-gray-200 shadow-md">
                  <Image
                    src={newImagePreview}
                    alt="Upload preview"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-semibold px-2 py-1 bg-black/60 rounded">Change Photo</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-white rounded-full shadow-sm text-gray-400 group-hover:text-primary transition-colors border border-gray-100">
                    <Upload className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-700 group-hover:text-primary transition-colors">
                      Click to upload photo
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      or drag and drop your file here
                    </p>
                  </div>
                </>
              )}
              
              {/* Image Type Instruction Panel */}
              <div className="mt-2 pt-3 border-t border-gray-200/60 w-full text-[11px] text-gray-400 text-left space-y-1">
                <p className="font-semibold text-gray-500 uppercase tracking-wider text-[9px] mb-1">
                  💡 Image Guidelines:
                </p>
                <p>• <strong>Formats</strong>: PNG, JPG, JPEG, or WebP.</p>
                <p>• <strong>Max Size</strong>: Up to <strong>5MB</strong> file size.</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Instagram Link / Destination URL (Optional)
            </label>
            <input
              type="url"
              placeholder="e.g. https://instagram.com/p/C3..."
              value={newImageLink}
              onChange={(e) => setNewImageLink(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
            />
            <span className="text-[10px] text-gray-400 mt-1 block">
              Enter the link that users will navigate to when they click this image on the homepage.
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
