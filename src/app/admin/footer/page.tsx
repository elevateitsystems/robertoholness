"use client";

import { Modal } from "@/components/admin/Modal";
import { PageHeader } from "@/components/admin/PageHeader";
import { Skeleton } from "@/components/admin/Skeleton";
import { footerApi } from "@/lib/api/footer";
import { useAppStore } from "@/lib/store";
import { Edit3 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminFooterPage() {

  const user = useAppStore((state: any) => state.user);
  
  // Database States
  const [footerData, setFooterData] = useState<any>({
    description: "Albuquerque's premier natural pet food market. We focus on providing the best nutrition and care for your furry family members since 2008.",
    location: "7321 San Antonio Dr NE, Albuquerque, NM 87109",
    phoneNumber: "(505) 990-2014",
    email: "info@simplydlegos.com"
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  
  // Form States
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchFooter();
  }, []);

  const fetchFooter = async () => {
    try {
      setLoading(true);
      const res = await footerApi.get();
      if (res.data) {
        setFooterData(res.data);
      }
    } catch (e) {
      console.error("Failed to load Footer data:", e);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = () => {
    if (!user) return toast.error("Please login first to edit footer");
    setDescription(footerData.description || "");
    setLocation(footerData.location || "");
    setPhoneNumber(footerData.phoneNumber || "");
    setEmail(footerData.email || "");
    setActiveModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Unauthorized");
    
    setSaving(true);
    const formData = new FormData();
    formData.append("description", description);
    formData.append("location", location);
    formData.append("phoneNumber", phoneNumber);
    formData.append("email", email);

    try {
      const res = await footerApi.upsert(formData);
      if (res.data) {
        // If array, grab first element
        const record = Array.isArray(res.data) ? res.data[0] : res.data;
        setFooterData(record || res.data);
      }
      toast.success("Footer updated successfully!");
      setActiveModal(false);
    } catch (e) {
      console.error(e);
      toast.error("Failed to save changes");
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
        title="Manage Global Footer" 
        description="Click the edit icons on the preview below to update the Brand tagline, street location, contact number, and support email."
      />

      <div className="bg-gray-100 p-8 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Live Preview (Hover to Edit)</span>
          <span className="text-xs text-gray-400">Global Footer Component</span>
        </div>

        {/* REPLICA FOOTER CONTAINER */}
        <div className="relative bg-gradient-to-b from-[#A81E60] to-[#600030] text-white/80 rounded-xl overflow-hidden shadow-lg p-8 sm:p-12">
          
          <div 
            onClick={openEditModal}
            className="group/footer cursor-pointer border border-transparent hover:border-white/30 hover:bg-white/5 rounded-xl p-8 transition-all duration-200 relative grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
            title="Click to edit footer sections"
          >
            {/* Floating Edit Icon */}
            <span className="absolute -top-2 -left-2 bg-blue-600 text-white rounded-full p-1.5 opacity-0 group-hover/footer:opacity-100 transition-opacity shadow-md z-30">
              <Edit3 className="h-3.5 w-3.5" />
            </span>

            {/* Col 1 */}
            <div className="space-y-4">
              <span className="text-lg font-black tracking-wider uppercase text-white block">Simply Diego's</span>
              <p className="text-sm text-white/60 leading-relaxed">
                {footerData.description}
              </p>
            </div>

            {/* Col 2 */}
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white block">Visit Us</span>
              <div className="space-y-2 text-sm text-white/70">
                <p>📍 {footerData.location}</p>
                <p>📞 {footerData.phoneNumber}</p>
                <p>✉️ {footerData.email}</p>
              </div>
            </div>

            {/* Col 3 */}
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white block">Store Hours</span>
              <div className="space-y-2 text-sm text-white/70">
                <p className="flex justify-between border-b border-white/10 pb-1">
                  <span>Mon - Fri</span> <span className="font-bold">9:00 - 7:00</span>
                </p>
                <p className="flex justify-between border-b border-white/10 pb-1">
                  <span>Saturday</span> <span className="font-bold">9:00 - 6:00</span>
                </p>
                <p className="flex justify-between border-b border-white/10 pb-1">
                  <span>Sunday</span> <span className="font-bold">10:00 - 5:00</span>
                </p>
              </div>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/40">
            © {new Date().getFullYear()} Simply Diego's. Albuquerque's Premium Pet Food Store.
          </div>

        </div>
      </div>

      {/* EDIT MODAL */}
      <Modal
        isOpen={activeModal}
        onClose={() => setActiveModal(false)}
        title="Update Footer Content"
        onSubmit={handleSubmit}
        isSaving={saving}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tagline / Description</label>
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              rows={3}
              required 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Street Address</label>
            <input 
              type="text" 
              value={location} 
              onChange={e => setLocation(e.target.value)} 
              required 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
            <input 
              type="text" 
              value={phoneNumber} 
              onChange={e => setPhoneNumber(e.target.value)} 
              required 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
            />
          </div>
        </div>
      </Modal>

    </div>
  );
}
