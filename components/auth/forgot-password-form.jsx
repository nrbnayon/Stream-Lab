// components/auth/forgot-password-form.jsx
"use client";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons/index";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import InputField from "../input-field";
import { Button } from "../ui/button";
import { useState } from "react";
import { useForgotPasswordMutation } from "@/redux/store/api/authApi";
import { toast } from "sonner";

export default function ForgotPasswordForm({ setStep }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Email is required.");
      return;
    }

    try {
      const response = await forgotPassword({ email_address: email }).unwrap();

      if (response.status === "success") {
        setUserId(response.user_id);
        sessionStorage.setItem("resetUserId", response.user_id);
        sessionStorage.setItem("resetUserEmail", email);

        // Start timer
        const startTime = Date.now();
        sessionStorage.setItem("otpTimerStart", startTime.toString());

        toast.success(
          response?.message || "Check your email for verification code"
        );
        setStep(2);
      }
    } catch (err) {
      let errorMessage = "An error occurred. Please try again.";

      if (err.data && err.data.message) {
        errorMessage = err.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      toast.error(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleEmailSubmit}>
      <h2 className="flex gap-4 text-2xl items-center">
        <Link href="signin">
          <HugeiconsIcon
            icon={ArrowLeft02Icon}
            className="transition-transform hover:-translate-x-1"
          />
        </Link>
        Forgot Password
      </h2>

      <InputField
        label="Enter Your Email"
        placeholder="Write your email..."
        type="email"
        value={email}
        setValue={setEmail}
        disabled={isLoading}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send OTP"}
      </Button>
    </form>
  );
}
