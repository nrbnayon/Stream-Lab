// components/dashboard/admin/subscribers/subscriber-delete-alert.jsx
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
import { Button } from "@/components/ui/button";
import { Delete02Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { useDeleteSubscriberMutation } from "@/redux/store/api/adminApi";
import { toast } from "sonner";

export default function SubscriberDeleteAlert({ subscriber = {} }) {
  const { subscriber_id, full_name, email } = subscriber;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [deleteSubscriber] = useDeleteSubscriberMutation();

  const handleDelete = async () => {
    if (!subscriber_id) {
      toast({
        title: "Error",
        description: "No subscriber ID found",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const result = await deleteSubscriber(subscriber_id).unwrap();

      toast({
        title: "Success",
        description: result.message || "Subscriber deleted successfully",
        variant: "default",
      });

      setOpen(false);
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to delete subscriber",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="bg-transparent text-red-500 hover:bg-red-100 hover:text-red-600"
        >
          <HugeiconsIcon icon={Delete02Icon} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove{" "}
            <span className="font-black text-primary">
              {full_name || "this subscriber"}
            </span>{" "}
            ({email}) subscription and remove data from your database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
