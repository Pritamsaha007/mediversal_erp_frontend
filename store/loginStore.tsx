import { create } from "zustand";

interface AuthState {
  email?: string;
  phoneNo?: number;
  password: string;
  method: "email" | "phone" | "";
  setLoginDetails: (
    email?: string,
    phoneNo?: number,
    password?: string,
    method?: "email" | "phone" | ""
  ) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: "",
  phoneNo: undefined,
  password: "",
  method: "",
  setLoginDetails: (email, phoneNo, password = "", method = "") =>
    set({
      email: email ?? "",
      phoneNo: phoneNo ?? undefined,
      password,
      method,
    }),
}));
