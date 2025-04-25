import { create } from "zustand";
import { AuthState } from "../types";

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
