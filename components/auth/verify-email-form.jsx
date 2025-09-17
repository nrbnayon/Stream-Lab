// components/auth/verify-email-form.jsx
"use client";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons/index";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import {
  useVerifyEmailMutation,
  useForgotPasswordMutation,
} from "@/redux/store/api/authApi";
import { toast } from "sonner";

export default function VerifyEmailForm({ setStep }) {
  const [otp, setOTP] = useState("");
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [secretKey, setSecretKey] = useState(null);
  const [timeLeft, setTimeLeft] = useState(180); // 180 seconds = 3 minutes
  const [timerActive, setTimerActive] = useState(true);
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [forgotPassword, { isLoading: isResending }] =
    useForgotPasswordMutation();

  useEffect(() => {
    // Get user_id and email from sessionStorage
    const storedUserId = sessionStorage.getItem("resetUserId");
    const storedUserEmail = sessionStorage.getItem("resetUserEmail");
    const storedTimerStart = sessionStorage.getItem("otpTimerStart");

    if (storedUserId) {
      setUserId(storedUserId);
    }

    if (storedUserEmail) {
      setUserEmail(storedUserEmail);
    }

    // Calculate remaining time if timer was already started
    if (storedTimerStart) {
      const currentTime = Date.now();
      const elapsedTime = Math.floor(
        (currentTime - parseInt(storedTimerStart)) / 1000
      );
      const remainingTime = Math.max(180 - elapsedTime, 0);

      if (remainingTime > 0) {
        setTimeLeft(remainingTime);
        setTimerActive(true);
      } else {
        setTimeLeft(0);
        setTimerActive(false);
      }
    } else {
      // Start timer for the first time
      const startTime = Date.now();
      sessionStorage.setItem("otpTimerStart", startTime.toString());
    }
  }, []);

  useEffect(() => {
    let interval = null;

    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setTimerActive(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleCodeVerify = async (e) => {
    e.preventDefault();
    setError(null);

    if (!otp || otp.length < 6) {
      setError("Please enter your 6 digit OTP.");
      return;
    }

    if (!userId) {
      setError("Session expired. Please start over.");
      setStep(1);
      return;
    }

    try {
      const response = await verifyEmail({
        user_id: userId,
        verification_code: otp,
      }).unwrap();

      if (response.status === "success" || response.status === 200) {
        // Store secret_key for password reset
        setSecretKey(response.secret_key);
        sessionStorage.setItem("resetSecretKey", response.secret_key);
        // Clear timer data
        sessionStorage.removeItem("otpTimerStart");

        toast.success("Email verified successfully!");
        setStep(3);
      }
    } catch (err) {
      let errorMessage = "Invalid OTP. Please try again.";

      if (err.data && err.data.message) {
        errorMessage = err.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      toast.error(errorMessage);
      setError(errorMessage);
    }
  };

  const handleResendOTP = async () => {
    if (!userEmail) {
      setError("Session expired. Please start over.");
      setStep(1);
      return;
    }

    try {
      const response = await forgotPassword({
        email_address: userEmail,
      }).unwrap();

      if (response.status === "success") {
        // Reset timer
        const startTime = Date.now();
        sessionStorage.setItem("otpTimerStart", startTime.toString());
        setTimeLeft(180);
        setTimerActive(true);

        toast.success(response?.message || "OTP sent successfully!");
        setOTP("");
      }
    } catch (err) {
      let errorMessage = "Failed to resend OTP. Please try again.";

      if (err.data && err.data.message) {
        errorMessage = err.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      toast.error(errorMessage);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleCodeVerify}>
      <h2 className="flex gap-4 text-2xl items-center">
        <HugeiconsIcon
          icon={ArrowLeft02Icon}
          className="transition-transform hover:-translate-x-1 cursor-pointer"
          onClick={() => setStep(1)}
        />
        Verify Email
      </h2>

      <p className="text-lg font-light text-secondary-foreground">
        An 6-digit OTP has been sent to your email, please enter it below to
        verify your identity.
      </p>

      {/* OTP Input Group */}
      <div>
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={setOTP}
          disabled={isLoading}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        {/* Timer and Resend OTP */}
        <div className="text-sm text-muted-foreground mt-2 flex justify-between items-center">
          <span>Didn&apos;t receive an OTP?</span>
          <div className="flex items-center gap-2">
            {timerActive && timeLeft > 0 ? (
              <span className="text-primary font-medium">
                Resend in {formatTime(timeLeft)}
              </span>
            ) : (
              <span
                className="text-primary cursor-pointer hover:underline font-medium"
                onClick={handleResendOTP}
                style={{
                  pointerEvents: isResending ? "none" : "auto",
                  opacity: isResending ? 0.6 : 1,
                }}
              >
                {isResending ? "Sending..." : "Resend OTP"}
              </span>
            )}
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading ? "Verifying..." : "Verify"}
      </Button>
    </form>
  );
}
