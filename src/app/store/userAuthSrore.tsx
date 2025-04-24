import { create } from "zustand";
import { persist } from "zustand/middleware";
// Define the full type
interface AuthState {
  email: string;
  phoneNo?: string;
  password: string;
  method: string;
  token: string | null;
  isAuthenticated: boolean;
  setLoginDetails: (
    email: string,
    phoneNo?: string,
    password?: string,
    method?: string
  ) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
}
// Zustand store with persist to keep auth across refreshes
export const useUserAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: "",
      phoneNo: undefined,
      password: "",
      method: "",
      token: null,
      isAuthenticated: false,
      setLoginDetails: (email, phoneNo, password = "", method = "") =>
        set({
          email: email ?? "",
          phoneNo: phoneNo ?? undefined,
          password,
          method,
        }),
      setToken: (token) =>
        set({
          token,
          isAuthenticated: true,
        }),
      clearAuth: () =>
        set({
          email: "",
          phoneNo: undefined,
          password: "",
          method: "",
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);
