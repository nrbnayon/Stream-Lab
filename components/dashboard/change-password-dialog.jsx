import { LockPasswordIcon } from "@hugeicons/core-free-icons/index";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import SettingsCard from "./settings-card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import InputField from "../input-field";

export default function ChangePasswordDialog() {
  return (
    <Dialog>
      <form>
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
            <Button type="submit" className="w-full">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
