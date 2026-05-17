"use client";

import React from "react";
import { Upload } from "lucide-react";
import Image from "next/image";

interface HeaderModalContentProps {
  activeModal: "logo" | "info" | "promo" | null;
  logoPreview: string | null;
  handleLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  contactNumber: string;
  setContactNumber: (val: string) => void;
  timeLine: string;
  setTimeLine: (val: string) => void;
  deliveryOffer: string;
  setDeliveryOffer: (val: string) => void;
}

export function HeaderModalContent({
  activeModal,
  logoPreview,
  handleLogoChange,
  contactNumber,
  setContactNumber,
  timeLine,
  setTimeLine,
  deliveryOffer,
  setDeliveryOffer,
}: HeaderModalContentProps) {
  if (activeModal === "logo") {
    return (
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-700">
          Logo Image File
        </label>
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors bg-gray-50/50">
          {logoPreview ? (
            <div className="mb-4 relative">
              <Image
                src={logoPreview}
                alt="Preview"
                width={100}
                height={100}
                className="h-20 w-auto object-contain"
              />
            </div>
          ) : (
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
          )}
          <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Choose Logo File
            <input
              type="file"
              onChange={handleLogoChange}
              className="hidden"
              accept="image/*"
            />
          </label>
          <p className="text-xs text-gray-400 mt-2">
            PNG, JPG or SVG formats
          </p>
        </div>
      </div>
    );
  }

  if (activeModal === "info") {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Contact Number
          </label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Store Hours Timeline
          </label>
          <input
            type="text"
            value={timeLine}
            onChange={(e) => setTimeLine(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all"
          />
        </div>
      </div>
    );
  }

  if (activeModal === "promo") {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Delivery Offer banner Text
          </label>
          <textarea
            value={deliveryOffer}
            onChange={(e) => setDeliveryOffer(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all"
          />
          <p className="text-xs text-gray-500 mt-1">Note: The pet paw icon (🐾) is static and will be automatically displayed beside your promotional text.</p>
        </div>
      </div>
    );
  }

  return null;
}
