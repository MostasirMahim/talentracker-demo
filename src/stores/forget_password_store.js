import { create } from "zustand";

export const useForgetPasswordStore = create((set) => ({
  step: 1,
  email: "",
  token: "",
  userType: "",
  password: "",

  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),

  setEmail: (email) => set({ email }),
  setToken: (token) => set({ token }),
  setPassword: (password) => set({ password }),
  setUserType: (userType) => set({ userType }),

  reset: () =>
    set({
      step: 1,
      email: "",
      token: "",
      password: "",
      userType: "",
    }),
}));
