import { create } from "zustand"

export const useTheme = create((set) => ({
  theme: "light",
  setTheme: (newTheme) => set({ theme: newTheme }),
}))
