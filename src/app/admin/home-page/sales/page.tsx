"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Edit3, Loader2, Upload } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Skeleton } from "@/components/admin/Skeleton";
import Image from "next/image";
import { Modal } from "@/components/admin/Modal";

export default function AdminSalesPage() {
  const user = useAppStore((state: any) => state.user);

  // LocalStorage Persisted States
  const [salesData, setSalesData] = useState<any>({
    badgeText: "Early Deal",
    title: "BLACK friday",
    discountText: "20% OFF",
    codeText: "USE CODE: ED200FF",
    imageUrl:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=1200",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeModal, setActiveModal] = useState<"text" | "image" | null>(null);

  // Form States
  const [badgeText, setBadgeText] = useState("");
  const [title, setTitle] = useState("");
  const [discountText, setDiscountText] = useState("");
  const [codeText, setCodeText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("admin_sales_data");
    if (saved) {
      setSalesData(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const openEditModal = (type: "text" | "image") => {
    if (!user) return alert("Please login first to edit sales");

    if (type === "text") {
      setBadgeText(salesData.badgeText);
      setTitle(salesData.title);
      setDiscountText(salesData.discountText);
      setCodeText(salesData.codeText);
    } else if (type === "image") {
      setImageFile(null);
      setImagePreview(salesData.imageUrl);
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
    let newImageUrl = salesData.imageUrl;

    if (activeModal === "image" && imagePreview) {
      newImageUrl = imagePreview; // Save the base64 or preview url locally
    }

    const updated = {
      badgeText: activeModal === "text" ? badgeText : salesData.badgeText,
      title: activeModal === "text" ? title : salesData.title,
      discountText:
        activeModal === "text" ? discountText : salesData.discountText,
      codeText: activeModal === "text" ? codeText : salesData.codeText,
      imageUrl: newImageUrl,
    };

    localStorage.setItem("admin_sales_data", JSON.stringify(updated));
    setSalesData(updated);

    setTimeout(() => {
      setSaving(false);
      setActiveModal(null);
    }, 400);
  };

  if (loading) {
    return <Skeleton type="preview" />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Manage Sales Section"
        description="Click the edit icons on the preview below to update promo titles, codes, discount levels, and dogs images."
      />

      <div className="bg-gray-100 p-8 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Live Preview (Hover to Edit)
          </span>
          <span className="text-xs text-gray-400">Sales Banner Component</span>
        </div>

        {/* REPLICA SALES BANNER */}
        <div className="w-full bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col md:flex-row relative">
          {/* Left Side: Dog Image (editable) */}
          <div
            onClick={() => openEditModal("image")}
            className="group/img md:w-1/2 relative min-h-[300px] md:min-h-[450px] cursor-pointer border-2 border-transparent hover:border-blue-400 transition-all duration-200"
            title="Click to edit sales image"
          >
            <Image
              src={salesData.imageUrl}
              alt="Promo dog"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Floating Edit Icon */}
            <span className="absolute top-4 left-4 bg-blue-600 text-white rounded-full p-1.5 opacity-0 group-hover/img:opacity-100 transition-opacity shadow-md z-30">
              <Edit3 className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Right Side: Black Promo Area (editable) */}
          <div
            onClick={() => openEditModal("text")}
            className="group/text md:w-1/2 bg-primary text-white p-12 flex flex-col justify-center items-center text-center relative cursor-pointer border-2 border-transparent hover:border-white/30 transition-all duration-200"
            title="Click to edit promo details"
          >
            {/* Floating Edit Icon */}
            <span className="absolute top-4 right-4 bg-blue-600 text-white rounded-full p-1.5 opacity-0 group-hover/text:opacity-100 transition-opacity shadow-md z-30">
              <Edit3 className="h-3.5 w-3.5" />
            </span>

            <p className="text-xs font-bold tracking-[0.2em] mb-3 uppercase text-white/90">
              {salesData.badgeText}
            </p>

            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 flex items-end">
              {salesData.title.split(" ")[0]}
              <span className="text-3xl italic font-serif font-light lowercase tracking-normal -ml-1 text-white/90">
                {salesData.title.split(" ")[1] || "friday"}
              </span>
            </h2>

            <div className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              {salesData.discountText}
            </div>

            <p className="text-sm font-bold tracking-widest mb-6 text-white/80">
              {salesData.codeText}
            </p>

            <Button
              disabled
              className="border border-white/50 text-white hover:bg-white hover:text-black bg-transparent px-8 py-3 text-xs font-bold tracking-widest uppercase cursor-default opacity-85"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      <Modal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        title={activeModal === "text" ? "Update Sales Details" : "Replace Sales Image"}
        onSubmit={handleSubmit}
        isSaving={saving}
      >
        {activeModal === "text" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Badge Text
              </label>
              <input
                type="text"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Title (Use Space for styled suffix)
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
                Discount Text
              </label>
              <input
                type="text"
                value={discountText}
                onChange={(e) => setDiscountText(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Coupon Code Text
              </label>
              <input
                type="text"
                value={codeText}
                onChange={(e) => setCodeText(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
              />
            </div>
          </div>
        )}

        {activeModal === "image" && (
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">
              Choose Image
            </label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 bg-gray-50/50">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-32 w-auto object-contain mb-4 rounded"
                />
              ) : null}
              <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-semibold hover:bg-gray-50 flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Select Image
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
