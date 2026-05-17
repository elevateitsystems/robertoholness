import React from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";

export default function AdminGalleryPage() {
  return (
    <div>
      <PageHeader 
        title="Manage Gallery" 
        description="Update Gallery banner and upload images."
        action={<Button>Save Banner</Button>}
      />
      <div className="space-y-6">
        {/* Banner Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Banner Section</h2>
          {/* Form fields */}
          <p className="text-sm text-gray-500">Title, Description.</p>
        </div>

        {/* Gallery Image Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Gallery Images</h2>
            <Button variant="outline">+ Upload Image</Button>
          </div>
          {/* Gallery grid placeholder */}
          <p className="text-sm text-gray-500">Image Grid with Upload, Title, Category controls will be here.</p>
        </div>
      </div>
    </div>
  );
}
