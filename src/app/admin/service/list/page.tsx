"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { servicesApi } from "@/lib/api/services";
import { useAppStore } from "@/lib/store";
import { Skeleton } from "@/components/admin/Skeleton";

export default function AdminServiceListPage() {

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
    if (!user) return alert("Please login first to modify services");
    if (service) {
      setEditingId(service.id);
      setTitle(service.title);
      setSlug(service.slug);
      setDescription(service.description || "");
      setStatus(service.status);
      setImagePreview(service.imageUrl || null);
    } else {
      setEditingId(null);
      setTitle("");
      setSlug("");
      setDescription("");
      setStatus("active");
      setImage(null);
      setImagePreview(null);
    }
    setIsFormOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Unauthorized");
    
    setSaving(true);
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
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) return alert("Unauthorized");
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await servicesApi.delete(id);
      fetchServices();
    } catch (e) {
      console.error(e);
      alert("Failed to delete service");
    }
  };

  if (loading) {
    return <Skeleton type="table" />;
  }

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Manage Service Offerings" 
        description="Add, edit, or remove services that are displayed in your website's Services grid."
        action={
          <Button onClick={() => handleOpenForm()} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 rounded-lg">
            <Plus className="h-4 w-4" /> Add New Service
          </Button>
        }
      />

      {/* Services List Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Slug</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 text-gray-700">
                {services.map(s => (
                  <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      {s.imageUrl ? (
                        <img src={s.imageUrl} alt={s.title} className="h-10 w-10 object-cover rounded-md border border-gray-200" />
                      ) : (
                        <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 border border-gray-200">
                          🐾
                        </div>
                      )}
                      <div>
                        <span className="font-bold text-gray-950 block">{s.title}</span>
                        <span className="text-xs text-gray-500 line-clamp-1 max-w-sm">{s.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">{s.slug}</td>
                    <td className="px-6 py-4">
                      {s.status === "active" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="h-3 w-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <AlertCircle className="h-3 w-3" /> Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button onClick={() => handleOpenForm(s)} variant="outline" size="sm" className="rounded-lg border-gray-300">
                        <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                      </Button>
                      <Button onClick={() => handleDelete(s.id)} variant="outline" size="sm" className="rounded-lg border-red-200 text-red-600 hover:bg-red-50">
                        <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {services.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                      No services configured. Click 'Add New Service' to begin!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* FORM MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100">
            
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">{editingId ? "Edit" : "Add"} Service Offering</h3>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Service Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={e => {
                    setTitle(e.target.value);
                    if (!editingId) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                  }} 
                  required 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">URL Slug</label>
                <input 
                  type="text" 
                  value={slug} 
                  onChange={e => setSlug(e.target.value)} 
                  required 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Service Description</label>
                <textarea 
                  value={description} 
                  onChange={e => setDescription(e.target.value)} 
                  rows={4} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                  <select 
                    value={status} 
                    onChange={e => setStatus(e.target.value)} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white"
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Service Image</label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50/50">
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="h-20 w-auto object-contain mb-3 rounded" />
                  )}
                  <label className="cursor-pointer bg-white px-4 py-1.5 border border-gray-300 rounded-md shadow-sm text-xs font-semibold hover:bg-gray-50 flex items-center gap-2">
                    Select File
                    <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button type="button" onClick={() => setIsFormOpen(false)} variant="outline">Cancel</Button>
                <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {saving ? "Saving..." : "Save Service"}
                </Button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
