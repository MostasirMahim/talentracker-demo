"use client";

import { useRegistrationStore } from "@/stores/regestration_steps_store";
import OtpInputForm from "../email-verification/OtpInputForm";
import TrainerRegisterForm from "../TrainerRegisterForm";
import EmailInputFormTrainer from "../email-verification/EmailInputFormTrainer";

export default function TrainerRegistration() {
  const { step } = useRegistrationStore();
  let content;

  if (step === 1) content = <EmailInputFormTrainer />;
  else if (step === 2) content = <OtpInputForm />;
  else if (step === 3) content = <TrainerRegisterForm />;
  else content = <>Invalid Step</>;

  return content;
}
