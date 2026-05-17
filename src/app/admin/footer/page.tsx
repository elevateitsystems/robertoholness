"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Edit3, Loader2 } from "lucide-react";
import { footerApi } from "@/lib/api/footer";
import { useAppStore } from "@/lib/store";
import { Skeleton } from "@/components/admin/Skeleton";

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
    if (!user) return alert("Please login first to edit footer");
    setDescription(footerData.description || "");
    setLocation(footerData.location || "");
    setPhoneNumber(footerData.phoneNumber || "");
    setEmail(footerData.email || "");
    setActiveModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Unauthorized");
    
    setSaving(true);
    const formData = new FormData();
    formData.append("description", description);
    formData.append("location", location);
    formData.append("phoneNumber", phoneNumber);
    formData.append("email", email);

    try {
      const res = await footerApi.upsert(formData);
      if (res.data) {
        setFooterData(res.data);
      }
      setActiveModal(false);
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
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100">
            
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">Update Footer Content</h3>
              <button onClick={() => setActiveModal(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
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

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button type="button" onClick={() => setActiveModal(false)} variant="outline">Cancel</Button>
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
