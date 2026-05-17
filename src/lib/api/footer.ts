const API_URL = process.env.BACKEND_URL;

export const footerApi = {
  get: async () => {
    const res = await fetch(`${API_URL}/footers`);
    if (!res.ok) {
      if (res.status === 404) return { data: null };
      throw new Error('Failed to fetch Footer');
    }
    return res.json();
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
