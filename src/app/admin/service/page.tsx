"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { servicesApi } from "@/lib/api/services";
import { useAppStore } from "@/lib/store";

export default function AdminServicePage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [image, setImage] = useState<File | null>(null);

  const user = useAppStore((state: any) => state.user);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await servicesApi.getAll();
      setServices(res.data?.items || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = (service: any = null) => {
    if (service) {
      setEditingId(service.id);
      setTitle(service.title);
      setSlug(service.slug);
      setDescription(service.description || "");
      setStatus(service.status);
    } else {
      setEditingId(null);
      setTitle("");
      setSlug("");
      setDescription("");
      setStatus("active");
      setImage(null);
    }
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Unauthorized");
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("status", status);
    if (image) formData.append("image", image);

    try {
      if (editingId) {
        await servicesApi.update(editingId, formData);
      } else {
        await servicesApi.create(formData);
      }
      setIsFormOpen(false);
      fetchServices();
    } catch (e) {
      console.error(e);
      alert("Error saving service");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await servicesApi.delete(id);
      fetchServices();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <PageHeader 
        title="Manage Services" 
        description="Update Service Page banner and add/edit individual services."
      />
      <div className="space-y-6">
        {/* Service List & Add */}
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.slug}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.status}</td>
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
        
        {/* Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">{editingId ? "Edit" : "Add"} Service</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Slug</label>
                  <input type="text" value={slug} onChange={e => setSlug(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select value={status} onChange={e => setStatus(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3">
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image</label>
                  <input type="file" onChange={e => setImage(e.target.files?.[0] || null)} className="mt-1 block w-full" />
                </div>
                <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm">Save</button>
                  <button type="button" onClick={() => setIsFormOpen(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
