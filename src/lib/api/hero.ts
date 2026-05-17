const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api';

export const heroApi = {
  get: async () => {
    const res = await fetch(`${API_URL}/hero-section`);
    if (!res.ok) {
      if (res.status === 404) return { data: null };
      throw new Error('Failed to fetch HeroSection');
    }
    return res.json();
  },
  
  upsert: async (formData: FormData) => {
    const res = await fetch(`${API_URL}/hero-section`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to update HeroSection');
    return res.json();
  }
};
