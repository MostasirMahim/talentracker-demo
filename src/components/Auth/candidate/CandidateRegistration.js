"use client";

import { useRegistrationStore } from "@/stores/regestration_steps_store";
import CandidateRegisterForm from "../CandidateRegisterForm";
import EmailInputForm from "../email-verification/EmailInputForm";
import OtpInputForm from "../email-verification/OtpInputForm";

export default function CandidateRegistration() {
  const { step } = useRegistrationStore();
  let content;

  if (step === 1) content = <EmailInputForm />;
  else if (step === 2) content = <OtpInputForm />;
  else if (step === 3) content = <CandidateRegisterForm />;
  else content = <>Invalid Step</>;

  return content;
}
