"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons/index";
import InputField from "../input-field";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm({ setStep }) {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

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
    // TODO: show a toast
    // toast.info("Now login with your new password.");
    router.push("/signin");
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
        />
        <InputField
          label="Confirm new password"
          placeholder="Re-enter new password"
          type="password"
          value={confirmPass}
          setValue={setConfirmPass}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button className="w-full">Update Password</Button>
      </div>
    </form>
  );
}
