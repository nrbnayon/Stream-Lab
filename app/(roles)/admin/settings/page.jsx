// pages/admin/settings.js (Admin Settings Page)
"use client";
import AdminTermsAndConditionsDialog from "@/components/dashboard/admin/settings/admin-terms-and-conditions-dialog";
import ChangePasswordDialog from "@/components/dashboard/change-password-dialog";
import PersonalInformation from "@/components/dashboard/personal-information";
import CircularLoader from "@/components/ui/CircularLoader";
import { getFullImageUrl } from "@/lib/utils";
import { useGetMeQuery } from "@/redux/store/api/usersApi";
import Image from "next/image";

export default function AdminSettingsPage() {
  const { data: userResponse, isLoading } = useGetMeQuery();
  const userInfo = userResponse?.data || {};

  // console.log(
  //   "Admin info::",
  //   userResponse,
  //   "Admin::",
  //   getFullImageUrl(userInfo.avatar)
  // );

  if (isLoading) {
    return (
      <div className="p-3 md:p-6">
        <CircularLoader
          size={60}
          thickness={5}
          gap={4}
          message=""
          outerColor="border-primary"
          innerColor="border-red-500"
          textColor="text-blue-600"
          className="py-12"
          showMessage={false}
        />
      </div>
    );
  }

  return (
    <div>
      {/* Greeting */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            Welcome, {userInfo.full_name || "Admin"}
          </h2>
          <p className="text-secondary-foreground">Have a good day!</p>
        </div>
        <Image
          src={getFullImageUrl(userInfo.avatar)}
          height={50}
          width={50}
          alt="Profile Image"
          className="rounded-full w-14 h-14 object-cover border border-gray-400"
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
