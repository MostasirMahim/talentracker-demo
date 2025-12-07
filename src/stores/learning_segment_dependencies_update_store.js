import { create } from "zustand";

export const useLearningSegmentCategoryStore = create((set, get) => ({
  data: {},

  // Setter
  setCategory: (category) => set({ data: category }),

  // Getter
  getCategory: () => get().data,

  // Clear
  clear: () => set({ data: {} }),
}));
