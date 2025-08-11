import { ArrowLeft02Icon } from "@hugeicons/core-free-icons/index";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import InputField from "../input-field";
import { Button } from "../ui/button";

export default function ForgotPasswordForm({ handleSubmit }) {
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
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
        name="email"
        type="email"
      />

      <Button className="w-full">Send OTP</Button>
    </form>
  );
}
