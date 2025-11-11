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

export const useJobCategory = create((set, get) => ({
  category: {},

  // Setter
  setCategory: (category) => set({ category: category }),

  // Getter
  getCategory: () => get().category,

  // Clear
  clearJobCategory: () => set({ category: {} }),
}));
