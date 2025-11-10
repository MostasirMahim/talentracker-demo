import { create } from "zustand";

export const useJobLocation = create((set, get) => ({
  locationObj: {},

  // Setter
  setLocation: (location) => set({ locationObj: location }),

  // Getter
  getLocation: () => get().locationObj,

  // Clear
  clearLocation: () => set({ locationObj: {} }),
}));
