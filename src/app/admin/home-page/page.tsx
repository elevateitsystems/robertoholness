import React from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";

export default function AdminHomePage() {
  return (
    <div>
      <PageHeader 
        title="Manage Home Page" 
        description="Edit Hero, About, Sales, and Instagram sections."
        action={<Button>Save Changes</Button>}
      />
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Hero Section</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            {/* Background Image logic here */}
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">About Section</h2>
          {/* Form fields for About Section */}
          <p className="text-sm text-gray-500">Title, Description (Rich Text), Quote, Quote Author, Subtitle, Image Upload.</p>
        </div>

        {/* Sales Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Sales Section</h2>
          {/* Form fields for Sales Section */}
          <p className="text-sm text-gray-500">Title, Subtitle, Description.</p>
        </div>

        {/* Join Us on Instagram */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Join Us on Instagram</h2>
          {/* Form fields for Instagram */}
          <p className="text-sm text-gray-500">Section title, Section description, Instagram link, Gallery images upload.</p>
        </div>
      </div>
    </div>
  );
}
