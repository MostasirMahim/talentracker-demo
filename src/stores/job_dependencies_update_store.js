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

export const useJobType = create((set, get) => ({
  job_type: {},

  // Setter
  setJobType: (job_type) => set({ job_type: job_type }),

  // Getter
  getJobType: () => get().job_type,

  // Clear
  clearJobType: () => set({ job_type: {} }),
}));
