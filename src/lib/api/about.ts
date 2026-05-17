const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api';

export const aboutApi = {
  get: async () => {
    const res = await fetch(`${API_URL}/about-us`);
    if (!res.ok) {
      if (res.status === 404) return { data: null };
      throw new Error('Failed to fetch AboutUs');
    }
    return res.json();
  },
  
  upsert: async (formData: FormData) => {
    const res = await fetch(`${API_URL}/about-us`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to update AboutUs');
    return res.json();
  }
};
