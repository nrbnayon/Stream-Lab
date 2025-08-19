"use client";
import {
  Camera01Icon,
  Edit04Icon,
  UserIcon,
} from "@hugeicons/core-free-icons/index";
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
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import InputField from "../input-field";

// TODO: remove default Data
export default function PersonalInformation({
  userInfo = {
    avatar:
      "https://i.pinimg.com/736x/dd/48/f0/dd48f03b51d3b5db635307cb5a3fc5fb.jpg",
    full_name: "User Name",
    email: "username@domain.com",
  },
}) {
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
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const editedName = e.target.name.value;
    full_name !== editedName &&
      setEditedData((prev) => ({ ...prev, full_name: editedName }));
    if (!editedData.avatar || !editedData.full_name) {
      // TODO: make alert and close the dialog
      return;
    }
    // TODO: send data to backend
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        setOpen(state);
        setIsEditing(false);
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
            <Button variant="secondary" onClick={() => setIsEditing(true)}>
              <HugeiconsIcon icon={Edit04Icon} />
              Edit Profile
            </Button>
            <div className="relative">
              <Image
                src={preview || avatar}
                alt={`${full_name}'s profile picture`}
                width={200}
                height={200}
                className="aspect-square rounded-full object-cover mx-auto"
              />
              {/* Change Button */}
              {isEditing && (
                <label className="absolute top-1/2 left-1/2 -translate-1/2 cursor-pointer bg-secondary/50 p-3 rounded-full">
                  <HugeiconsIcon icon={Camera01Icon} className="" />
                  {/* <HugeiconsIcon icon={Edit04Icon} /> */}
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
                defaultValue={full_name}
                inputDisabled={!isEditing}
                name="name"
              />
              <InputField
                label="Email"
                type="email"
                inputDisabled={true}
                defaultValue={email}
              />
            </div>
          </div>
          {isEditing ? (
            <DialogFooter className="mt-3">
              <Button type="submit" className="w-full">
                Save changes
              </Button>
            </DialogFooter>
          ) : null}
        </form>
      </DialogContent>
    </Dialog>
  );
}
