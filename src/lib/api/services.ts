const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL; // match auth backend port 3030

export const servicesApi = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/services`);
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  },
  
  create: async (formData: FormData) => {
    const res = await fetch(`${API_URL}/services`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to create service');
    return res.json();
  },

  update: async (id: string, formData: FormData) => {
    const res = await fetch(`${API_URL}/services/${id}`, {
      method: 'PATCH',
      body: formData,
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to update service');
    return res.json();
  },

  delete: async (id: string) => {
    const res = await fetch(`${API_URL}/services/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to delete service');
    return res.json();
  }
};
