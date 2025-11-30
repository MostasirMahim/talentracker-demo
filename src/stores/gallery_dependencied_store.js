import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useGalleryCategory = create((set, get) => ({
  category: {},

  setGalleryCategory: (category) => set({ category }),

  getGalleryCategory: () => get().category,

  clearGalleryCategory: () => set({ category: {} }),
}));

export const useGallery = create(
  persist(
    (set, get) => ({
      gallery: {},

      setGallery: (gallery) => set({ gallery }),

      getGallery: () => get().gallery,

      clearGallery: () => set({ gallery: {} }),
    }),
    {
      name: "gallery-storage", // localStorage key name
    }
  )
);
//
