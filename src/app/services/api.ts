import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth related API calls
export const authService = {
  login: async (
    identifier: string | undefined,
    password: string,
    method: string
  ) => {
    return api.post("/login", {
      identifier,
      password,
      method,
    });
  },

  verifyOtp: async (
    identifier: string | undefined,
    otp: string,
    method: string
  ) => {
    return api.post("/verify-otp", {
      identifier,
      otp,
      method,
    });
  },
};

export default api;
