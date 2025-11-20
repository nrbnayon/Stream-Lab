"use client";
import Link from "next/link";
import InputField from "../input-field";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSignupMutation } from "@/redux/store/api/authApi";
import { toast } from "sonner";

function SignUpFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [signup, { isLoading }] = useSignupMutation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [error, setError] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState(null);

  // Get redirect URL from query params on component mount
  useEffect(() => {
    const redirect = searchParams.get("redirect");
    if (redirect) {
      setRedirectUrl(redirect);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
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

    try {
      // Prepare data according to API specification
      const signupData = {
        full_name: fullName,
        email_address: email,
        password: password,
        confirm_password: confirmPassword,
        terms_agreed: isAgreed,
      };

      // Call the signup API
      const response = await signup(signupData).unwrap();

      // If signup is successful, show success toast and redirect to sign in page
      if (response.status === "success") {
        toast.success(
          "Account created successfully! Please sign in to continue."
        );
        // Small delay to let user see the toast before redirecting
        setTimeout(() => {
          // Redirect to signin with the original redirect URL if it exists
          if (redirectUrl) {
            router.push(`/signin?redirect=${encodeURIComponent(redirectUrl)}`);
          } else {
            router.push("/signin");
          }
        }, 1500);
      }
    } catch (err) {
      // Handle API errors
      let errorMessage = "An error occurred during signup. Please try again.";

      if (err.data && err.data.message) {
        errorMessage = err.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      // Show error toast
      toast.error(errorMessage);
      // Also set error state for form display
      setError(errorMessage);
    }
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
        disabled={isLoading}
      />
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
      {/* Confirm Password */}
      <InputField
        placeholder="Enter your password again"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        setValue={setConfirmPassword}
        disabled={isLoading}
      />

      {/* agree with Terms and conditions */}
      <div className="flex items-center gap-3">
        <Checkbox
          id="terms"
          checked={isAgreed}
          onCheckedChange={(checked) => setIsAgreed(checked)}
          disabled={isLoading}
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

      {/* Sign up button */}
      <Button className="w-full mt-3" type="submit" disabled={isLoading}>
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>

      {/* If already have an account */}
      <p className="text-center">
        Already have an account? &nbsp;
        <Link
          href={
            redirectUrl
              ? `/signin?redirect=${encodeURIComponent(redirectUrl)}`
              : "/signin"
          }
          className="text-primary hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}

export default function SignUpForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpFormContent />
    </Suspense>
  );
}
