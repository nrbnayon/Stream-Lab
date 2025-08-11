"use client";

import ResetPasswordForm from "@/components/auth/reset-password-form";
import VerifyEmailForm from "@/components/auth/verify-email-form";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import { useState } from "react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    //
    setStep(2);
  };

  const handleCodeVerify = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const otp = formData.get("otp");
    if (!otp || otp.length < 6) {
      toast.error("Please enter your OTP.");
      return;
    }
    //
    setStep(3);
  };

  const handlePasswordSet = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");
    if (!password || !confirmPassword) {
      toast.error("Both password and confirm password field is required.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password didn't match!");
      return;
    }
    //
    toast.info("Now login with your new password.");
    redirect("signin");
  };
  return (
    <>
      {step === 1 && <ForgotPasswordForm handleSubmit={handleEmailSubmit} />}
      {step === 2 && (
        <VerifyEmailForm handleSubmit={handleCodeVerify} setStep={setStep} />
      )}
      {step === 3 && (
        <ResetPasswordForm handleSubmit={handlePasswordSet} setStep={setStep} />
      )}
    </>
  );
}
