import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons/index";
import Link from "next/link";
import { Button } from "../ui/button";

export default function VerifyEmailForm({ handleSubmit, setStep }) {
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <h2 className="flex gap-4 text-2xl items-center">
        <HugeiconsIcon
          icon={ArrowLeft02Icon}
          className="transition-transform hover:-translate-x-1 cursor-pointer"
          onClick={() => setStep(1)}
        />
        Verify Email
      </h2>

      <p className="text-lg font-light text-secondary-foreground">
        An 6-digit OTP has been sent to your email, please enter it below to
        verify your identity.
      </p>

      {/* OTP Input Group */}
      <div>
        <InputOTP maxLength={6} name="otp">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-sm text-muted-foreground mt-2 flex justify-between">
          Didn&apos;t receive an OTP? &nbsp;
          <Link className="text-primary cursor-pointer hover:underline" href="">
            Resend OTP
          </Link>
        </p>
      </div>

      <Button className="w-full">Verify</Button>
    </form>
  );
}
