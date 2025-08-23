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

export default function ChangePasswordDialog() {
  return (
    <Dialog>
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
        <form>
          <div className="grid gap-4">
            <InputField
              label="Current Password"
              type="password"
              placeholder="Enter your current password"
            />
            <InputField
              label="New Password"
              type="password"
              placeholder="Enter your new password"
            />
            <InputField
              label="Confirm New Password"
              type="password"
              placeholder="Re-enter your new password"
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full mt-3">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
