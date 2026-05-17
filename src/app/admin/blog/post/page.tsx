"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Loader2, Upload } from "lucide-react";
import { blogApi } from "@/lib/api/blog";
import { useAppStore } from "@/lib/store";
import { Skeleton } from "@/components/admin/Skeleton";
import { Modal } from "@/components/admin/Modal";

export default function AdminBlogPostPage() {

  const user = useAppStore((state: any) => state.user);

  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [pRes, cRes] = await Promise.all([
        blogApi.getPosts(),
        blogApi.getCategories()
      ]);
      setPosts(pRes.data?.items || pRes.data || []);
      const cats = cRes.data?.items || cRes.data || [];
      setCategories(cats);
    } catch (e) {
      console.error("Failed to load blog posts / categories:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = (post: any = null) => {
    if (!user) return alert("Please login first to manage blog posts");
    if (categories.length === 0) return alert("Please create a Category first under 'Categories'!");

    if (post) {
      setEditingId(post.id);
      setTitle(post.title);
      setDescription(post.description || "");
      setCategoryId(post.categoryId || "");
      setImagePreview(post.imageUrl || null);
      setImage(null);
    } else {
      setEditingId(null);
      setTitle("");
      setDescription("");
      setCategoryId(categories[0]?.id || "");
      setImagePreview(null);
      setImage(null);
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
    if (!user || !title || !description || !categoryId) return alert("Invalid form inputs");

    setSaving(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    if (image) formData.append("image", image);

    try {
      if (editingId) {
        await blogApi.updatePost(editingId, formData);
      } else {
        await blogApi.createPost(formData);
      }
      setIsFormOpen(false);
      fetchData();
    } catch (e) {
      console.error(e);
      alert("Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) return alert("Unauthorized");
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      await blogApi.deletePost(id);
      fetchData();
    } catch (e) {
      console.error(e);
      alert("Failed to delete post");
    }
  };

  if (loading) {
    return <Skeleton type="table" />;
  }

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Manage Blog Posts" 
        description="Write and publish educational articles, announcements, and guides for your pet shop audience."
        action={
          <Button onClick={() => handleOpenForm()} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 rounded-lg">
            <Plus className="h-4 w-4" /> Add Blog Post
          </Button>
        }
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Article</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 text-gray-700">
              {posts.map((p) => {
                const category = categories.find(c => c.id === p.categoryId);
                return (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.title} className="h-10 w-10 object-cover rounded border border-gray-200" />
                      ) : (
                        <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center text-gray-400 border border-gray-200">
                          📰
                        </div>
                      )}
                      <div>
                        <span className="font-bold text-gray-950 block">{p.title}</span>
                        <span className="text-xs text-gray-500 line-clamp-1 max-w-sm">{p.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-xs border border-blue-150">
                        {category ? category.name : "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button onClick={() => handleOpenForm(p)} variant="outline" size="sm" className="rounded-lg border-gray-300">
                        <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                      </Button>
                      <Button onClick={() => handleDelete(p.id)} variant="outline" size="sm" className="rounded-lg border-red-200 text-red-600 hover:bg-red-50">
                        <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-400">
                    No blog posts written yet. Click 'Add Blog Post' to write your first article!
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
        title={`${editingId ? "Edit" : "Add"} Blog Post`}
        onSubmit={handleSubmit}
        isSaving={saving}
        submitText="Save Post"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Article Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Blog Category</label>
            <select 
              value={categoryId} 
              onChange={e => setCategoryId(e.target.value)} 
              required 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description / Content</label>
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              rows={6} 
              required 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Cover Image</label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50/50 hover:border-blue-500 transition-colors">
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="h-20 w-auto object-contain mb-3 rounded" />
              )}
              <label className="cursor-pointer bg-white px-4 py-1.5 border border-gray-300 rounded-md shadow-sm text-xs font-semibold hover:bg-gray-50 flex items-center gap-2">
                Select File
                <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
              </label>
            </div>
          </div>
        </div>
      </Modal>

    </div>
  );
}
