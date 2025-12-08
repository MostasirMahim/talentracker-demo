
import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useCatalog = create(
  persist(
    (set, get) => ({
      catalog: {},

      setCatalog: (catalog) => set({ catalog }),

      getCatalog: () => get().catalog,

      clearCatalog: () => set({ catalog: {} }),

    }),
    {
      name: "catalog-storage", 
    }
  )
);
//
export const useCatalogDetail = create(
  persist(
    (set, get) => ({
      catalogDetail: {},

      // Set detail
      setCatalogDetail: (detail) => set({ catalogDetail: detail }),

      // Get detail
      getCatalogDetail: () => get().catalogDetail,

      // Clear detail
      clearCatalogDetail: () => set({ catalogDetail: {} }),
    }),
    {
      name: "catalog-detail-storage", 
    }
  )
);
