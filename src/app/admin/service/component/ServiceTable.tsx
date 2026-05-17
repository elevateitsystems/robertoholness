"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface ServiceTableProps {
  services: any[];
  loading: boolean;
  handleOpenForm: (service?: any) => void;
  handleDelete: (id: string) => void;
}

export function ServiceTable({
  services,
  loading,
  handleOpenForm,
  handleDelete,
}: ServiceTableProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Services List</h2>
        <Button onClick={() => handleOpenForm()}>+ Add Service</Button>
      </div>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="border border-gray-200 rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services.map(s => (
                <tr key={s.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{s.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-505">{s.slug}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-505">{s.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleOpenForm(s)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                    <button onClick={() => handleDelete(s.id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr><td colSpan={4} className="px-6 py-4 text-center text-gray-500">No services found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
