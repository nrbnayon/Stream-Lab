import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons/index";
import InputField from "../input-field";
import { Button } from "../ui/button";

export default function ResetPasswordForm({ handleSubmit, setStep }) {
  return (
    <form className="" onSubmit={handleSubmit}>
      <h2 className="flex gap-4 text-2xl items-center">
        <HugeiconsIcon
          icon={ArrowLeft02Icon}
          className="transition-transform hover:-translate-x-1 cursor-pointer"
          onClick={() => setStep(2)}
        />
        Change Password
      </h2>
      <p className="text-lg font-light text-secondary-foreground mt-2">
        Your password must be 8-10 character long.
      </p>

      <div className="mt-5 space-y-3">
        <InputField
          label="New Password"
          placeholder="Set new password"
          name="password"
          type="password"
        />
        <InputField
          label="Confirm new password"
          placeholder="Re-enter new password"
          name="confirm-password"
          type="password"
        />
        <Button className="w-full">Update Password</Button>
      </div>
    </form>
  );
}
