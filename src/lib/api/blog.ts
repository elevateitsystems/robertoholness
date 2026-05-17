const API_URL = process.env.BACKEND_URL;

export const blogApi = {
  // Categories
  getCategories: async () => {
    const res = await fetch(`${API_URL}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },
  createCategory: async (data: { name: string }) => {
    const res = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to create category');
    return res.json();
  },
  updateCategory: async (id: string, data: { name: string }) => {
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to update category');
    return res.json();
  },
  deleteCategory: async (id: string) => {
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to delete category');
    return res.json();
  },

  // Articles (Blog Posts)
  getPosts: async () => {
    const res = await fetch(`${API_URL}/articles`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
  },
  createPost: async (formData: FormData) => {
    const res = await fetch(`${API_URL}/articles`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to create post');
    return res.json();
  },
  updatePost: async (id: string, formData: FormData) => {
    const res = await fetch(`${API_URL}/articles/${id}`, {
      method: 'PATCH',
      body: formData,
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to update post');
    return res.json();
  },
  deletePost: async (id: string) => {
    const res = await fetch(`${API_URL}/articles/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to delete post');
    return res.json();
  }
};
