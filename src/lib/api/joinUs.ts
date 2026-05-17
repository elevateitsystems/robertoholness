const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const joinUsApi = {
  get: async () => {
    const res = await fetch(`${API_URL}/joinUss`);
    if (!res.ok) {
      if (res.status === 404) return { data: null };
      throw new Error('Failed to fetch JoinUs');
    }
    return res.json();
  },
  
  upsert: async (data: { title: string; description: string; status?: string }) => {
    const res = await fetch(`${API_URL}/joinUss`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to update JoinUs');
    return res.json();
  },

  addImage: async (joinUsId: string, formData: FormData) => {
    const res = await fetch(`${API_URL}/joinUss/${joinUsId}/images`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to add JoinUs image');
    return res.json();
  },

  updateImage: async (imageId: string, formData: FormData) => {
    const res = await fetch(`${API_URL}/joinUss/images/${imageId}`, {
      method: 'PATCH',
      body: formData,
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to update JoinUs image');
    return res.json();
  },

  deleteImage: async (imageId: string) => {
    const res = await fetch(`${API_URL}/joinUss/images/${imageId}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to delete JoinUs image');
    return res.json();
  }
};
