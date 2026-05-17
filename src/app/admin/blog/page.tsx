import React from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";

export default function AdminBlogPage() {
  return (
    <div>
      <PageHeader 
        title="Manage Blog" 
        description="Update Blog banner, manage categories, and write posts."
        action={<Button>Save Banner</Button>}
      />
      <div className="space-y-6">
        {/* Banner Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Banner Section</h2>
          <p className="text-sm text-gray-500">Title, Description.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Categories List */}
          <div className="bg-white shadow rounded-lg p-6 col-span-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Categories</h2>
              <Button variant="outline" size="sm">+ Add</Button>
            </div>
            <p className="text-sm text-gray-500">Category list here.</p>
          </div>

          {/* Posts List */}
          <div className="bg-white shadow rounded-lg p-6 col-span-1 md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Blog Posts</h2>
              <Button variant="outline" size="sm">+ Add Post</Button>
            </div>
            <p className="text-sm text-gray-500">Data table with posts, pagination, search, filter.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
