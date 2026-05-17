"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Loader2, CheckCircle2 } from "lucide-react";
import { blogApi } from "@/lib/api/blog";
import { useAppStore } from "@/lib/store";
import { Skeleton } from "@/components/admin/Skeleton";
import { Modal } from "@/components/admin/Modal";

export default function AdminBlogCategoriesPage() {

  const user = useAppStore((state: any) => state.user);

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await blogApi.getCategories();
      setCategories(res.data?.items || res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = (category: any = null) => {
    if (!user) return alert("Please login first to manage categories");
    if (category) {
      setEditingId(category.id);
      setName(category.name);
    } else {
      setEditingId(null);
      setName("");
    }
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !name) return alert("Invalid form inputs");

    setSaving(true);
    try {
      if (editingId) {
        await blogApi.updateCategory(editingId, { name });
      } else {
        await blogApi.createCategory({ name });
      }
      setIsFormOpen(false);
      fetchCategories();
    } catch (e) {
      console.error(e);
      alert("Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) return alert("Unauthorized");
    if (!confirm("Are you sure? This will delete all posts associated with this category.")) return;

    try {
      await blogApi.deleteCategory(id);
      fetchCategories();
    } catch (e) {
      console.error(e);
      alert("Failed to delete category");
    }
  };

  if (loading) {
    return <Skeleton type="table" />;
  }

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Manage Blog Categories" 
        description="Configure specific categories (e.g. Pet Care, Nutritional Counseling, Store Deals) to group your articles."
        action={
          <Button onClick={() => handleOpenForm()} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 rounded-lg">
            <Plus className="h-4 w-4" /> Add Category
          </Button>
        }
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Category Name</th>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 text-gray-700">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-950">{c.name}</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-400">{c.id}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button onClick={() => handleOpenForm(c)} variant="outline" size="sm" className="rounded-lg border-gray-300">
                      <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                    </Button>
                    <Button onClick={() => handleDelete(c.id)} variant="outline" size="sm" className="rounded-lg border-red-200 text-red-600 hover:bg-red-50">
                      <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-400">
                    No blog categories configured yet. Click 'Add Category' to begin!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FORM MODAL */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={`${editingId ? "Edit" : "Add"} Category`}
        onSubmit={handleSubmit}
        isSaving={saving}
        submitText="Save Category"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Category Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
            />
          </div>
        </div>
      </Modal>

    </div>
  );
}
