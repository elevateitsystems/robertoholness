import React from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";

export default function AdminContactPage() {
  return (
    <div>
      <PageHeader 
        title="Manage Contact Page" 
        description="Update Contact banner and store information."
        action={<Button>Save Changes</Button>}
      />
      <div className="space-y-6">
        {/* Banner Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Banner Section</h2>
          <p className="text-sm text-gray-500">Title, Description.</p>
        </div>

        {/* Contact Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Google Map iframe URL</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="<iframe src='...' ></iframe>" />
            </div>
          </div>
          
          <div className="mt-6">
             <h3 className="text-md font-medium text-gray-900 mb-2">Store Hours</h3>
             <p className="text-sm text-gray-500">Dynamic list of store hours here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
