// components/dashboard/admin/settings/terms-action-dialog.js
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
import {
  useCreateAdminTermsMutation,
  useUpdateAdminTermsMutation,
  useDeleteAdminTermsMutation,
  useGetAdminTermsQuery,
} from "@/redux/store/api/usersApi";
import { toast } from "sonner";

export default function TermsActionDialog({
  triggerBtn,
  actionFor,
  data = {},
}) {
  const { id, title, details } = data;
  const [newTitle, setNewTitle] = useState(title || "");
  const [newDetails, setNewDetails] = useState(details?.join(" // ") || "");
  const [open, setOpen] = useState(false);

  const [createAdminTerms, { isLoading: isCreating }] =
    useCreateAdminTermsMutation();
  const [updateAdminTerms, { isLoading: isUpdating }] =
    useUpdateAdminTermsMutation();
  const [deleteAdminTerms, { isLoading: isDeleting }] =
    useDeleteAdminTermsMutation();
  const { refetch } = useGetAdminTermsQuery();

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

  const isLoading = isCreating || isUpdating || isDeleting;

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (actionFor === "add") {
        if (!newTitle.trim() || !newDetails.trim()) {
          toast.error("Please fill in both title and details");
          return;
        }

        const result = await createAdminTerms({
          title: newTitle,
          details: newDetails,
        }).unwrap();

        toast.success(result?.message || "Terms created successfully!");
      } else if (actionFor === "edit") {
        if (!newTitle.trim() || !newDetails.trim()) {
          toast.error("Please fill in both title and details");
          return;
        }

        const result = await updateAdminTerms({
          terms_id: id,
          title: newTitle,
          details: newDetails,
        }).unwrap();

        toast.success(result?.message || "Terms updated successfully!");
      } else if (actionFor === "delete") {
        const result = await deleteAdminTerms(id).unwrap();
        toast.success(result?.message || "Terms deleted successfully!");
      }

      // Reset form and close dialog
      setNewTitle(title || "");
      setNewDetails(details?.join(" // ") || "");
      setOpen(false);

      // Refetch terms data
      refetch();
    } catch (error) {
      console.error(`Terms ${actionFor} error:`, error);

      // Handle different error structures
      let errorMessage = `Failed to ${actionFor} terms`;

      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast.error(errorMessage);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{triggerBtn}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        {/* form for edit or add */}
        {actionFor !== "delete" && (
          <form className="space-y-3" onSubmit={handleFormSubmit}>
            <div>
              <Label>Title</Label>
              <Input
                placeholder="Enter terms title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Details</Label>
              <Textarea
                placeholder={termsDetailsPlaceHolder}
                value={newDetails}
                onChange={(e) => setNewDetails(e.target.value)}
                className="min-h-38"
                required
              />
            </div>
          </form>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={actionFor === "delete" ? "destructive" : "default"}
            onClick={handleFormSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : actionBtnText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
