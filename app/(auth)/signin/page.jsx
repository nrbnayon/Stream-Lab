import SignInForm from "@/components/auth/sign-in-form";
import Image from "next/image";

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
        className="mx-auto w-auto h-auto"
        alt="brand-logo"
      />

      <div className="mt-5 text-center">
        <h5 className="text-2xl font-medium">Welcome Back</h5>
        <p className="text-lg text-secondary-foreground font-light">
          Sign in on your account
        </p>
      </div>

      {/* Signin form */}
      <SignInForm />
    </>
  );
}
