const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const galleryApi = {
  get: async () => {
    const res = await fetch(`${API_URL}/gallery`);
    if (!res.ok) {
      if (res.status === 404) return { data: null };
      throw new Error('Failed to fetch Gallery');
    }
    return res.json();
  },
  
  upsert: async (data: any) => {
    const res = await fetch(`${API_URL}/gallery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to update Gallery');
    return res.json();
  },
  
  addImage: async (galleryId: string, formData: FormData) => {
    const res = await fetch(`${API_URL}/gallery/${galleryId}/images`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to add image');
    return res.json();
  },

  updateImage: async (imageId: string, formData: FormData) => {
    const res = await fetch(`${API_URL}/gallery/images/${imageId}`, {
      method: 'PATCH',
      body: formData,
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to update image');
    return res.json();
  },

  deleteImage: async (imageId: string) => {
    const res = await fetch(`${API_URL}/gallery/images/${imageId}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to delete image');
    return res.json();
  }
};
