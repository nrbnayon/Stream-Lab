"use client";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons/index";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import InputField from "../input-field";
import { Button } from "../ui/button";
import { useState } from "react";

export default function ForgotPasswordForm({ setStep }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError("Email is required.");
      return;
    }
    //
    setStep(2);
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
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button className="w-full">Send OTP</Button>
    </form>
  );
}
