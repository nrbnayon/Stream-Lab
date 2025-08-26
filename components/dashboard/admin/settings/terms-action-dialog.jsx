"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
export default function TermsActionDialog({
  triggerBtn,
  actionFor,
  data = {},
}) {
  const { id, title, details } = data;
  const [newTitle, setNewTitle] = useState(title || "");
  const [newDetails, setNewDetails] = useState(details?.join("//") || "");
  const dialogTitle =
    actionFor === "add"
      ? "Add a new terms and condition"
      : actionFor === "edit"
      ? `Editing Terms — ${data?.title}`
      : "Are you absolutely sure?";
  const dialogDescription =
    actionFor === "add"
      ? "Create a new term for the JusB.io Terms and Conditions. Enter the title and details, using double slashes (//) to separate multiple details."
      : actionFor === "edit"
      ? `You are editing the term "${data?.title}". Update the title or details as needed. Remember to separate multiple details with double slashes (//).`
      : "Deleting this term is permanent. Are you sure you want to remove it from the JusB.io Terms and conditions?";
  const termsDetailsPlaceHolder = `Example:
You must be .... become a Distro. // JusB.io .... discretion.`;
  const actionBtnText =
    actionFor === "add" ? "Add" : actionFor === "edit" ? "Save" : "Delete";

  //  TODO: Call API here
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(e);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerBtn}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        {actionFor !== "delete" && (
          <form className="space-y-3">
            <div>
              <Label>Title</Label>
              <Input
                placeholder="Enter terms title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div>
              <Label>Details</Label>
              <Textarea
                placeholder={termsDetailsPlaceHolder}
                value={newDetails}
                onChange={(e) => setNewDetails(e.target.value)}
                className="min-h-38"
              />
            </div>
          </form>
        )}
        <AlertDialogFooter className="mx-auto">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={actionFor === "delete" ? "destructive" : "default"}
            onClick={handleFormSubmit}
          >
            {actionBtnText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
