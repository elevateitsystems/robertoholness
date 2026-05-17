import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  username?: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  role: string;
  status: string;
  avatar?: { url: string };
}

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  theme: 'light',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));
