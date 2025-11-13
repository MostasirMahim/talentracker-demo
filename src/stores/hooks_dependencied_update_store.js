import { create } from "zustand";
import { persist } from "zustand/middleware";

// Hooks State
export const useHook = create(
  persist(
    (set, get) => ({
      hook: {},

      // Set hook data
      setHook: (hook) => {
        if (hook && typeof hook === "object") {
          set({ hook });
        } else {
          console.warn("Invalid hook data provided to setHook");
        }
      },

      // Get hook data
      getHook: () => get().hook,

      // Clear hook data
      clearHook: () => set({ hook: {} }),

      // Check if hook exists in store
      hasHook: () => {
        const hook = get().hook;
        return hook && Object.keys(hook).length > 0;
      },

      // Get specific hook field
      getHookField: (fieldName) => {
        const hook = get().hook;
        return hook ? hook[fieldName] : null;
      },
    }),
    {
      name: "hooks-storage", // localStorage key name
      partialize: (state) => ({ hook: state.hook }),
    }
  )
);
