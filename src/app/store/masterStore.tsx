import { create } from "zustand";
import { masterService } from "../services/master_apis";

interface MasterData {
  blood_group: Record<string, string>;
  marital_status: Record<string, string>;
  religion: Record<string, string>;
  caste: Record<string, string>;
  relation_type: Record<string, string>;
  gender: Record<string, string>;
  salutation: Record<string, string>;
}

interface MasterStore {
  data: MasterData | null;
  loading: boolean;
  fetchMasterData: () => Promise<void>;
}

export const useMasterStore = create<MasterStore>((set) => ({
  data: null,
  loading: false,

  fetchMasterData: async () => {
    set({ loading: true });
    try {
      const response = await masterService.fetchMasterData();
      set({ data: response });
    } catch (error) {
      console.error("Failed to fetch master data:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
