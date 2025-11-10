import { create } from "zustand";

export const useRegistrationStore = create((set) => ({
  step: 1,
  email: "",
  otp: "",
  userType: "",
  password: "",

  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),

  setEmail: (email) => set({ email }),
  setOtp: (otp) => set({ otp }),
  setPassword: (password) => set({ password }),
  setUserType: (userType) => set({ userType }),

  reset: () =>
    set({
      step: 1,
      email: "",
      otp: "",
      password: "",
      userType: "",
    }),
}));
