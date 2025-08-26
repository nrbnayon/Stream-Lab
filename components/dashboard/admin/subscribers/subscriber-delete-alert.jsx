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
export default function SubscriberDeleteAlert({ subscriber = {} }) {
  const {} = subscriber;
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);

      // if (!res.ok) {
      //   throw new Error("Failed to delete user");
      // }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="bg-transparent text-red-500"
          asChild
        >
          <span>
            <HugeiconsIcon icon={Delete02Icon} />
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove{" "}
            <span className="font-black text-primary">{`This User`}</span>{" "}
            subscription and remove data from your database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mx-auto">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
