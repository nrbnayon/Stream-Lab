import AdminTermsAndConditionsDialog from "@/components/dashboard/admin/settings/admin-terms-and-conditions-dialog";
import ChangePasswordDialog from "@/components/dashboard/change-password-dialog";
import PersonalInformation from "@/components/dashboard/personal-information";
import Image from "next/image";
export default function AdminSettingsPage() {
  return (
    <div>
      {/* Greeting */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">Welcome, Admin</h2>
          <p className="text-secondary-foreground">Have a good day!</p>
        </div>
        <Image
          src="https://i.pinimg.com/736x/dd/48/f0/dd48f03b51d3b5db635307cb5a3fc5fb.jpg"
          height={50}
          width={50}
          alt="Profile Image"
          className="rounded-full h-auto w-auto"
        />
      </div>

      <div className="my-5 lg:my-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 mt-4">
          <PersonalInformation />
          <ChangePasswordDialog />
          <AdminTermsAndConditionsDialog />
        </div>
      </div>
    </div>
  );
}
