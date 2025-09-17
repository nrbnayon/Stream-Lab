// components/dashboard/personal-information.js
"use client";
import {
  Camera01Icon,
  Edit04Icon,
  UserIcon,
} from "@hugeicons/core-free-icons/index";
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
import Image from "next/image";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import InputField from "../input-field";
import {
  useGetMeQuery,
  useUpdateProfileImageMutation,
} from "@/redux/store/api/usersApi";
import { toast } from "sonner";
import { getFullImageUrl } from "@/lib/utils";

export default function PersonalInformation() {
  const { data: userResponse, isLoading, refetch } = useGetMeQuery();
  const [updateProfileImage, { isLoading: isUpdating }] =
    useUpdateProfileImageMutation();

  const userInfo = userResponse?.data || {};
  const { avatar, full_name, email } = userInfo;

  const [preview, setPreview] = useState(null);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ avatar: "", full_name: "" });

  // Handle file change to show instant preview
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setEditedData((prev) => ({ ...prev, avatar: file }));
    }
  };

  // handle data changes and make update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      if (editedData.full_name && editedData.full_name !== full_name) {
        formData.append("full_name", editedData.full_name);
      }

      if (editedData.avatar) {
        formData.append("avatar", editedData.avatar);
      }

      const result = await updateProfileImage(formData).unwrap();

      toast.success(result.data?.message || "Profile updated successfully!");

      // Reset form and close dialog
      setIsEditing(false);
      setEditedData({ avatar: "", full_name: "" });
      setPreview(null);
      setOpen(false);

      // Refetch user data
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update profile");
      console.error("Profile update error:", error);
    }
  };

  if (isLoading) {
    return (
      <SettingsCard
        title="Personal Information"
        description="Loading..."
        icon={UserIcon}
      />
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        setOpen(state);
        setIsEditing(false);
        setEditedData({ avatar: "", full_name: "" });
        setPreview(null);
      }}
    >
      <DialogTrigger className="w-full">
        <SettingsCard
          title="Personal Information"
          description="Manage your name and profile picture"
          icon={UserIcon}
        />
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <form onSubmit={handleUpdateProfile}>
          <DialogHeader>
            <DialogTitle>Personal Information</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsEditing(true)}
            >
              <HugeiconsIcon icon={Edit04Icon} />
              Edit Profile
            </Button>
            <div className="relative">
              <Image
                src={preview || getFullImageUrl(avatar)}
                alt={`${full_name || "User"}'s profile picture`}
                width={200}
                height={200}
                className="aspect-square rounded-full object-cover mx-auto"
              />
              {/* Change Button */}
              {isEditing && (
                <label className="absolute top-1/2 left-1/2 -translate-1/2 cursor-pointer bg-secondary/50 p-3 rounded-full">
                  <HugeiconsIcon icon={Camera01Icon} className="" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>
            <div className="grid gap-3">
              <InputField
                label="Name"
                value={editedData.full_name || full_name || ""}
                inputDisabled={!isEditing}
                setValue={(value) =>
                  setEditedData((prev) => ({ ...prev, full_name: value }))
                }
              />
              <InputField
                label="Email"
                type="email"
                inputDisabled={true}
                value={email || ""}
              />
            </div>
          </div>
          {isEditing ? (
            <DialogFooter className="mt-3">
              <Button
                type="submit"
                className="w-full"
                disabled={
                  isUpdating ||
                  ((!editedData.full_name ||
                    editedData.full_name === full_name) &&
                    !editedData.avatar)
                }
              >
                {isUpdating ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          ) : null}
        </form>
      </DialogContent>
    </Dialog>
  );
}
