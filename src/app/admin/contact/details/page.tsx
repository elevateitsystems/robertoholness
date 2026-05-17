"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Edit3, Loader2, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Skeleton } from "@/components/admin/Skeleton";

export default function AdminContactDetailsPage() {

  const user = useAppStore((state: any) => state.user);
  
  // LocalStorage Persisted States
  const [contactData, setContactData] = useState<any>({
    phone: "(505) 999-9999",
    email: "info@simplydiegos.com",
    address: "Simply Diego's, Albuquerque, NM",
    hours: "Mon - Sat: 9:00 AM - 6:00 PM | Sun: 11:00 AM - 4:00 PM"
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  
  // Form States
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [hours, setHours] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("contact_details");
    if (saved) {
      setContactData(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const openEditModal = () => {
    if (!user) return alert("Please login first to edit contact details");
    setPhone(contactData.phone);
    setEmail(contactData.email);
    setAddress(contactData.address);
    setHours(contactData.hours);
    setActiveModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Unauthorized");
    
    setSaving(true);
    const updated = { phone, email, address, hours };
    localStorage.setItem("contact_details", JSON.stringify(updated));
    setContactData(updated);
    
    setTimeout(() => {
      setSaving(false);
      setActiveModal(false);
    }, 400);
  };

  if (loading) {
    return <Skeleton type="preview" />;
  }

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Manage Contact Details" 
        description="Click the edit icons on the preview below to update the shop's telephone, support email, maps address, and operational hours."
      />

      <div className="bg-gray-100 p-8 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Live Preview (Hover to Edit)</span>
          <span className="text-xs text-gray-400">Contact Info Block</span>
        </div>

        {/* REPLICA CONTACT INFO PANEL */}
        <div 
          onClick={openEditModal}
          className="group/contact cursor-pointer border border-transparent hover:border-blue-300 hover:bg-blue-50/50 rounded-xl p-8 sm:p-12 transition-all duration-200 relative bg-white shadow-lg max-w-2xl mx-auto flex flex-col md:flex-row gap-8 items-center text-left"
          title="Click to edit contact details"
        >
          {/* Floating Edit Icon */}
          <span className="absolute -top-2 -left-2 bg-blue-600 text-white rounded-full p-1.5 opacity-0 group-hover/contact:opacity-100 transition-opacity shadow-md z-30">
            <Edit3 className="h-3.5 w-3.5" />
          </span>

          <div className="flex-1 space-y-6">
            <h3 className="text-2xl font-black text-secondary uppercase tracking-tight mb-2">Get In Touch</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-secondary/80">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Call Us</p>
                  <p className="text-sm font-semibold">{contactData.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-secondary/80">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Email Us</p>
                  <p className="text-sm font-semibold">{contactData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-secondary/80">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Find Us</p>
                  <p className="text-sm font-semibold">{contactData.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-px h-px md:h-32 bg-gray-200" />

          <div className="flex-1 space-y-4">
            <h4 className="text-lg font-bold text-secondary flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" /> Store Hours
            </h4>
            <p className="text-xs sm:text-sm text-secondary/70 leading-relaxed whitespace-pre-line">
              {contactData.hours.replace(/\|/g, "\n")}
            </p>
          </div>

        </div>
      </div>

      {/* EDIT MODAL */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100">
            
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">Update Contact Details</h3>
              <button onClick={() => setActiveModal(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="text" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
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

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Street Address</label>
                <input 
                  type="text" 
                  value={address} 
                  onChange={e => setAddress(e.target.value)} 
                  required 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Working Hours (Use | for new line)</label>
                <input 
                  type="text" 
                  value={hours} 
                  onChange={e => setHours(e.target.value)} 
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
