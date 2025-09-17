"use client";
import { useState, useEffect } from "react";
import ResetPasswordForm from "@/components/auth/reset-password-form";
import VerifyEmailForm from "@/components/auth/verify-email-form";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";

export default function ResetPassword() {
  const [step, setStep] = useState(1);

  // Clear session storage when component mounts (fresh start)
  useEffect(() => {
    // Only clear if we're on step 1 (fresh start)
    if (step === 1) {
      sessionStorage.removeItem("resetUserId");
      sessionStorage.removeItem("resetUserEmail");
      sessionStorage.removeItem("resetSecretKey");
      sessionStorage.removeItem("otpTimerStart");
    }
  }, []);

  return (
    <>
      {step === 1 && <ForgotPasswordForm setStep={setStep} />}
      {step === 2 && <VerifyEmailForm setStep={setStep} />}
      {step === 3 && <ResetPasswordForm setStep={setStep} />}
    </>
  );
}
