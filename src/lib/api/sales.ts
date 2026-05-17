const API_URL = process.env.BACKEND_URL;

export const salesApi = {
  get: async () => {
    const res = await fetch(`${API_URL}/sales-section`);
    if (!res.ok) {
      if (res.status === 404) return { data: null };
      throw new Error('Failed to fetch SalesSection');
    }
    return res.json();
  },
  
  upsert: async (formData: FormData) => {
    const res = await fetch(`${API_URL}/sales-section`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to update SalesSection');
    return res.json();
  }
};
