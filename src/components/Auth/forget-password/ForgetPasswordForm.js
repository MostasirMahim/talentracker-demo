"use client";

import ForgetIdEmail from "./ForgetIdEmail";
import ForgetOtp from "./ForgetOtp";
import ResetPassword from "./ResetPassword";
import { useForgetPasswordStore } from "@/stores/forget_password_store";

export default function ForgetPasswordForm() {
  const { step } = useForgetPasswordStore();
  let content;

  if (step === 1) content = <ForgetIdEmail />;
  else if (step === 2) content = <ForgetOtp />;
  else if (step === 3) content = <ResetPassword />;
  else content = <>Invalid Step</>;

  return content;
}
