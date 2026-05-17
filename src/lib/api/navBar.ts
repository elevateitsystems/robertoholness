const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api';

export const navBarApi = {
  get: async () => {
    const res = await fetch(`${API_URL}/navBars`);
    if (!res.ok) {
      if (res.status === 404) return { data: null };
      throw new Error('Failed to fetch NavBar');
    }
    return res.json();
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
