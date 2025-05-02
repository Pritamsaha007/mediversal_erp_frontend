import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MASTER_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth related API calls
export const masterService = {
  async fetchMasterData() {
    const response = await api.get("/master-data");
    return response.data?.data;
  },
};

export default api;
