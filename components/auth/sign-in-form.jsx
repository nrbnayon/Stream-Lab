"use client";

import Link from "next/link";
import InputField from "../input-field";
import { Button } from "../ui/button";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset error
    setError(null);

    // Validation
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    // TODO: Success - send data to API here
    console.log({
      email,
      password,
    });

    //  DEBUG: redirect to dashboard
    if (email === "admin@admin.com" && password === "admin@admin.com") {
      localStorage.setItem("role", "admin");
      router.push("/admin/dashboard");
      return;
    }
    localStorage.setItem("role", "user");
    router.push("/watch");
  };
  return (
    <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
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

      {/* forgot password */}
      <p className="text-right">
        <Link href="/reset-password" className="text-primary hover:underline">
          Forgot Password?
        </Link>
      </p>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Sign in button */}
      <Button className="w-full">Sign In</Button>

      {/* If Not an existing user */}
      <p className="text-center">
        Don&apos;t have an account? &nbsp;
        <Link href="/signup" className="text-primary hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
