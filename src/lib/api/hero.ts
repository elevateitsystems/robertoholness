const API_URL = process.env.BACKEND_URL;

export const heroApi = {
  get: async () => {
    if (!API_URL) return { data: null };

    try {
      const res = await fetch(`${API_URL}/hero-section`);
      if (!res.ok) return { data: null };
      return res.json();
    } catch {
      return { data: null };
    }
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
