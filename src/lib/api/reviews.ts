import { API_URL } from "@/lib/api/config";

export const reviewsApi = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/reviews`);
    if (!res.ok) throw new Error("Failed to fetch reviews");
    return res.json();
  },

  create: async (data: { description: string; rating: number }) => {
    const res = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to create review");
    }
    return res.json();
  },
};
