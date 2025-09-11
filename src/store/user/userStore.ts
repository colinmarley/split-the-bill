import { create } from 'zustand';

interface User {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  providerId: string | null;
  uid: string | null;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  resetUserState: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  logout: () => set({ user: null }),
  resetUserState: () => set({ user: null, loading: false, error: null }),
}));
