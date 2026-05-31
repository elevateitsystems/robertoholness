const API_URL = process.env.BACKEND_URL;

export const navBarApi = {
  get: async () => {
    if (!API_URL) return { data: null };

    try {
      const res = await fetch(`${API_URL}/navBars`);
      if (!res.ok) return { data: null };
      return res.json();
    } catch {
      return { data: null };
    }
  },
  
  upsert: async (formData: FormData) => {
    const res = await fetch(`${API_URL}/navBars`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to update NavBar');
    return res.json();
  }
};
