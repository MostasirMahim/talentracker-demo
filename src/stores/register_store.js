import { create } from "zustand";

// ---------------- Forget Password Store ----------------
export const useForgetPassStore = create((set, get) => ({
  email: "",
  otp: "",
  token: "",

  setEmail: (email) => set({ email }),
  setOtp: (otp) => set({ otp }),
  setToken: (token) => set({ token }),

  reset: () =>
    set({
      email: "",
      otp: "",
      token: "",
    }),
}));

// ---------------- Registration Store ----------------
export const useRegUserStore = create((set, get) => ({
  email: "",
  isOtpPass: false,

  setEmail: (email) => set({ email }),
  setOtpPass: (otp) => set({ isOtpPass: otp }),

  reset: () =>
    set({
      email: "",
      isOtpPass: false,
    }),
}));


