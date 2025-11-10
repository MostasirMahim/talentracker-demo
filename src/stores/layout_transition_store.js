import { create } from "zustand";

export const useLayoutTransitionStore = create((set) => ({
    layoutTransition: false,
    setLayoutTransitionOn: () => set({ layoutTransition : true }),
    setLayoutTransitionOff: () => set({ layoutTransition : false }),
}));