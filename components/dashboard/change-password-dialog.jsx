// components/dashboard/change-password-dialog.js
"use client";
import { LockPasswordIcon } from "@hugeicons/core-free-icons/index";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import SettingsCard from "./settings-card";
import { Button } from "../ui/button";
import InputField from "../input-field";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/redux/store/api/usersApi";

export default function ChangePasswordDialog() {
  const router = useRouter();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 8 || newPassword.length > 10) {
      setError("Password must be 8-10 characters long.");
      return;
    }

    try {
      const result = await changePassword({
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }).unwrap();

      toast.success(result.message || "Password changed successfully!");

      // Clear form
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setOpen(false);
    } catch (error) {
      setError(error?.data?.message || "Failed to change password");
      console.error("Password change error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <SettingsCard
          title="Change Password"
          description="Change your password to secure your account"
          icon={LockPasswordIcon}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Your password must be 8-10 character long.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <InputField
              label="Current Password"
              type="password"
              placeholder="Enter your current password"
              value={oldPassword}
              setValue={setOldPassword}
            />
            <InputField
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              setValue={setNewPassword}
            />
            <InputField
              label="Confirm New Password"
              type="password"
              placeholder="Re-enter your new password"
              value={confirmPassword}
              setValue={setConfirmPassword}
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <DialogFooter>
            <Button type="submit" className="w-full mt-3" disabled={isLoading}>
              {isLoading ? "Changing..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
