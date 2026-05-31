const API_URL = process.env.BACKEND_URL;

export const footerApi = {
  get: async () => {
    if (!API_URL) return { data: null };

    try {
      const res = await fetch(`${API_URL}/footers`);
      if (!res.ok) return { data: null };
      return res.json();
    } catch {
      return { data: null };
    }
  },
  
  upsert: async (formData: FormData) => {
    const res = await fetch(`${API_URL}/footers`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to update Footer');
    return res.json();
  }
};
