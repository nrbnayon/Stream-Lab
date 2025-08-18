import ChangePasswordDialog from "@/components/dashboard/change-password-dialog";
import PersonalInformation from "@/components/dashboard/personal-information";
import SettingsCard from "@/components/dashboard/settings-card";
import {
  LockPasswordIcon,
  ShieldUserIcon,
} from "@hugeicons/core-free-icons/index";
import Image from "next/image";

export default function Settings() {
  return (
    <div>
      {/* Greeting */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold">Welcome, User</h2>
          <p className="text-secondary-foreground">Have a good day!</p>
        </div>
        <Image
          src="https://i.pinimg.com/736x/dd/48/f0/dd48f03b51d3b5db635307cb5a3fc5fb.jpg"
          height={50}
          width={50}
          alt="Profile Image"
          className="rounded-full"
        />
      </div>

      <div className="mt-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <PersonalInformation />
          <ChangePasswordDialog />
          <SettingsCard
            title="Privacy & Policy"
            description="View our privacy and policy"
            icon={ShieldUserIcon}
          />
        </div>
      </div>
    </div>
  );
}
