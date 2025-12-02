import { create } from "zustand";

export const useExpertTrainerProfile = create((set, get) => ({
  data: {},

  // Setter
  setProfile: (profile) => set({ data: profile }),

  // Getter
  getProfile: () => get().data,

  // Clear
  clear: () => set({ data: {} }),
}));
