import SelectOptions from "@/components/auth/select-options";
import InputField from "@/components/input-field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { loginAs } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Signup | ...",
};

export default function SignUp() {
  return (
    <>
      <Image
        src="/brand-logo.png"
        height={100}
        width={120}
        className="mx-auto w-auto h-auto"
        alt="brand-logo"
      />

      <div className="mt-5 text-center">
        <h5 className="text-2xl font-medium">Create Account</h5>
        <p className="text-lg text-secondary-foreground font-light">
          Join the JusB.io community
        </p>
      </div>

      {/* Signup form */}
      <form className="mt-8 space-y-3">
        {/* Full name */}
        <InputField
          placeholder="Enter your full name"
          type="text"
          label="Full Name"
          name="full-name"
        />
        {/* Email */}
        <InputField
          placeholder="Enter your email"
          type="email"
          label="Email"
          name="email"
        />
        {/* Distro Code */}
        <InputField
          placeholder="Give Distro Code Here"
          type="text"
          label="Distro Code"
          name="distro-code"
        />
        {/* Password */}
        <InputField
          placeholder="Enter your password"
          type="password"
          label="Password"
          name="password"
        />
        {/* Confirm Password */}
        <InputField
          placeholder="Enter your password again"
          type="password"
          label="Confirm Password"
          name="confirm-password"
        />

        {/* role selection */}
        <SelectOptions
          placeholder="Select your role"
          name="role"
          label="I'm a"
          options={loginAs}
        />

        {/* agree with Terms and conditions */}
        <div className="flex items-center gap-3">
          <Checkbox id="terms" name="terms-condition" />
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
    </>
  );
}
