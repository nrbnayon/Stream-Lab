// components/auth/reset-password-form.jsx
"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons/index";
import InputField from "../input-field";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/store/api/authApi";
import { toast } from "sonner";

export default function ResetPasswordForm({ setStep }) {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [secretKey, setSecretKey] = useState(null);
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  useEffect(() => {
    // Get user_id and secret_key from sessionStorage
    const storedUserId = sessionStorage.getItem("resetUserId");
    const storedSecretKey = sessionStorage.getItem("resetSecretKey");

    if (storedUserId && storedSecretKey) {
      setUserId(storedUserId);
      setSecretKey(storedSecretKey);
    }
  }, []);

  const handlePasswordSet = async (e) => {
    e.preventDefault();
    setError(null);

    if (!password || !confirmPass) {
      setError("Both password and confirm password field is required.");
      return;
    }

    if (password !== confirmPass) {
      setError("Password didn't match!");
      return;
    }

    if (password.length < 8 || password.length > 10) {
      setError("Password must be 8-10 characters long.");
      return;
    }

    if (!userId || !secretKey) {
      setError("Session expired. Please start over.");
      setStep(1);
      return;
    }

    try {
      const response = await resetPassword({
        user_id: userId,
        secret_key: secretKey,
        new_password: password,
        confirm_password: confirmPass,
      }).unwrap();

      if (
        response === null ||
        response === undefined ||
        (response &&
          (response.status === "success" || response.status === 200)) ||
        (response && response.message)
      ) {
        // Clear session storage
        sessionStorage.removeItem("resetUserId");
        sessionStorage.removeItem("resetUserEmail");
        sessionStorage.removeItem("resetSecretKey");
        sessionStorage.removeItem("otpTimerStart");

        toast.success(
          (response && response.message) ||
            "Password updated successfully! Now login with your new password."
        );

        setTimeout(() => {
          router.push("/signin");
        }, 1500);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      console.error("Reset password error:", err);

      let errorMessage = "Failed to reset password. Please try again.";

      // Handle different error formats
      if (err.data && err.data.message) {
        errorMessage = err.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      } else if (err.status) {
        switch (err.status) {
          case 400:
            errorMessage = "Invalid request. Please check your input.";
            break;
          case 401:
            errorMessage = "Session expired. Please start over.";
            setStep(1);
            break;
          case 404:
            errorMessage = "Reset session not found. Please start over.";
            setStep(1);
            break;
          case 500:
            errorMessage = "Server error. Please try again later.";
            break;
          default:
            errorMessage = "Failed to reset password. Please try again.";
        }
      }

      toast.error(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <form onSubmit={handlePasswordSet}>
      <h2 className="flex gap-4 text-2xl items-center">
        <HugeiconsIcon
          icon={ArrowLeft02Icon}
          className="transition-transform hover:-translate-x-1 cursor-pointer"
          onClick={() => setStep(2)}
        />
        Change Password
      </h2>
      <p className="text-lg font-light text-secondary-foreground mt-2">
        Your password must be 8-10 character long.
      </p>

      <div className="mt-5 space-y-3">
        <InputField
          label="New Password"
          placeholder="Set new password"
          type="password"
          value={password}
          setValue={setPassword}
          disabled={isLoading}
        />
        <InputField
          label="Confirm new password"
          placeholder="Re-enter new password"
          type="password"
          value={confirmPass}
          setValue={setConfirmPass}
          disabled={isLoading}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </form>
  );
}
