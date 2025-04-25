import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/index";

interface UserAuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

export const useUserAuthStore = create<UserAuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setToken: (token) =>
        set({
          token,
          isAuthenticated: true,
        }),
      setUser: (user) =>
        set({
          user,
        }),
      clearAuth: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);
