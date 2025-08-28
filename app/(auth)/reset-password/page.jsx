"use client";

import ResetPasswordForm from "@/components/auth/reset-password-form";
import VerifyEmailForm from "@/components/auth/verify-email-form";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import { useState } from "react";

export default function ResetPassword() {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && <ForgotPasswordForm setStep={setStep} />}
      {step === 2 && <VerifyEmailForm setStep={setStep} />}
      {step === 3 && <ResetPasswordForm setStep={setStep} />}
    </>
  );
}
