"use client";

import Link from "next/link";
import InputField from "../input-field";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/store/slices/authSlice";
import { useLoginMutation } from "@/redux/store/api/authApi";

export default function SignInForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepMeSignedIn, setKeepMeSignedIn] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset error
    setError(null);

    // Validation
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      // Call the login API
      const response = await login({
        email_address: email,
        password,
      }).unwrap();

      console.log("Login response:", response);

      // Dispatch credentials to Redux store
      dispatch(setCredentials(response));

      // Redirect based on role
      if (response.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/watch");
      }
    } catch (err) {
      console.error("Login error:", err);
      // Handle different error scenarios
      if (err?.data?.message) {
        setError(err.data.message);
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError("Login failed. Please try again.");
      }
    }
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
        disabled={isLoading}
      />

      {/* Password */}
      <InputField
        placeholder="Enter your password"
        type="password"
        label="Password"
        value={password}
        setValue={setPassword}
        disabled={isLoading}
      />

      <div className="flex items-center justify-between">
        {/* Keep me signed in checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="keepMeSignedIn"
            checked={keepMeSignedIn}
            onChange={(e) => setKeepMeSignedIn(e.target.checked)}
            disabled={isLoading}
            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2 disabled:opacity-50"
          />
          <label
            htmlFor="keepMeSignedIn"
            className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            Keep me signed in
          </label>
        </div>

        {/* Forgot password */}
        <Link
          href="/reset-password"
          className="text-sm text-primary hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Sign in button */}
      <Button className="w-full" disabled={isLoading}>
        {isLoading ? "Signing In..." : "Sign In"}
      </Button>

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
