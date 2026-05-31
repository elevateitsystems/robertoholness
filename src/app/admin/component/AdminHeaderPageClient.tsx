"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { navBarApi } from "@/lib/api/navBar";
import { useAppStore } from "@/lib/store";
import { Skeleton } from "@/components/admin/Skeleton";
import { Modal } from "@/components/admin/Modal";
import { HeaderPreview } from "./HeaderPreview";
import { HeaderModalContent } from "./HeaderModalContent";

export default function AdminHeaderPageClient() {
  const user = useAppStore((state: any) => state.user);

  // Database States
  const [navBarData, setNavBarData] = useState<any>({
    contactNumber: "505-990-0099",
    timeLine: "Mon-Fri: 9am-7pm | Sat: 9am-6pm | Sun: 10am-6pm",
    deliveryOffer: "🐾 Free delivery on orders over $50!",
    navLogoUrl: "/assets/logo-without-bg.png",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Modal Editing States
  const [activeModal, setActiveModal] = useState<
    "logo" | "info" | "promo" | null
  >(null);

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
          navLogoUrl: res.data.navLogoUrl || "/assets/logo-without-bg.png",
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
      setDeliveryOffer(
        (navBarData.deliveryOffer || "").replace(/^[🐾\s]+/, ""),
      );
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
      formData.append("deliveryOffer", deliveryOffer.replace(/^[🐾\s]+/, ""));
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
          navLogoUrl: res.data.navLogoUrl || "/assets/logo-without-bg.png",
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

      <HeaderPreview
        navBarData={navBarData}
        openEditModal={openEditModal}
      />

      {/* EDIT MODAL */}
      <Modal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        title={
          activeModal === "logo"
            ? "Update Website Logo"
            : activeModal === "info"
            ? "Update Contact & Hours"
            : activeModal === "promo"
            ? "Update Delivery Offer banner"
            : ""
        }
        onSubmit={handleSubmit}
        isSaving={saving}
      >
        <HeaderModalContent
          activeModal={activeModal}
          logoPreview={logoPreview}
          handleLogoChange={handleLogoChange}
          contactNumber={contactNumber}
          setContactNumber={setContactNumber}
          timeLine={timeLine}
          setTimeLine={setTimeLine}
          deliveryOffer={deliveryOffer}
          setDeliveryOffer={setDeliveryOffer}
        />
      </Modal>
    </div>
  );
}
