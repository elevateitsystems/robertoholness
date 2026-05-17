"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Edit3, Loader2, Phone, ShoppingCart, Upload } from "lucide-react";
import { navBarApi } from "@/lib/api/navBar";
import { useAppStore } from "@/lib/store";
import Image from "next/image";
import { Skeleton } from "@/components/admin/Skeleton";


export default function AdminHeaderPage() {
  const user = useAppStore((state: any) => state.user);
  
  // Database States
  const [navBarData, setNavBarData] = useState<any>({
    contactNumber: "(505) 990-2014",
    timeLine: "Mon-Fri: 9am-7pm | Sat: 9am-6pm | Sun: 10am-5pm",
    deliveryOffer: "🐾 Free delivery on orders over $50!",
    navLogoUrl: "/assets/logo-without-bg.png"
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Modal Editing States
  const [activeModal, setActiveModal] = useState<"logo" | "info" | "promo" | null>(null);
  
  // Form States
  const [contactNumber, setContactNumber] = useState("");
  const [timeLine, setTimeLine] = useState("");
  const [deliveryOffer, setDeliveryOffer] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  useEffect(() => {
    fetchNavBar();
  }, []);

  const fetchNavBar = async () => {
    try {
      setLoading(true);
      const res = await navBarApi.get();
      if (res.data) {
        setNavBarData({
          ...res.data,
          navLogoUrl: res.data.navLogoUrl || "/assets/logo-without-bg.png"
        });
      }
    } catch (e) {
      console.error("Failed to load NavBar data:", e);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (type: "logo" | "info" | "promo") => {
    if (!user) {
      alert("Please login first to edit headers");
      return;
    }
    
    if (type === "info") {
      setContactNumber(navBarData.contactNumber);
      setTimeLine(navBarData.timeLine || "");
    } else if (type === "promo") {
      setDeliveryOffer(navBarData.deliveryOffer || "");
    } else if (type === "logo") {
      setLogoFile(null);
      setLogoPreview(navBarData.navLogoUrl);
    }
    setActiveModal(type);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Unauthorized");
    
    setSaving(true);
    const formData = new FormData();
    
    if (activeModal === "info") {
      formData.append("contactNumber", contactNumber);
      formData.append("timeLine", timeLine);
      formData.append("deliveryOffer", navBarData.deliveryOffer || "");
    } else if (activeModal === "promo") {
      formData.append("contactNumber", navBarData.contactNumber);
      formData.append("timeLine", navBarData.timeLine || "");
      formData.append("deliveryOffer", deliveryOffer);
    } else if (activeModal === "logo") {
      formData.append("contactNumber", navBarData.contactNumber);
      formData.append("timeLine", navBarData.timeLine || "");
      formData.append("deliveryOffer", navBarData.deliveryOffer || "");
      if (logoFile) {
        formData.append("logo", logoFile);
      }
    }

    try {
      const res = await navBarApi.upsert(formData);
      if (res.data) {
        setNavBarData({
          ...res.data,
          navLogoUrl: res.data.navLogoUrl || "/assets/logo-without-bg.png"
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
        title="Manage Header" 
        description="Click the edit icons on the preview below to update logo, hours, contact info, and promotional offers."
      />

      {/* Interactive Visual Preview */}
      <div className="bg-gray-100 p-8 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Live Preview (Hover to Edit)</span>
          <span className="text-xs text-gray-400">Website Header Component</span>
        </div>

        {/* REPLICA HEADER CONTAINER */}
        <div className="w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          
          {/* Top Info Bar (editable) */}
          <div className="bg-primary text-white text-[11px] sm:text-xs font-medium">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 relative">
              
              {/* Info section (editable) */}
              <div 
                onClick={() => openEditModal("info")}
                className="group/item flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 cursor-pointer border border-transparent hover:border-white/50 hover:bg-white/10 rounded px-3 py-1 transition-all duration-200 relative"
                title="Click to edit Phone and Hours"
              >
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  {navBarData.contactNumber}
                </span>
                <span>{navBarData.timeLine}</span>
                
                {/* Floating Edit Icon */}
                <span className="absolute -top-2 -left-2 bg-blue-600 text-white rounded-full p-1 opacity-0 group-hover/item:opacity-100 transition-opacity shadow-md">
                  <Edit3 className="h-3 w-3" />
                </span>
              </div>

              {/* Offer section (editable) */}
              <div 
                onClick={() => openEditModal("promo")}
                className="group/promo flex items-center cursor-pointer border border-transparent hover:border-white/50 hover:bg-white/10 rounded px-3 py-1 transition-all duration-200 relative text-accent-green font-bold"
                title="Click to edit delivery promotion"
              >
                <span>{navBarData.deliveryOffer}</span>
                
                {/* Floating Edit Icon */}
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-1 opacity-0 group-hover/promo:opacity-100 transition-opacity shadow-md">
                  <Edit3 className="h-3 w-3" />
                </span>
              </div>

            </div>
          </div>

          {/* Bottom Nav Bar */}
          <div className="bg-white px-4 sm:px-6 py-4 flex items-center justify-between border-b border-gray-100">
            
            {/* Logo area (editable) */}
            <div 
              onClick={() => openEditModal("logo")}
              className="group/logo cursor-pointer border border-transparent hover:border-blue-300 hover:bg-blue-50/50 rounded-lg p-2 transition-all duration-200 relative flex items-center"
              title="Click to change logo image"
            >
              <img 
                src={navBarData.navLogoUrl} 
                alt="Brand Logo" 
                className="h-12 w-auto object-contain"
              />
              
              {/* Floating Edit Icon */}
              <span className="absolute -top-1 -left-1 bg-blue-600 text-white rounded-full p-1 opacity-0 group-hover/logo:opacity-100 transition-opacity shadow-md">
                <Edit3 className="h-3 w-3" />
              </span>
            </div>

            {/* Static Navigation Links (Show design only) */}
            <div className="hidden md:flex items-center space-x-6">
              {["Services", "Gallery", "Blog", "Reviews", "Contact"].map((item) => (
                <span key={item} className="text-gray-600 font-semibold text-sm hover:text-primary transition-colors cursor-default">
                  {item}
                </span>
              ))}
            </div>

            {/* Static CTA Button (Show design only) */}
            <div className="flex items-center gap-2">
              <Button disabled className="bg-primary hover:bg-primary/95 text-white flex items-center gap-2 font-bold px-4 py-2 text-sm rounded cursor-default opacity-85">
                <ShoppingCart className="h-4 w-4" />
                Shop Online
              </Button>
            </div>

          </div>

        </div>
      </div>

      {/* EDIT MODAL */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 transform scale-100 transition-transform">
            
            {/* Modal Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">
                {activeModal === "logo" && "Update Website Logo"}
                {activeModal === "info" && "Update Contact & Hours"}
                {activeModal === "promo" && "Update Delivery Offer banner"}
              </h3>
              <button 
                type="button" 
                onClick={() => setActiveModal(null)} 
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                &times;
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              
              {activeModal === "logo" && (
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700">Logo Image File</label>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors bg-gray-50/50">
                    {logoPreview ? (
                      <div className="mb-4 relative">
                        <img src={logoPreview} alt="Preview" className="h-20 w-auto object-contain" />
                      </div>
                    ) : (
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    )}
                    <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Choose Logo File
                      <input type="file" onChange={handleLogoChange} className="hidden" accept="image/*" />
                    </label>
                    <p className="text-xs text-gray-400 mt-2">PNG, JPG or SVG formats</p>
                  </div>
                </div>
              )}

              {activeModal === "info" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Number</label>
                    <input 
                      type="text" 
                      value={contactNumber} 
                      onChange={e => setContactNumber(e.target.value)} 
                      required 
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Store Hours Timeline</label>
                    <input 
                      type="text" 
                      value={timeLine} 
                      onChange={e => setTimeLine(e.target.value)} 
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all" 
                    />
                  </div>
                </div>
              )}

              {activeModal === "promo" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Delivery Offer banner Text</label>
                    <textarea 
                      value={deliveryOffer} 
                      onChange={e => setDeliveryOffer(e.target.value)} 
                      rows={3} 
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all" 
                    />
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button 
                  type="button" 
                  onClick={() => setActiveModal(null)} 
                  variant="outline"
                  className="rounded-lg"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={saving} 
                  className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2"
                >
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
