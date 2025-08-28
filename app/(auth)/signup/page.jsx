import SignUpForm from "@/components/auth/sign-up-form";
import Image from "next/image";

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
      <SignUpForm />
    </>
  );
}
