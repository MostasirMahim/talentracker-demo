import { create } from "zustand";
import { persist } from "zustand/middleware";

// Blog Category State
export const useBlogCategory = create((set, get) => ({
  category: {},

  // Setter
  setCategory: (category) => set({ category }),

  // Getter
  getCategory: () => get().category,

  // Clear
  clearCategory: () => set({ category: {} }),
}));

// Blog Tag State
export const useBlogTag = create((set, get) => ({
  tag: {},

  // Setter
  setTag: (tag) => set({ tag }),

  // Getter
  getTag: () => get().tag,

  // Clear
  clearTag: () => set({ tag: {} }),
}));

