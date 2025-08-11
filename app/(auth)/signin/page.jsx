import InputField from "@/components/input-field";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Signin | ...",
};

export default function SignIn() {
  return (
    <>
      <Image
        src="/brand-logo.png"
        height={100}
        width={120}
        className="mx-auto"
        alt="brand-logo"
      />

      <div className="mt-5 text-center">
        <h5 className="text-2xl font-medium">Welcome Back</h5>
        <p className="text-lg text-secondary-foreground font-light">
          Sign in on your account
        </p>
      </div>

      {/* Signin form */}
      <form className="mt-8">
        {/* Email */}
        <InputField
          placeholder="Enter your email"
          type="email"
          label="Email"
          name="email"
        />
        {/* Password */}
        <InputField
          placeholder="Enter your password"
          type="password"
          label="Password"
          className="pr-12"
          name="password"
        />

        {/* forgot password */}
        <p className="text-right">
          <Link href="" className="text-primary hover:underline">
            Forgot Password?
          </Link>
        </p>

        {/* Sign in button */}
        <Button className="w-full mt-5">Sign In</Button>

        {/* If Not an existing user */}
        <p className="text-center mt-4">
          Don&apos;t have an account? &nbsp;
          <Link href="/signup" className="text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </>
  );
}
