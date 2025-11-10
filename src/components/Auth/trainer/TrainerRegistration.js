"use client";

import { useRegistrationStore } from "@/stores/regestration_steps_store";
import EmailInputForm from "../email-verification/EmailInputForm";
import OtpInputForm from "../email-verification/OtpInputForm";
import TrainerRegisterForm from "../TrainerRegisterForm";

export default function TrainerRegistration() {
  const { step } = useRegistrationStore();
  let content;

  if (step === 1) content = <EmailInputForm />;
  else if (step === 2) content = <OtpInputForm />;
  else if (step === 3) content = <TrainerRegisterForm />;
  else content = <>Invalid Step</>;

  return content;
}
