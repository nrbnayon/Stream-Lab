"use client";
import Link from "next/link";
import InputField from "../input-field";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // simple validation
    if (!fullName || !email || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!isAgreed) {
      setError("You must agree to the terms and privacy policy!");
      return;
    }

    // TODO: Success - send data to API here
    console.log({
      fullName,
      email,
      password,
    });

    router.push("/signin");
  };

  return (
    <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
      {/* Full name */}
      <InputField
        placeholder="Enter your full name"
        type="text"
        label="Full Name"
        value={fullName}
        setValue={setFullName}
      />
      {/* Email */}
      <InputField
        placeholder="Enter your email"
        type="email"
        label="Email"
        value={email}
        setValue={setEmail}
      />

      {/* Password */}
      <InputField
        placeholder="Enter your password"
        type="password"
        label="Password"
        value={password}
        setValue={setPassword}
      />
      {/* Confirm Password */}
      <InputField
        placeholder="Enter your password again"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        setValue={setConfirmPassword}
      />

      {/* agree with Terms and conditions */}
      <div className="flex items-center gap-3">
        <Checkbox
          id="terms"
          checked={isAgreed}
          onCheckedChange={(checked) => setIsAgreed(checked)}
        />
        <Label htmlFor="terms">
          I agree to the
          <Link href="" className="text-primary hover:underline">
            Terms of Service
          </Link>
          and
          <Link href="" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </Label>
      </div>

      {/* error message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Sign in button */}
      <Button className="w-full mt-3">Create Account</Button>

      {/* If Not an existing user */}
      <p className="text-center">
        Already have an account? &nbsp;
        <Link href="/signin" className="text-primary hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  );
}
