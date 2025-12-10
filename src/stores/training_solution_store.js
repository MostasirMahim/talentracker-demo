
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

export const useTrainingDetail = create(
  persist(
    (set, get) => ({
      trainingDetail: {},

      // Set detail
      setTrainingDetail: (detail) => set({ trainingDetail: detail }),

      // Get detail
      getTrainingDetail: () => get().trainingDetail,

      // Clear detail
      clearTrainingDetail: () => set({ trainingDetail: {} }),
    }),
    {
      name: "training-detail-storage", 
    }
  )
);
