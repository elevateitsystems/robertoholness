"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { servicesApi } from "@/lib/api/services";
import { useAppStore } from "@/lib/store";
import { Modal } from "@/components/admin/Modal";
import { ServiceTable } from "./ServiceTable";
import { ServiceModalContent } from "./ServiceModalContent";

export default function AdminServicePageClient() {
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
        <ServiceTable
          services={services}
          loading={loading}
          handleOpenForm={handleOpenForm}
          handleDelete={handleDelete}
        />
        
        {/* Form Modal */}
        <Modal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          title={`${editingId ? "Edit" : "Add"} Service`}
          onSubmit={handleSubmit}
          submitText="Save"
        >
          <ServiceModalContent
            title={title}
            setTitle={setTitle}
            slug={slug}
            setSlug={setSlug}
            description={description}
            setDescription={setDescription}
            status={status}
            setStatus={setStatus}
            setImage={setImage}
          />
        </Modal>
      </div>
    </div>
  );
}
